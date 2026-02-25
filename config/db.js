const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mahesh@317',
    database: 'ceramic_coating_studio',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use promise-based API
const promisePool = pool.promise();

module.exports = promisePool;
