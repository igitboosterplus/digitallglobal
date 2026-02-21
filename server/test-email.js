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
        // Test 1: Email de bienvenue Client
        console.log('Envoi de l\'email client...');
        await sendWelcomeEmail(
            process.env.SMTP_USER,
            'MOT_DE_PASSE_123',
            fakeOrder,
            'Client Test'
        );

        // Test 2: Notification Admin
        const { sendAdminNotification } = require('./services/email.service');
        console.log('Envoi de la notification admin...');
        await sendAdminNotification(
            fakeOrder,
            'client@test.com',
            'Client Test'
        );

        console.log('✅ TEST RÉUSSI : Les deux emails ont été envoyés !');
        console.log('Vérifiez votre boîte de réception pour les deux messages.');
    } catch (error) {
        console.error('❌ ÉCHEC DU TEST :', error.message);
        if (error.message.includes('Invalid login')) {
            console.log('Conseil : Vérifiez votre mot de passe d\'application Gmail.');
        }
    }
}

testEmail();
