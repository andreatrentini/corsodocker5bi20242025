const config = {
    localPort: 3000,
    initPassword: '12345',
    saltRounds: 10,
    secretKey: 'Il teso che volete...',
    expireInToken: 3600,
    expireInRefreshToken: 86400,
    tables: {        
            users: ['id', 'name', 'surname', 'address', 'city', 'zipcode', 'state', 'birthdate', 'cell', 'phone', 'email', 'username', 'password', 'role']        
    }
}

module.exports = config;