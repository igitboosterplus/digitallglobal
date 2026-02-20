const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔒 Sécurité CORS : autorise uniquement votre frontend (Vercel) et localhost
const allowedOrigins = [
    process.env.FRONTEND_URL,                    // Ex: https://www.digitallglobal.com
    'http://localhost:5173',                     // Dev local
    'http://localhost:3000',                     // Dev local alternatif
].filter(Boolean); // Supprime les valeurs undefined

app.use(cors({
    origin: function (origin, callback) {
        // Autorise les requêtes sans origin (Postman, curl, webhooks Stripe)
        if (!origin || allowedOrigins.includes(origin)) {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Indispensable pour l'hébergement sur Vercel
module.exports = app;
