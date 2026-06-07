import pkg from "pg"
const { Pool } = pkg
 
export const pool = new Pool({
  user: 'postgres',
  password: 'post',
  host: 'localhost',
  port: 5432,
  database: 'pokemones',
})
