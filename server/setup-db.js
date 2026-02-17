const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
    let connection;
    try {
        console.log('Starting database setup...');

        // 1. Connect without database first to ensure the DB exists
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log(`Connected to MySQL at ${process.env.DB_HOST}`);

        // 2. Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`Database "${process.env.DB_NAME}" ensured.`);

        // 3. Switch to the database
        await connection.query(`USE \`${process.env.DB_NAME}\``);

        // 4. Load and run schema
        const schemaPath = path.join(__dirname, 'db', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        const queries = schema
            .split(';')
            .map(q => q.trim())
            .filter(q => q.length > 0);

        for (const query of queries) {
            await connection.query(query);
        }
        console.log('Schema executed successfully.');

        // 5. Insert default plans
        const [existingPlans] = await connection.query('SELECT id FROM plans LIMIT 1');
        if (existingPlans.length === 0) {
            console.log('Inserting default plans...');
            await connection.query(
                'INSERT INTO plans (name, stripe_price_id, price) VALUES (?, ?, ?)',
                ['premium', 'price_H1_premium_test', 49.00]
            );
            await connection.query(
                'INSERT INTO plans (name, stripe_price_id, price) VALUES (?, ?, ?)',
                ['platinum', 'price_H1_platinum_test', 99.00]
            );
            console.log('Default plans inserted.');
        }

        console.log('Database setup completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during database setup:', error);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

setupDatabase();
