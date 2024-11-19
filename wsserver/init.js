const express = require('express');
// Della liberia mysql2 usiamo la versione basata su Promise dei metodi
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs = require('fs');
const {dbInitParams} = require('./db')
const config = require('./config')

const router = express.Router();

// Creo un endpoint per il verbo HTTP POST per l'indirizzo http://localhost:3000/init
router.post('', async (request, response) => {
    let reqInitPassword = request.body.initPassword;
    let reqAdminPassword = request.body.adminPassword;

    if (reqInitPassword != config.initPassword) {
        // Mandiamo una risposta di errore e terminiamo l'elaborazione
        return response.status(401).json({
            messaggio: 'Init password errata.'
        });        
    }

    if (!reqAdminPassword) {
        return response.status(400).json({
            messaggio: 'Manca la password di admin.'
        });        
    }

    // OK ho initPassword corretta e adminPassword

    let connessione;

    try {
        // 1. stabiliamo una connessione con MySQL
        connessione = await mysql.createConnection(dbInitParams);
        // 2. carichiamo lo script SQL dal file init
        const scriptSQL = fs.readFileSync('./scripts/init.sql', 'utf8');
        // 3. eseguiamo lo script per inizializzare il database
        const r1 = await connessione.query(scriptSQL);     
        // 4. creiamo una versione criptata della password
        const passwordCriptata = bcrypt.hashSync(reqAdminPassword, config.saltRounds);
        // 5. Aggiungiamo l'utente admin alla tabella users
        const insertSQL = "INSERT INTO users (username, password, role) VALUES ('admin', ?, 'admin');"
        const r2 = await connessione.query(insertSQL, passwordCriptata);
        // 6. Registriamo l'operazione nella tabella logs
        const logSQL = "INSERT INTO logs (operation_datetime, operation, user) values (now(), 'Added admin user.', 'System'); "
        const r3 = await connessione.query(logSQL);
        // Cosa significa se siamo arrivati fin qui? Tutto è andato a buon fine
        response.status(200).json({
            messaggio: 'Database inizializzato correttamente.'
        })
    }
    catch (errore) {
        response.status(500).json({
            messaggio: 'Errore interno del server.',
            errore: errore
        })
    }
    finally {
        return await connessione.end();
    }
})

module.exports = router;