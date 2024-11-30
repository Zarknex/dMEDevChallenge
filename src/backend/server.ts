import express from 'express'
import { Server } from 'http' // Importa el tipo Server

let server: Server // Declara la variable con el tipo Server

export const startServer = () => {
  const app = express()

  app.get('/', (req, res) => res.send('Hello, from the backend!'))

  const PORT = 3000
  server = app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`)
  })
}

export const stopServer = () => {
  if (server) {
    server.close(() => {
      console.log('Backend server stopped.')
    })
  }
}
