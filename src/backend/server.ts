// server.ts
import express from 'express'
import bodyParser from 'body-parser'
import { savePokemonToPCBox, getPCBoxPokemon } from './controllers/pcBoxController'
import { Server } from 'http'
import cors from 'cors'
import { deleteAllData } from './models/pcBoxModel'

let server: Server

export const startServer = () => {
  const app = express()
  const PORT = 3000

  app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type']
    })
  )
  app.use(bodyParser.json())

  app.post('/api/pcbox', async (req, res) => {
    try {
      await savePokemonToPCBox(req.body)
      res.status(201).send({ message: 'Pokémon successfully saved to PCBox.' })
    } catch (error) {
      res.status(400).send({ error: error })
    }
  })

  app.get('/api/pcbox', async (_, res) => {
    try {
      const pokemons = await getPCBoxPokemon()
      res.send(pokemons)
    } catch (error) {
      res.status(500).send({ error: error })
    }
  })

  app.delete('/api/reset', async (_, res) => {
    try {
      await deleteAllData()
      res.status(201).send({ message: 'All data was cleared.' })
    } catch (error) {
      res.status(400).send({ error: error })
    }
  })

  server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

export const stopServer = () => {
  if (server) {
    server.close(() => {
      console.log('Backend server stopped')
    })
  }
}
