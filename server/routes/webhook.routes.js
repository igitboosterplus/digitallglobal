const express = require('express');
const router = express.Router();
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
    console.error('❌ ERREUR : STRIPE_SECRET_KEY est manquante dans les variables d\'environnement !');
}

const stripe = stripeKey ? require('stripe')(stripeKey) : null;
const { handleSuccessfulPayment } = require('../services/stripe.service');

router.post('/stripe', async (req, res) => {
    if (!stripe) {
        console.error('❌ Stripe n\'est pas initialisé.');
        return res.status(500).send('Erreur de configuration serveur (Stripe).');
    }
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            try {
                // Expanding line items if needed to get price_id
                const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
                    expand: ['line_items']
                });
                await handleSuccessfulPayment(expandedSession);
            } catch (err) {
                console.error(`Error processing checkout.session.completed: ${err.message}`);
                return res.status(500).send(`Internal Server Error`);
            }
            break;

        // Handle other event types if necessary
        case 'invoice.payment_succeeded':
            // Update subscription status etc.
            break;

        case 'customer.subscription.deleted':
            // Handle cancellation
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// ⛔ ENDPOINT DE TEST SUPPRIMÉ EN PRODUCTION
// Ne jamais exposer un endpoint qui crée des comptes sans vérification Stripe réelle

module.exports = router;
