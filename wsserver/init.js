const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('./db')
const config = require('./config')

const router = express.Router();

router.post('', async (request, response) => {

})

module.exports = router;