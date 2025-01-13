const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');

const router = express.Router();

router.get('', (request, response) => {
    const authHeader = request.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];

    if(!refreshToken) {
        return response.status(401).json({
            messaggio: 'Token non presente, accesso negato.'
        })
    }
    jwt.verify(refreshToken, config.secretKey, async (error, data) => {
        if(error) {
            return response.status(401).json({
                messaggio: 'Token non valido, accesso negato.'
            })
        }
        if(data.type != 'refresh') {
            return response.status(401).json({
                messaggio: 'Token non valido, accesso negato.'
            })
        }
        const datiDaIncludereNelToken = {
            username: data.username,
            role: data.role,
            type: 'access'
        };
        
        const datiDaIncludereNelRefreshToken = {
            username: data.username,
            role: data.role,
            type: 'refresh'
        };

        const token = jwt.sign(datiDaIncludereNelToken, config.secretKey, { expiresIn: config.expireInToken });
        const newRefreshToken = jwt.sign(datiDaIncludereNelRefreshToken, config.secretKey, { expiresIn: config.expireInRefreshToken });

        //5. Invio il token Bearer al client
        return response.status(200).json({
            token: {
                tipo: 'Bearer',
                expiresIn: config.expireInToken,
                token: token
            },
            refres_token: {
                tipo: 'Bearer',
                expiresIn: config.expireInRefreshToken,
                token: newRefreshToken
            },
        });
    })
});

module.exports = router;