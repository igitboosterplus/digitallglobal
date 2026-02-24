require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function testTaxSession() {
    console.log('🧪 Test de création de session avec Stripe Tax...');

    try {
        // On utilise un Price ID existant de l'offre Pro si possible
        const priceId = process.env.STRIPE_PRICE_PREMIUM || 'price_1SwPhbE7xgnUSKkwi2BYG764'; // Fallback auto-détecté

        console.log(`📍 Test avec Price ID: ${priceId}`);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'subscription', // La plupart de vos plans sont des abonnements
            customer_email: 'test-tax@example.com',
            automatic_tax: { enabled: true },
            tax_id_collection: { enabled: true },
            customer_details: {
                address: {
                    line1: '123 Rue de Rivoli',
                    postal_code: '75001',
                    city: 'Paris',
                    country: 'FR',
                }
            },
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });

        console.log('✅ Session créée avec succès !');
        console.log('🔗 URL de test:', session.url);
        console.log('\nSi Stripe Tax est activé, vous devriez voir la TVA française (20%) s\'ajouter dynamiquement sur cette page.');

    } catch (error) {
        console.error('❌ Erreur lors du test :', error.message);
        if (error.message.includes('automatic_tax')) {
            console.log('\n💡 Conseil : Assurez-vous d\'avoir configuré vos paramètres fiscaux dans le Dashboard Stripe (Tax > Settings).');
        }
    }
}

testTaxSession();
