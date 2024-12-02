// server.ts
import express from 'express';
import bodyParser from 'body-parser';
import { saveCapturedPokemon, getCapturedPokemon, clearCapturedPokemon } from '../database/db'; // Tus funciones SQLite actuales
import { savePokemonToPCBox, getPCBoxPokemon, moveToPCBox } from './dbController'; // Funciones que crearás para PostgreSQL

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoints para la party (SQLite)
app.post('/api/party', (req, res) => {
  try {
    saveCapturedPokemon(req.body);
    res.status(201).send({ message: 'Pokémon capturado exitosamente.' });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/party', (req, res) => {
  const pokemons = getCapturedPokemon();
  res.send(pokemons);
});

app.delete('/api/party', (req, res) => {
  clearCapturedPokemon();
  res.send({ message: 'Todos los Pokémon en la party han sido liberados.' });
});

// Endpoints para la PCBox (PostgreSQL)
app.post('/api/pcbox', async (req, res) => {
  try {
    await savePokemonToPCBox(req.body);
    res.status(201).send({ message: 'Pokémon guardado en PCBox exitosamente.' });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/pcbox', async (req, res) => {
  try {
    const pokemons = await getPCBoxPokemon();
    res.send(pokemons);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint para mover Pokémon a la PCBox si la party está llena
app.post('/api/move-to-pcbox', async (req, res) => {
  try {
    const pokemonId = req.body.id;
    await moveToPCBox(pokemonId);
    res.send({ message: 'Pokémon movido a PCBox exitosamente.' });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
