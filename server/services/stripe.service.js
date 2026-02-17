const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { sendWelcomeEmail } = require('./email.service');
const crypto = require('crypto');

/**
 * Handles the checkout.session.completed event from Stripe.
 * @param {Object} session - Stripe session object
 */
async function handleSuccessfulPayment(session) {
    console.log('💰 Processing payment for session:', session.id);

    if (!session.customer_details || !session.customer_details.email) {
        console.error('❌ Missing customer details in session');
        throw new Error('Informations client manquantes dans la session Stripe.');
    }

    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name || '';
    const stripeCustomerId = session.customer;
    const stripeSubscriptionId = session.subscription;
    const stripePriceId = session.metadata.price_id || session.line_items?.data[0]?.price.id;
    const sessionId = session.id;

    console.log('💰 Processing payment for:', customerEmail);

    // 0. Vérifier si cette session a déjà été traitée (éviter les doublons)
    const [existingSessions] = await pool.execute(
        'SELECT id FROM subscriptions WHERE stripe_subscription_id = ?',
        [stripeSubscriptionId || sessionId]
    );

    if (existingSessions.length > 0) {
        console.log('⚠️ Session déjà traitée, skip.');
        return;
    }

    // 1. Check if user exists
    const [users] = await pool.execute('SELECT id FROM users WHERE email = ?', [customerEmail]);
    let userId;
    let tempPassword = null;

    if (users.length === 0) {
        // 2. Create user if not exists
        tempPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const [firstName, ...lastNameParts] = customerName.split(' ');
        const lastName = lastNameParts.join(' ');

        const [result] = await pool.execute(
            'INSERT INTO users (email, password_hash, first_name, last_name, stripe_customer_id, status, must_change_password) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [customerEmail, hashedPassword, firstName || 'Client', lastName || '', stripeCustomerId, 'active', true]
        );
        userId = result.insertId;
        console.log('✅ Nouveau compte créé, userId:', userId);
    } else {
        userId = users[0].id;
        // Update Stripe Customer ID if not set
        await pool.execute('UPDATE users SET stripe_customer_id = ? WHERE id = ?', [stripeCustomerId, userId]);
        console.log('✅ Utilisateur existant, userId:', userId);
    }

    // 3. Create Subscription
    // First, find the plan_id based on stripe_price_id
    const [plans] = await pool.execute('SELECT id, name FROM plans WHERE stripe_price_id = ?', [stripePriceId]);
    let planId = null;
    let planName = 'Premium'; // Default

    if (plans.length > 0) {
        planId = plans[0].id;
        planName = plans[0].name;
    } else {
        console.warn(`Plan not found for stripe_price_id: ${stripePriceId}`);
    }

    if (planId) {
        await pool.execute(
            'INSERT INTO subscriptions (user_id, plan_id, stripe_subscription_id, status) VALUES (?, ?, ?, ?)',
            [userId, planId, stripeSubscriptionId, 'active']
        );
    }

    // 4. Create client_sites entry
    await pool.execute(
        'INSERT INTO client_sites (user_id, status) VALUES (?, ?)',
        [userId, 'pending']
    );

    // 5. Send Welcome Email (only if new user)
    if (tempPassword) {
        try {
            const orderDetails = {
                planName: planName,
                amount: session.amount_total / 100,
                currency: session.currency ? session.currency.toUpperCase() : 'EUR',
                transactionId: session.payment_intent || session.id,
                date: new Date().toLocaleDateString('fr-FR')
            };
            await sendWelcomeEmail(customerEmail, tempPassword, orderDetails, customerName.split(' ')[0] || 'Client');
            console.log('📧 Email de bienvenue envoyé avec succès.');
        } catch (emailError) {
            console.error('❌ Erreur d\'envoi d\'email (non-bloquante):', emailError.message);
            // On ne throw pas d'erreur ici pour que le client voie quand même la page de succès
        }
    }

    // 6. Launch background site creation (Placeholder)
    console.log(`Launching site creation for user ${userId}...`);
}

module.exports = {
    handleSuccessfulPayment
};
