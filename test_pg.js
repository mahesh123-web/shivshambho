const { Pool } = require('pg');
const parse = require('pg-connection-string');

let testString1 = 'postgresql://postgres.awpujhoouhudcsvusmtm:dhanve2003mahesh@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?sslmode=require';

const config = parse.parse(testString1);
config.ssl = { rejectUnauthorized: false };

const pool1 = new Pool(config);

pool1.connect()
    .then(client => {
        console.log("Connected successfully to pool1!");
        client.release();
    })
    .catch(err => {
        console.error("Pool 1 Connection Error Code:", err.code);
    });
