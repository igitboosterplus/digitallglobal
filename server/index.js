const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

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
