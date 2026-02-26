const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

let pool;

if (connectionString) {
    // Parse the connection string manually to handle special characters in password
    // Format: postgresql://user:password@host:port/database
    const match = connectionString.match(
        /^postgresql:\/\/([^:]+):(.+)@([^:]+):(\d+)\/(.+)$/
    );

    if (match) {
        const [, user, password, host, port, database] = match;
        console.log(`Connecting to PostgreSQL at ${host}:${port}...`);
        pool = new Pool({
            user,
            password,
            host,
            port: parseInt(port),
            database,
            ssl: { rejectUnauthorized: false }
        });
    } else {
        // Fallback: try using connectionString directly
        console.log('Using DATABASE_URL connection string directly...');
        pool = new Pool({
            connectionString,
            ssl: { rejectUnauthorized: false }
        });
    }
} else {
    console.error('⚠️  DATABASE_URL is not set!');
    pool = new Pool({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        ssl: false
    });
}

pool.on('connect', () => {
    console.log('✅ Connected to Supabase PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Database connection error:', err.message);
});

module.exports = pool;
