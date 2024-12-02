import pool from './database/dbPool'; // Asegúrate de exportar el pool en dbPostgres.ts
// Función para mover un Pokémon de la party (SQLite) a la PCBox (PostgreSQL)
import { db } from '../database/db'; // Asegúrate de exportar la instancia de la DB en dbSQLite.ts

// Función para guardar un Pokémon en la PCBox
export const savePokemonToPCBox = async (pokemon: {
  name: string;
  image: string;
  types: { name: string; url: string }[];
  description: string;
  attacks: string[];
}) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertPokemonText = `
      INSERT INTO captured_pokemon_pcbox (name, image, description)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const resPokemon = await client.query(insertPokemonText, [pokemon.name, pokemon.image, pokemon.description]);
    const pokemonId = resPokemon.rows[0].id;

    // Insertar tipos
    for (const type of pokemon.types) {
      const insertTypeText = `
        INSERT INTO types (name, url)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING
        RETURNING id
      `;
      const resType = await client.query(insertTypeText, [type.name, type.url]);
      const typeId = resType.rows[0]?.id || (await client.query('SELECT id FROM types WHERE name = $1', [type.name])).rows[0].id;

      const insertPokemonTypeText = `
        INSERT INTO pokemon_types_pcbox (pokemon_id, type_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `;
      await client.query(insertPokemonTypeText, [pokemonId, typeId]);
    }

    // Insertar movimientos
    for (const move of pokemon.attacks) {
      const insertMoveText = `
        INSERT INTO moves (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
        RETURNING id
      `;
      const resMove = await client.query(insertMoveText, [move]);
      const moveId = resMove.rows[0]?.id || (await client.query('SELECT id FROM moves WHERE name = $1', [move])).rows[0].id;

      const insertPokemonMoveText = `
        INSERT INTO pokemon_moves_pcbox (pokemon_id, move_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `;
      await client.query(insertPokemonMoveText, [pokemonId, moveId]);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Función para obtener todos los Pokémon en la PCBox
export const getPCBoxPokemon = async () => {
  const client = await pool.connect();
  try {
    const pokemonResult = await client.query('SELECT * FROM captured_pokemon_pcbox');

    const typesStmt = `
      SELECT t.name, t.url
      FROM pokemon_types_pcbox pt
      INNER JOIN types t ON pt.type_id = t.id
      WHERE pt.pokemon_id = $1
    `;

    const movesStmt = `
      SELECT m.name
      FROM pokemon_moves_pcbox pm
      INNER JOIN moves m ON pm.move_id = m.id
      WHERE pm.pokemon_id = $1
    `;

    const capturedPokemon = pokemonResult.rows;

    return Promise.all(capturedPokemon.map(async (pokemon: any) => {
      const types = await client.query(typesStmt, [pokemon.id]);
      const moves = await client.query(movesStmt, [pokemon.id]);

      return {
        ...pokemon,
        types: types.rows,
        attacks: moves.rows.map((move: any) => move.name),
      };
    }));
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

// SQLITE3 INTERACTION

export const moveToPCBox = async (pokemonId: number) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Obtener el Pokémon de SQLite
    const getPokemonStmt = db.prepare(`SELECT * FROM captured_pokemon WHERE id = ?`);
    const pokemon = getPokemonStmt.get(pokemonId);

    if (!pokemon) {
      throw new Error('Pokémon no encontrado en la party.');
    }

    // Obtener tipos y movimientos desde SQLite
    const getTypesStmt = db.prepare(`
      SELECT t.name, t.url
      FROM pokemon_types pt
      INNER JOIN types t ON pt.type_id = t.id
      WHERE pt.pokemon_id = ?
    `);
    const types = getTypesStmt.all(pokemonId);

    const getMovesStmt = db.prepare(`
      SELECT m.name
      FROM pokemon_moves pm
      INNER JOIN moves m ON pm.move_id = m.id
      WHERE pm.pokemon_id = ?
    `);
    const moves = getMovesStmt.all(pokemonId).map((move: any) => move.name);

    // Insertar en PostgreSQL
    await savePokemonToPCBox({
      name: pokemon.name,
      image: pokemon.image,
      description: pokemon.description,
      types: types,
      attacks: moves,
    });

    // Eliminar de SQLite
    const deleteStmt = db.prepare(`DELETE FROM captured_pokemon WHERE id = ?`);
    deleteStmt.run(pokemonId);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
