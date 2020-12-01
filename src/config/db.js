const { Pool } = require('pg')

// credencias necessárias para acessar ao banco de dados e assim, executar as querys
module.exports = new Pool({
    user: "postgres",
    password: "nichi",
    host: "localhost",
    port: 5432,
    database: "biblio"
})