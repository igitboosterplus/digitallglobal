const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { handleSuccessfulPayment } = require('../services/stripe.service');

router.post('/stripe', async (req, res) => {
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

// 🧪 TEST ENDPOINT - Pour simuler un paiement sans Stripe CLI
router.post('/test-payment', async (req, res) => {
    console.log('🧪 Test endpoint called - Simulating payment webhook...');

    const { session } = req.body;

    try {
        await handleSuccessfulPayment(session);
        console.log('✅ Test payment processed successfully!');
        res.json({ success: true, message: 'Account created and email sent!' });
    } catch (error) {
        console.error('❌ Test payment error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
