const axios = require('axios');

async function simulateStripeWebhook() {
    console.log('🔄 Simulation d\'un webhook Stripe pour tester la création de compte...\n');

    // Données simulées d'une session Stripe réussie
    const fakeSession = {
        id: 'cs_test_simulation_' + Date.now(),
        customer: 'cus_test_simulation',
        customer_details: {
            email: 'toyatankwajoelsorel@gmail.com', // Votre email pour le test
            name: 'Joel Toya'
        },
        subscription: 'sub_test_simulation',
        amount_total: 179900, // 1799€ en centimes
        currency: 'eur',
        payment_intent: 'pi_test_simulation',
        line_items: {
            data: [
                {
                    price: {
                        id: 'price_1SwPhbE7xgnUSKkwi2BYG764' // Premium plan
                    }
                }
            ]
        }
    };

    try {
        console.log('📤 Envoi de la simulation au webhook handler...');

        const response = await axios.post('http://localhost:5000/api/webhook/test-payment', {
            session: fakeSession
        });

        console.log('✅ Webhook traité avec succès !');
        console.log('📧 Un email devrait avoir été envoyé à:', fakeSession.customer_details.email);
        console.log('\nVérifiez votre boîte mail (et les spams) !');
    } catch (error) {
        console.error('❌ Erreur:', error.response?.data || error.message);
    }

    process.exit(0);
}

simulateStripeWebhook();
