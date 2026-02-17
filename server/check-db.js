const pool = require('./config/db');

async function checkDb() {
    try {
        const [rows] = await pool.execute('SHOW TABLES');
        console.log('Tables in database:', rows.map(r => Object.values(r)[0]));

        const [plans] = await pool.execute('SELECT * FROM plans');
        console.log('Plans in database:', plans);

        process.exit(0);
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
}

checkDb();
