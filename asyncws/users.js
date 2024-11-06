const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { pool } = require('./db');
const { authAdmin } = require('./auth');
const config = require('./config');
const { getFields, getInsertFields, getValues, getColumns, getInsertPlaceholders, getUpdateFields } = require('./utils');

const router = express.Router();
router.use(authAdmin);

router.get('', async (req, res) => {
    try {
        const SQLstring = 'SELECT * FROM users;'
        const [data] = await pool.execute(SQLstring);
        res.status(200).send(data);
    }
    catch (error) {
        //res.status(500).json({ error: 'Errore interno del server.' });
    }
})

router.post('', [
    body('username').notEmpty().withMessage('Username è richiesto.'),
    body('password').notEmpty().withMessage('Password è richiesta.'),
    body('role').notEmpty().withMessage('Role è richiesto.'),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        let presentFields = getFields(req.body, 'users');

        const cryptedPassword = bcrypt.hashSync(presentFields.password, config.saltRounds);
        presentFields.password = cryptedPassword;

        const stringSQL = `INSERT INTO users ${getInsertFields(presentFields)} VALUES ${getInsertPlaceholders(presentFields)}`;
        try {
            const result = await pool.execute(stringSQL, getValues(presentFields));
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).json({ error: error })
        }
    })

router.put('/:id', async (req, res) => {

    const id = req.params.id;

    let presentFields = getFields(req.body, 'users');

    if (getColumns(presentFields).includes('password')) {
        const cryptedPassword = bcrypt.hashSync(presentFields.password, config.saltRounds);
        presentFields.password = cryptedPassword;
    }

    const stringSQL = `UPDATE users SET ${getUpdateFields(presentFields)} WHERE id = ?`;
    const values = getValues(presentFields);
    values.push(id);
    try {
        const result = await pool.execute(stringSQL, values);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const stringSQL = 'DELETE FROM users WHERE id=?';
    try {
        const result = await pool.execute(stringSQL, [id]);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router;