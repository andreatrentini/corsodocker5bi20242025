const config = {
    localPort: 3000,
    dbInitParams: {
        host: 'sqlserver',
        user: 'root',
        password: 'cisco',
        multipleStatements: true
    },
    dbParams: {
        host: 'sqlserver',
        user: 'root',
        password: 'cisco',
        database: 'corsows'
    },
    initPassword: '12345',
    defaultAdminPassword: 'cisco',
    saltRounds: 10
}
module.exports = config;