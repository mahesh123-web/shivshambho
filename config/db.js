const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

let pool;

if (connectionString) {
    console.log('Using connection string directly for production deployment...');
    pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });
} else {
    console.error('⚠️  DATABASE_URL is not set!');
    pool = new Pool({
        host: 'localhost',
        port: 6543,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        ssl: false
    });
}

// Test connection on startup
pool.query('SELECT NOW()')
    .then(res => console.log('✅ DB connected at:', res.rows[0].now))
    .catch(err => console.error('❌ DB connection test failed:', err.message));

pool.on('error', (err) => {
    console.error('❌ Database pool error:', err.message);
});

module.exports = pool;
