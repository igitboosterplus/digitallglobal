const axios = require('axios');
require('dotenv').config();

// Note: This test bypasses signature verification for easier local testing
// You should temporarily disable the signature check in webhook.routes.js for this to work
// or use the Stripe CLI for a real signature.

const mockSession = {
    type: 'checkout.session.completed',
    data: {
        object: {
            id: 'cs_test_123',
            customer: 'cus_test_123',
            customer_details: {
                email: 'testuser@example.com',
                name: 'Jean Dev'
            },
            subscription: 'sub_test_123',
            metadata: {
                price_id: 'price_H1_premium_test'
            }
        }
    }
};

async function testWebhook() {
    try {
        const response = await axios.post('http://localhost:5000/api/webhook/stripe', mockSession, {
            headers: {
                // In a real test, you'd need a valid signature
                'stripe-signature': 'mock_signature'
            }
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error testing webhook:', error.response?.data || error.message);
    }
}

testWebhook();
