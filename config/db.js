const { Pool } = require('pg');

// Use DATABASE_URL from environment (Supabase connection string)
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('⚠️  DATABASE_URL is not set! Please add it to your environment variables.');
}

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
    console.log('✅ Connected to Supabase PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Database connection error:', err.message);
});

module.exports = pool;
