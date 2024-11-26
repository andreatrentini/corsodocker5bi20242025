const jwt = require('jsonwebtoken');
const config = require('./config');
const { dbPool } = require('./db');

// File che contiene i middlware di autenticazione

function adminAuth(request, response, next) {
    //1. Recupero dalla header della richiesta il token bearer
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return response.status(401).json({
            messaggio: 'Token non presente, accesso negato.'
        })
    }

    // Il token è presente
    // Controllo la validità del token

    jwt.verify(token, config.secretKey, async (error, data) => {
        if(error) {
            return response.status(401).json({
                messaggio: 'Token non valido, accesso negato.'
            })
        }
        const stringSQL = "SELECT username, role FROM users WHERE username = ? AND role = 'admin';";

        const [users] = await dbPool.execute(stringSQL, [data.username]);

        if(users.length == 0) {
            return response.status(401).json({
                messaggio: 'Permessi non sufficienti, accesso negato.'
            })
        }

        // Il token è valido e i permessi di accesso sono corretti
        next();
    })
}

module.exports = adminAuth;