const { sendWelcomeEmail } = require('./services/email.service');

async function testEmail() {
    console.log('🧪 Test d\'envoi d\'email...\n');

    const testOrderDetails = {
        planName: 'Offre Premium (TEST)',
        amount: 1799.00,
        currency: 'EUR',
        transactionId: 'test_transaction_12345',
        date: new Date().toLocaleDateString('fr-FR')
    };

    try {
        await sendWelcomeEmail(
            'toyatankwajoelsorel@gmail.com', // Votre email réel pour le test
            'MotDePasseTest123',
            testOrderDetails,
            'Joel'
        );
        console.log('✅ Email envoyé avec succès !');
        console.log('📧 Vérifiez votre boîte mail (et les spams).');
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi :', error.message);
        console.error('Détails:', error);
    }

    process.exit(0);
}

testEmail();
