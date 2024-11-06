const config = {
    localPort: 3100,
    initSecret: '12345',
    saltRounds: 10,
    jwtSecret: 'andrea',
    tableFields: {
        users: ['id', 'name', 'surname', 'address', 'city', 'zipcode', 'state', 'birthdate', 'cell', 'phone', 'email', 'username', 'password', 'role']
    }
}
module.exports = config;