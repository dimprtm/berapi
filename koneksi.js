const mysql = require('mysql');

// koneksi ke database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'berapi'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql terkoneksi');
});

module.exports = conn;