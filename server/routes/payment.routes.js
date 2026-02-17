const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { handleSuccessfulPayment } = require('../services/stripe.service');

router.post('/create-checkout-session', async (req, res) => {
    const { plan, email, firstName, lastName } = req.body;
    console.log('--- Nouvelle tentative de paiement ---');
    console.log('ID du prix utilisé:', plan.stripe_price_id);
    console.log('Mode forcé:', 'subscription');

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: plan.stripe_price_id,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            customer_email: email,
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
            metadata: {
                plan_name: plan.name,
                first_name: firstName,
                last_name: lastName,
                price_id: plan.stripe_price_id
            },
        });

        console.log('✅ Session créée avec succès:', session.id);
        res.json({ url: session.url });
    } catch (error) {
        console.error('❌ STRIPE API ERROR:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 🎯 NOUVEAU : Endpoint pour vérifier et traiter une session après redirection
router.get('/verify-session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;

    try {
        console.log('🔍 Vérification de la session:', sessionId);

        // Récupérer les détails complets de la session depuis Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items']
        });

        if (!session) {
            console.error('❌ Session introuvable sur Stripe:', sessionId);
            return res.status(404).json({ success: false, message: 'Session introuvable.' });
        }

        console.log('Session status:', session.payment_status);
        console.log('Customer Email:', session.customer_details?.email);

        // Vérifier que le paiement est bien réussi
        if (session.payment_status === 'paid') {
            // Traiter le paiement (créer compte, envoyer email, etc.)
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
