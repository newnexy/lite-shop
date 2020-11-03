const mysql = require('mysql')
const config = require('./config.json')

module.exports = connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    database: config.database.database,
    password: config.database.password
})



