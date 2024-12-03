const express = require('express');
const { body, validationResult } = require('express-validator');
const { dbPool } = require('./db');
const { adminAuth } = require('./auth');
const { getFields } = require('./utils')

const router = express.Router();

router.use(adminAuth);

router.get('', async (req, res) => {
    try {
        const stringSQL = 'SELECT * FROM users;';
        const [users] = await dbPool.execute(stringSQL);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            messaggio: 'Errore interno del server',
            descrizione: error
        })
    }
})

router.post('', [
    body('username').notEmpty().withMessage('username è richiesto.'),
    body('password').notEmpty().withMessage('password è richiesto.'),
    body('role').notEmpty().withMessage('role è richiesto.'),
], async (req, res) => {
    const errori = validationResult(req);
    if (!errori.isEmpty()) {
        return res.status(400).json({
            errors: errori.array()
        })
    }

    getFields(req.body, "users");
    return res.status(200).json({
        messaggio: 'ok'
    })

})


module.exports = router;