// Caricare tutte le librerie necessarie alla nostra applicazione
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const rInit = require('./init');
const rUsers = require('./users');
const rLogin = require('./login');
const config = require('./config')
const parseJSON = require('./json');
const consoleLog = require('./console-log');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(parseJSON);
app.use(consoleLog);
//app.use(bp.json());
//app.use(bp.urlencoded({extended: false}));

app.use('', express.static('public'));

app.use('/init', rInit);
app.use('/users', rUsers);
app.use('/login', rLogin);


app.listen(config.localPort, () => {
    console.log(`Server in ascolto sulla porta ${config.localPort}...`)
})
