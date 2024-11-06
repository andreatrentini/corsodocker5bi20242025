const jwt = require('jsonwebtoken');
const { pool } = require('./db');
const config = require('./config')

function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ messaggio: 'Accesso negato. Token mancante.' });
    }
  
    // Verifica il token
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ messaggio: 'Token non valido.' });
      }
  
      // Aggiungi l'utente al request object
      req.user = user;
      next();
    });
  }
  
function authAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ messaggio: 'Accesso negato. Token mancante.' });
    }
  
    // Verifica il token
    jwt.verify(token, config.jwtSecret, async (err, user) => {
      if (err) {
        return res.status(403).json({ messaggio: 'Token non valido.' });
      }      

      stringSQL = "SELECT * FROM users WHERE username=? AND role='admin'";

      const result = await pool.execute(stringSQL, [user.username]);

      if (result[0].length == 0) {
        res.status(401).json({ messaggio: 'Accesso autorizzato solo agli amministratori.' });
      }      
      // Aggiungi l'utente al request object
      else {
        req.user = user;
        next();
      }
    });
  }

  module.exports = { auth, authAdmin };