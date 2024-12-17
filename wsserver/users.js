const express = require('express');
const { body, validationResult } = require('express-validator');
const { dbPool } = require('./db');
const { adminAuth } = require('./auth');
const { correctInputData, getValues, setInsertFields, setInsertPlaceholders, setUpdateFields } = require('./utils')

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

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const stringSQL = 'SELECT * FROM users WHERE id = ?;';
        const [users] = await dbPool.execute(stringSQL, [id]);
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

    try {
        // Genero un oggetto con l'elenco delle proprietà corretto
        const dataCorrected = correctInputData(req.body, 'users');
        const SQLstring = 'INSERT INTO users ' + setInsertFields(dataCorrected) + ' VALUES ' + setInsertPlaceholders(dataCorrected) + ';';
        const insertData = getValues(dataCorrected);
        const result = await dbPool.execute(SQLstring, insertData);
        res.status(200).json(result);
    }
    catch (error)
    {
        res.status(500).json({
            messaggio: 'Errore interno del server',
            descrizione: error
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dataCorrected = correctInputData(req.body, 'users');
        const SQLstring = 'UPDATE users SET ' + setUpdateFields(dataCorrected) + ' WHERE id = ?;';
        const updateData = getValues(dataCorrected);
        updateData.push(id);
        const result = await dbPool.execute(SQLstring, updateData);
        res.status(200).json(result);
    }
    catch (error)
    {
        res.status(500).json({
            messaggio: 'Errore interno del server',
            descrizione: error
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const SQLstring = 'DELETE FROM users WHERE id = ?;';
        const result = await dbPool.execute(SQLstring, [id]);
        res.status(200).json(result);
    }
    catch (error)
    {
        res.status(500).json({
            messaggio: 'Errore interno del server',
            descrizione: error
        })
    }
})


module.exports = router;