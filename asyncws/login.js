const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { pool } = require('./db');
const config = require('./config')

const router = express.Router();

router.post('',
    [
        body('username').notEmpty().withMessage('Username è richiesto.'),
        body('password').notEmpty().withMessage('Password è richiesta.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { username, password } = req.body;        

        try {
            const stringSQL = 'SELECT username, password, role FROM users WHERE username=?';
            const result = await pool.execute(stringSQL, [username]);
            if (!result) {
                res.status(401).json({ messaggio: 'Username non trovato.' });
            }
            if (!bcrypt.compareSync(password, result[0][0].password)) {
                res.status(401).json({ messaggio: 'Username o password errati.' });
            }
            const token = jwt.sign(result[0][0], config.jwtSecret, { expiresIn: 3600 });
            res.status(200).json({
                tipo: 'Bearer',
                durata: 3600,
                token: token
            });
        }
        catch (error) {
            console.log('catch', error);
            res.status(500).json({ error: 'Errore interno del server.' });
        }
    });
module.exports = router;