const config = {
    localPort: 3000,
    dbInitParams: {
        host: 'sqlserver',
        user: 'root',
        password: 'cisco',
        multipleStatements: true
    },
    initPassword: '12345'
}
module.exports = config;