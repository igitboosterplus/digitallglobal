const express = require('express');
const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
    console.error('❌ ERREUR : STRIPE_SECRET_KEY est manquante dans les variables d\'environnement !');
}

const stripe = stripeKey ? require('stripe')(stripeKey) : null;
const { handleSuccessfulPayment } = require('../services/stripe.service');
const pool = require('../config/db');

// Correspondance plan -> key (Synchronisée avec Pricing.jsx)
const PLAN_MAPPING = {
    Started: process.env.STRIPE_PRICE_ACCESS,   // Offre Started
    Pro: process.env.STRIPE_PRICE_PREMIUM,      // Offre Pro
    Premium: process.env.STRIPE_PRICE_PLATINIUM // Offre Premium (Anciennement Platinium)
};

router.post('/create-checkout-session', async (req, res) => {
    if (!stripe) {
        return res.status(500).json({ error: 'Stripe n\'est pas configuré sur le serveur.' });
    }
    const { planType, planName, email, firstName, lastName, address, zip, city, countryIso } = req.body;
    console.log('--- Nouvelle tentative de paiement ---');

    const stripePriceId = PLAN_MAPPING[planType];

    if (!stripePriceId) {
        console.error('Plan invalide demandé:', planType);
        return res.status(400).json({ error: 'Plan invalide.' });
    }

    try {
        // Vérifier en DB si c'est un paiement unique ou abonnement
        const [plans] = await pool.execute('SELECT is_lifetime FROM plans WHERE stripe_price_id = ?', [stripePriceId]);
        const isLifetime = plans.length > 0 ? plans[0].is_lifetime : false;

        console.log('Plan:', planType, '| Mode:', isLifetime ? 'payment' : 'subscription');

        // Construction des options de la session
        const sessionOptions = {
            payment_method_types: ['card'],
            line_items: [
                {
                    price: stripePriceId,
                    quantity: 1,
                },
            ],
            mode: isLifetime ? 'payment' : 'subscription',
            customer_email: email,
            automatic_tax: { enabled: true },
            tax_id_collection: { enabled: true },
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
            metadata: {
                plan_name: planName,
                first_name: firstName,
                last_name: lastName,
                price_id: stripePriceId
            },
        };

        // Si on a des infos d'adresse, on pré-remplit pour Stripe (important pour Stripe Tax)
        if (address && zip && city && countryIso) {
            sessionOptions.customer_details = {
                address: {
                    line1: address,
                    postal_code: zip,
                    city: city,
                    country: countryIso,
                }
            };
        }

        const session = await stripe.checkout.sessions.create(sessionOptions);

        console.log('✅ Session créée avec succès:', session.id);
        res.json({ url: session.url });
    } catch (error) {
        console.error('❌ STRIPE API ERROR:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// Endpoint pour vérifier et traiter une session après redirection
router.get('/verify-session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;

    try {
        console.log('🔍 Vérification de la session:', sessionId);

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items']
        });

        if (!session) {
            console.error('❌ Session introuvable sur Stripe:', sessionId);
            return res.status(404).json({ success: false, message: 'Session introuvable.' });
        }

        if (session.payment_status === 'paid') {
            await handleSuccessfulPayment(session);

            res.json({
                success: true,
                message: 'Payment processed successfully',
                email: session.customer_details.email
            });
        } else {
            res.json({
                success: false,
                message: 'Payment not completed',
                status: session.payment_status
            });
        }
    } catch (error) {
        console.error('❌ Error verifying session:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
