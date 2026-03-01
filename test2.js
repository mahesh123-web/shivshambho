const { Pool } = require('pg');

let testString1 = 'postgresql://postgres.awpujhoouhudcsvusmtm:dhanve2003mahesh@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?sslmode=require';

console.log("Testing with valid string:");
const pool1 = new Pool({
    connectionString: testString1,
    ssl: { rejectUnauthorized: false }
});

pool1.connect()
    .then(client => {
        console.log("Connected successfully to pool1!");
        client.release();
    })
    .catch(err => {
        console.error("Pool 1 Connection Error Host:", err.address, "Port:", err.port, "Code:", err.code);
    });
