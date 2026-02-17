const pool = require('./config/db');
require('dotenv').config();

async function updatePlans() {
    try {
        console.log('Updating plans with real Stripe Price IDs...');

        // Update Access
        await pool.execute(
            'UPDATE plans SET stripe_price_id = ? WHERE name = ?',
            ['price_1SwPd5E7xgnUSKkw424ImaIB', 'premium'] // 'premium' was used as placeholder name for Access in setup-db
        );

        // Update Premium (Freelance)
        await pool.execute(
            'UPDATE plans SET stripe_price_id = ? WHERE name = ?',
            ['price_1SwPhbE7xgnUSKkwi2BYG764', 'platinum'] // 'platinum' was used as placeholder name for Premium in setup-db
        );

        // Add Platinium if it doesn't exist correctly
        const [rows] = await pool.execute('SELECT id FROM plans WHERE name = ?', ['platinium_real']);
        if (rows.length === 0) {
            await pool.execute(
                'INSERT INTO plans (name, stripe_price_id, price) VALUES (?, ?, ?)',
                ['platinium', 'price_1SwPjWE7xgnUSKkwEbxZ2alg', 2990.00]
            );
        } else {
            await pool.execute(
                'UPDATE plans SET stripe_price_id = ? WHERE name = ?',
                ['price_1SwPjWE7xgnUSKkwEbxZ2alg', 'platinium']
            );
        }

        // Cleanup names to match Pricing.jsx
        await pool.execute('UPDATE plans SET name = "access" WHERE stripe_price_id = "price_1SwPd5E7xgnUSKkw424ImaIB"');
        await pool.execute('UPDATE plans SET name = "premium" WHERE stripe_price_id = "price_1SwPhbE7xgnUSKkwi2BYG764"');
        await pool.execute('UPDATE plans SET name = "platinium" WHERE stripe_price_id = "price_1SwPjWE7xgnUSKkwEbxZ2alg"');

        console.log('Plans updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error updating plans:', error);
        process.exit(1);
    }
}

updatePlans();
