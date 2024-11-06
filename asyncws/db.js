const mysql = require('mysql2/promise');

const initDB = {
    host: 'sqlserver',
    user: 'root',
    password: 'cisco',
    multipleStatements: true,
    port: 3306,
};

const pool = mysql.createPool({
    host: 'sqlserver',
    user: 'root',
    password: 'cisco',    
    port: 3306,
    database: 'corsows',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})
module.exports = {
  initDB, 
  pool
};