const pool = require('./db');

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Database connected successfully:', rows);
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        process.exit();
    }
}

testConnection();
