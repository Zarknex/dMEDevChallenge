// server.ts
import express from 'express'
import bodyParser from 'body-parser'
import { savePokemonToPCBox, getPCBoxPokemon } from './controllers/pcBoxController'
import { Server } from 'http'
import cors from 'cors'

let server: Server

export const startServer = () => {
  const app = express()
  const PORT = 3000

  app.use(
    cors({
      origin: 'http://localhost:5173', // Permitir solicitudes desde tu frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
      allowedHeaders: ['Content-Type'] // Encabezados permitidos
    })
  )
  app.use(bodyParser.json())

  app.post('/api/pcbox', async (req, res) => {
    try {
      await savePokemonToPCBox(req.body)
      res.status(201).send({ message: 'Pokémon guardado en PCBox exitosamente.' })
    } catch (error) {
      res.status(400).send({ error: error })
    }
  })

  app.get('/api/pcbox', async (req, res) => {
    try {
      const pokemons = await getPCBoxPokemon()
      res.send(pokemons)
    } catch (error) {
      res.status(500).send({ error: error })
    }
  })

  server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
}

export const stopServer = () => {
  if (server) {
    server.close(() => {
      console.log('Backend server stopped')
    })
  }
}
