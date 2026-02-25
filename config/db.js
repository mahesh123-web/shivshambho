const mysql = require('mysql2');

let pool;

// Try to parse MYSQL_URL connection string from Railway
const dbUrl = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_PRIVATE_URL || process.env.DATABASE_URL;

if (dbUrl) {
    try {
        const url = new URL(dbUrl);
        console.log(`Connecting to MySQL at ${url.hostname}:${url.port || 3306}...`);
        pool = mysql.createPool({
            host: url.hostname,
            port: parseInt(url.port) || 3306,
            user: url.username || 'root',
            password: url.password || '',
            database: url.pathname.replace('/', '') || 'railway',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    } catch (e) {
        console.error('Failed to parse MYSQL_URL:', e.message);
    }
}

if (!pool) {
    // Fallback: individual env vars (Railway also injects MYSQLHOST etc.)
    const host = process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || '3306');
    const user = process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER || 'root';
    const password = process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || 'Mahesh@317';
    const database = process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'ceramic_coating_studio';

    console.log(`Connecting to MySQL at ${host}:${port} (individual vars)...`);
    pool = mysql.createPool({
        host,
        port,
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

// Use promise-based API
const promisePool = pool.promise();

module.exports = promisePool;
