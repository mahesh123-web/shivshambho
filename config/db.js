const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

let pool;

if (connectionString) {
    let finalConnectionString = connectionString.trim();
    if (!finalConnectionString.startsWith('postgres://') && !finalConnectionString.startsWith('postgresql://')) {
        console.log('Adding missing postgresql:// prefix to connection string...');
        finalConnectionString = 'postgresql://' + finalConnectionString;
    }

    console.log('Using native URL parsing for robust production deployment...');
    try {
        const parsedUrl = new URL(finalConnectionString);

        const config = {
            user: parsedUrl.username,
            password: decodeURIComponent(parsedUrl.password),
            host: parsedUrl.hostname,
            port: parsedUrl.port ? parseInt(parsedUrl.port) : 5432,
            database: parsedUrl.pathname ? parsedUrl.pathname.split('/')[1] : 'postgres',
            // Explicitly enforce SSL overrides regardless of query strings
            ssl: { rejectUnauthorized: false }
        };

        pool = new Pool(config);
    } catch (err) {
        console.error('Failed to parse database URL:', err);
    }
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
