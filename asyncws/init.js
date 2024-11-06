const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const { initDB } = require('./db');
const fs = require('fs');
const config = require('./config');

const router = express.Router();

router.post('', async (req, res) => {
    const { initSecret, adminPassword } = req.body;
   
    if (!initSecret || !adminPassword) {
        return res.status(401).json({messaggio: 'initSecret e adminPassword richiesti'})
    };
    if (initSecret != config.initSecret) {
        return res.status(401).json({messaggio: 'initSecret non corretta.'})
    }

    const connection = await mysql.createConnection(initDB);
    
    try {
        const initSQL = fs.readFileSync('./init.sql', 'utf8');
        let result = await connection.query(initSQL);        
        const cryptedPassword = bcrypt.hashSync(adminPassword, config.saltRounds);
        const userSQL = "INSERT INTO users (username, password, role) values ('admin', ?, 'admin');"
        result = await connection.query(userSQL, cryptedPassword);
        const logSQL = "insert into logs (operation_datetime, operation, user) values (now(), 'Admin user created', 'System');"
        result = await connection.query(logSQL, cryptedPassword);
        res.status(200).json({messaggio: 'Database inizializzato correttamente.'});
    }
    catch (error){
        //console.log(error);
        res.status(500).json({error: 'Errore interno del server.'});
    }
    finally {
        await connection.end();
    }   
})

module.exports = router;