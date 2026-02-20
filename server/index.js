const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔒 Sécurité CORS : autorise uniquement votre frontend (Vercel) et localhost
const allowedOrigins = [
    process.env.FRONTEND_URL,                    // URL définie dans Vercel
    'https://digitallglobal.com',               // Ton domaine officiel
    'https://www.digitallglobal.com',           // Version avec www
    'http://localhost:5173',                     // Dev local
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Autorise :
        // 1. Les requêtes sans origine (Mobile, Postman, Webhooks)
        // 2. Ton domaine spécifique (FRONTEND_URL)
        // 3. Tous les domaines vercel.app (pour faciliter les tests)
        // 4. Localhost
        if (!origin ||
            allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.includes('localhost')) {
            callback(null, true);
        } else {
            console.warn('⛔ CORS refusé pour:', origin);
            callback(new Error('Non autorisé par CORS'));
        }
    },
    credentials: true
}));

// Webhook needs raw body for signature verification
app.use('/api/webhook/stripe', bodyParser.raw({ type: 'application/json' }));

// Regular body parser for other routes
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Stripe Backend is running');
});

// Routes
const webhookRoutes = require('./routes/webhook.routes');
const paymentRoutes = require('./routes/payment.routes');
const authRoutes = require('./routes/auth.routes');
app.use('/api/webhook', webhookRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

// Démarrage du serveur uniquement si on n'est pas sur Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Indispensable pour l'hébergement sur Vercel
module.exports = app;
