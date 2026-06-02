const express = require('express') //importo framework express
const app = express() //inicializo api
const port = 3000

let pokemons = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Charmander' },
    { id: 3, name: 'Squirtle' }
  ]

app.get('/', (req, res) => { //get http | request,response
  res.status(200).send('Hello World!') //cada vez que armo un endpoint, tengo que enviar una respuesta al cliente, sino se queda esperando y se va a agotar el tiempo de espera
})

app.get('/api/v1/pokemons', (req, res) => {
    res.send('Lista de pokemons')
    res.status(200).json(pokemons) //envio un json con los pokemons
})

app.get('/api/v1/pokemons/:id', (req, res) => {
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