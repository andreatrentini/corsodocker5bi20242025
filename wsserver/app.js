// Caricare tutte le librerie necessarie alla nostra applicazione
const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const config = require('./config');
const { error } = require('console');

// Creare la nostra applicazione
const app = express();

// Aggiungo moduli middleware da usare nel catenza di elaborazioni di express
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

// Impostiamo la nostra app in modo che sia in grado di inviare al client i file contenuti nella cartella public
app.use('', express.static('public'));

app.post('/init', (request, response) => {
    // Recupero la password necessaria ad inizializzare il database dal body della richiesta http inviata dal client
    let clientPassword = request.body.initpassword;
    // Recupero la password da impostare per admin
    let adminPassword = request.body.adminpassword;

    if (clientPassword === config.initPassword) {
        try {
            // OK, la password è corretta
            // Creaiamo una connessione con mysql server        
            let connessione = mysql.createConnection(config.dbInitParams);
    
            // Carichiamo il file init.sql dal file system
            let scriptSQL = fs.readFileSync('init.sql', 'utf8');

            // Eseguiamo lo script sul nostro server mysql
            // Il metodo query prevede in questa modalità 2 parametri, il primo è uno string contente le istruzioni 
            // SQL da eseguire, il secondo è la funzione di callback da eseguire al termine dell'operazione sul server mysql.
            // La funzione prevede due parametri, error: inizializzato in caso di errore, e data: contiene la risposta 
            // del server in caso di istruzioni eseguite correttamente.
            connessione.query(scriptSQL, (error, data) => {
                if (!error) {
                    // Se nella richiesta http non è presente adminpassword, uso la password di default presente in config.js
                    if (!adminPassword) {
                        adminPassword = config.defaultAdminPassword;
                    }
                    // creo la versione criptata della password
                    let cryptoAdminPassword = bcrypt.hashSync(adminPassword, config.saltRounds);

                    let SQLstring = "INSERT INTO users (username, password, role) values ('admin', ?, 'admin');";

                    connessione.query(SQLstring, cryptoAdminPassword, (error, data) => {
                        if (!error) {
                            SQLstring = "insert into logs (operation_datetime, operation, user) values (now(), 'Added admin user', 'System');"
                            connessione.query(SQLstring, (error, data) => {
                                if (!error) {
                                    // Termino la connessione con il database
                                    // Nella funzione di callback eseguita al termina della chiusura non includo nessuna istruzione
                                    connessione.end(() => {});
                                    
                                    // Non c'è stato errore, invio al client lo status 200 con una frase che indichi la corretta
                                    // esecuzione dello script. Quando viene eseguita la funzione send, l'esecuzione del codice viene interrotta.
                                    response.status(200).send('Database inizializzato correttamente.');
                                }
                                else {
                                    connessione.end(() => {});
                                    // C'è stato un errore nella creazione del log, lo invio al client con lo status 500 (Internal server error.)
                                    response.status(500).send(error);
                                }
                            })
                        }
                        else {
                            connessione.end(() => {});
                            // C'è stato un errore nella creazione dell'utente admin, lo invio al client con lo status 500 (Internal server error.)
                            response.status(500).send(error);
                        }
                    })
                }
                else {
                    connessione.end(() => {});
                    // C'è stato un errore durante l'esecuzione dello script, lo invio al client con lo status 500 (Internal server error.)
                    response.status(500).send(error);
                }
            })

        }
        catch {
            // C'è stato un errore, lo invio al client con lo status 500 (Internal server error.)
            response.status(500).send('Errore nel server');
        }
    }
    else {
        // La password di inizializzazione non è corretta, invio messaggio 401
        response.status(401).send('Accesso non autorizzato.');
    }
})

const server = app.listen(config.localPort, () => {
    console.log('Server in ascolto sulla porta ' + config.localPort + '...');
})




