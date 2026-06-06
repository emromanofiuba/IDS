const express = require('express') //importo framework express
const { client } = require('./pool.js')
const app = express() //inicializo api
const port = 3000


app.get('/', (req, res) => { //get http | request,response
  res.status(200).send('Hello World!')
})

app.get('/api/v1/pokemons/:id', async (req, res) => {
  const id = req.params.id
  const db_res = await client.query('SELECT p.nombre, p.evolucion, t.nombre as tipo FROM pokemones p, tipos t WHERE p.tipo = t.id AND p.id = $1', [id]) 
  const pokemons = db_res.rows;
  
  if (db_res.rowCount === 0) {
    res.status(404).send({ error: 'No se encontraron pokemones' })
  }
  
  const pokemon = db_res.rows[0];

})

app.get('/api/v1/pokemons', async (req, res) => {
    const db_res = await client.query('SELECT * FROM pokemones');
    res.status(200).json(db_res.rows);
})

app.get('/api/v1/pokemons/:id', async (req, res) => {
    let indice = req.params.id 
    if (indice >= pokemons.length) {
        res.sendStatus(404).send({ error: 'Pokemon no encontrado' }) 
    } else {
        res.status(200).json(pokemons[indice])
    }
})

app.put('/api/v1/pokemons/:id', (req, res) => {
    let pokemon_Actualizado = req.body
    let indice = req.params.id

    if(req.body.name === undefined || req.body.name === '') {
        res.status(400).send({ error: 'El nombre del pokemon es requerido' })
    }

    pokemons[indice] = pokemon_Actualizado
    res.status(200).json(pokemons[indice])
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})