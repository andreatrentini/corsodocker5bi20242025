const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');

const config = require('./config');

const router = express.Router();

router.get('', (request, response) => {
    let connessione = mysql.createConnection()
})