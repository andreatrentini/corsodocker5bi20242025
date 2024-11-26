const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbPool } = require('./db');
const config = require('./config');

const router = express.Router();

router.post('', async (req, res) => {
    // 1. Recupero username e password inviate dall'utente
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(400).json({
            messaggio: 'Username e password obbligatori.'
        })
    }

    try {
        //2. Recupero dal database l'utente con username specificato
        const stringSQL = 'SELECT username, password, role FROM users WHERE username = ?';
        const [users] = await dbPool.execute(stringSQL, [username]);
        if(users.length == 0) {
            // L'utente specificato non esiste
            return res.status(401).json({
                messaggio: 'Username non esistente.'
            })
        }
        // 3. Controllo se la password è corretta
        if(!bcrypt.compareSync(password, users[0].password)) {
            return res.status(401).json({
                messaggio: ' Password errata.'
            })
        }

        const datiDaIncludereNelToken = {
            username: users[0].username,
            role: users[0].role
        };

        // 4. Creo il token Bearer

        const token = jwt.sign(datiDaIncludereNelToken, config.secretKey, {expiresIn: config.expireInToken});

        //5. Invio il token Bearer al client
        return res.status(200).json({
            tipo: 'Bearer',
            expiresIn: config.expireInToken,
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore interno del server',
            descrizione: error
        })
    }
})

module.exports = router;