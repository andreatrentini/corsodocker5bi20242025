const express = require('express');
const { dbPool } = require('./db');
const adminAuth = require('./auth');

const router = express.Router();

router.use(adminAuth);

router.get('', async (req, res) => {
    try {
        const stringSQL = 'SELECT * FROM users;'
        const [users] = await dbPool.execute(stringSQL);
        return res.status(200).json(users);
    }
    catch {
        return res.status(500).json({
            messaggio: 'Errore interno del server',
            descrizione: error
        })
    }
})

module.exports = router;