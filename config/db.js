const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || 'Mahesh@317',
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'ceramic_coating_studio',
    port: process.env.MYSQL_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use promise-based API
const promisePool = pool.promise();

module.exports = promisePool;

