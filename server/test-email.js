const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { sendWelcomeEmail } = require('./services/email.service');

async function testEmail() {
    console.log('--- TEST D\'ENVOI D\'EMAIL ---');
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP User:', process.env.SMTP_USER);

    const fakeOrder = {
        planName: 'Offre Pro (Test)',
        amount: '1599',
        currency: 'EUR',
        transactionId: 'TEST_' + Date.now(),
        date: new Date().toLocaleDateString()
    };

    try {
        // Test 1: Email de bienvenue Client (Nouveau)
        console.log('Envoi de l\'email de bienvenue (nouveau client)...');
        await sendWelcomeEmail(
            process.env.SMTP_USER,
            'MOT_DE_PASSE_123',
            fakeOrder,
            'Nouveau Client'
        );

        // Test 2: Confirmation de commande Simple (Client existant)
        const { sendOrderConfirmation } = require('./services/email.service');
        console.log('Envoi de la confirmation simple (client existant)...');
        await sendOrderConfirmation(
            process.env.SMTP_USER,
            fakeOrder,
            'Ancien Client'
        );

        // Test 3: Notification Admin
        const { sendAdminNotification } = require('./services/email.service');
        console.log('Envoi de la notification admin...');
        await sendAdminNotification(
            fakeOrder,
            'client@test.com',
            'Client Test'
        );

        console.log('\n✅ TEST FINAL RÉUSSI !');
        console.log('Vérifiez votre boîte de réception pour les 3 messages de test.');
    } catch (error) {
        console.error('❌ ÉCHEC DU TEST FINAL :', error);
    }
}

testEmail();
