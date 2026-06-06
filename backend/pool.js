const { Pool } = require('pg')
 
const client = new Pool({
  user: 'postgres',
  password: 'post',
  host: 'localhost',
  port: 5432,
  database: 'pokemones',
})

module.exports = { client }