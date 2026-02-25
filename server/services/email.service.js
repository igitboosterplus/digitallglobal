const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_PORT == 465, // true pour 465, false pour les autres
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends a welcome email to the new user.
 * @param {string} email - User's email
 * @param {string} tempPassword - Auto-generated password
 * @param {Object} orderDetails - Object containing order details (planName, amount, currency, transactionId, date)
 * @param {string} firstName - User's first name
 */
async function sendWelcomeEmail(email, tempPassword, orderDetails, firstName) {
    const memberAreaUrl = process.env.MEMBER_AREA_URL || 'https://digitallglobal.com/login';
    const { planName, amount, currency, transactionId, date } = orderDetails;

    const mailOptions = {
        from: `"Digitall Global" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '🚀 Bienvenue chez Digitall Global - Vos Accès Immédiats',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2d3748; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
                    .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #0099CC; }
                    .header h1 { color: #0099CC; margin: 0; font-size: 24px; }
                    .content { padding: 20px 0; }
                    .credentials { background-color: #f7fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #0099CC; margin: 20px 0; }
                    .button { display: inline-block; background-color: #0099CC; color: #ffffff !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; text-align: center; }
                    .order-details { background-color: #edf2f7; padding: 15px; border-radius: 6px; margin: 20px 0; }
                    .order-details h3 { margin-top: 0; color: #2d3748; font-size: 18px; }
                    .footer { text-align: center; font-size: 12px; color: #718096; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                    .step { margin-bottom: 10px; }
                    .warning { font-size: 13px; color: #e53e3e; font-style: italic; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Digitall Global</h1>
                    </div>
                    <div class="content">
                        <h2>Félicitations, ${firstName || 'Cher client'} !</h2>
                        <p>Nous sommes ravis de vous accueillir. Votre commande a été traitée avec succès et votre compte utilisateur vient d'être généré automatiquement.</p>
                        
                        <div class="credentials">
                            <h3>Vos Accès de Connexion</h3>
                            <p><strong>Identifiant (Email) :</strong> ${email}</p>
                            <p><strong>Mot de passe :</strong> <code style="background: #eee; padding: 2px 5px; border-radius: 3px;">${tempPassword}</code></p>
                            <p class="warning">⚠️ Il vous sera demandé de changer ce mot de passe lors de votre première connexion pour garantir la sécurité de votre compte.</p>
                        </div>

                        <div style="text-align: center;">
                            <a href="${memberAreaUrl}" class="button">Accéder à mon Espace Membre</a>
                        </div>

                        <div class="order-details">
                            <h3>Détails de la Commande</h3>
                            <table width="100%">
                                <tr><td><strong>Offre choisie :</strong></td><td>${planName}</td></tr>
                                <tr><td><strong>Montant payé :</strong></td><td>${amount} ${currency}</td></tr>
                                <tr><td><strong>ID Transaction :</strong></td><td><small>${transactionId}</small></td></tr>
                                <tr><td><strong>Date :</strong></td><td>${date}</td></tr>
                            </table>
                        </div>

                        <h3>🚀 Prochaines Étapes</h3>
                        <div class="step">1️⃣ <strong>Connexion :</strong> Utilisez le lien ci-dessus pour vous connecter.</div>
                        <div class="step">2️⃣ <strong>Sécurisation :</strong> Changez votre mot de passe temporaire.</div>
                        <div class="step">3️⃣ <strong>Configuration :</strong> Suivez le guide interactif pour commencer à configurer votre site.</div>
                        <div class="step">4️⃣ <strong>Support :</strong> En cas de besoin, notre équipe est disponible dans l'onglet "Support" de votre espace.</div>

                        <p>Bienvenue dans l'aventure !</p>
                        <p>Cordialement,<br><strong>L'équipe Digitall Global</strong></p>
                    </div>
                    <div class="footer">
                        © ${new Date().getFullYear()} Digitall Global. Tous droits réservés.<br>
                        Ceci est un email automatique, merci de ne pas y répondre directement.
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
}

/**
 * Sends a notification email to the admin about a new sale.
 */
async function sendAdminNotification(orderDetails, customerEmail, customerName) {
    const { planName, amount, currency, transactionId } = orderDetails;

    const mailOptions = {
        from: `"Système Digitall Global" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Utilise ADMIN_EMAIL si défini, sinon SMTP_USER
        subject: `💰 NOUVELLE VENTE : ${planName} (${amount} ${currency})`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2ecc71;">Bravo ! Une nouvelle vente vient d'être réalisée.</h2>
                <hr>
                <p><strong>Client :</strong> ${customerName} (${customerEmail})</p>
                <p><strong>Offre :</strong> ${planName}</p>
                <p><strong>Montant :</strong> ${amount} ${currency}</p>
                <p><strong>ID Transaction :</strong> <small>${transactionId}</small></p>
                <hr>
                <p style="font-size: 12px; color: #888;">Ceci est une notification automatique de votre moteur de vente Digitall Global.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Admin notification sent for sale: ${transactionId}`);
    } catch (error) {
        console.error('Error sending admin notification:', error);
        // On ne bloque pas le processus si la notification admin échoue
    }
}

module.exports = {
    sendWelcomeEmail,
    sendAdminNotification
};
