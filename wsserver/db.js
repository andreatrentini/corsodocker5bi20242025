const mysql = require('mysql2/promise');

const dbInitParams = {
        host: 'sqlserver',
        user: 'root',
        password: 'cisco',
        multipleStatements: true
    }

const dbPool = mysql.createPool({
    host: 'sqlserver',
    user: 'root',
    password: 'cisco',
    database: 'corsows',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = { dbInitParams, dbPool };