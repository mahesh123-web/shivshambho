const mysql = require('mysql2');

let pool;

// Railway provides MYSQL_URL or MYSQL_PRIVATE_URL as connection strings
const connectionUrl = process.env.MYSQL_URL || process.env.MYSQL_PRIVATE_URL || process.env.MYSQL_PUBLIC_URL;

if (connectionUrl) {
    console.log('Connecting to MySQL via connection URL...');
    pool = mysql.createPool({
        uri: connectionUrl,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} else {
    // Local development fallback
    // Railway also injects vars without underscores: MYSQLHOST, MYSQLUSER, etc.
    console.log('Connecting to MySQL via individual credentials...');
    pool = mysql.createPool({
        host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
        user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER || 'root',
        password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || 'Mahesh@317',
        database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'ceramic_coating_studio',
        port: parseInt(process.env.MYSQLPORT || process.env.MYSQL_PORT || '3306'),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

// Use promise-based API
const promisePool = pool.promise();

module.exports = promisePool;
