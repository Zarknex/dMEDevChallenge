import { Pool } from 'pg';

const pool = new Pool({
  user: 'pokemon_user',
  host: 'localhost',
  database: 'pokemon_pcbox',
  password: 'dmeDevChallenge',
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Guardar un Pokémon en la PCBox
export const saveToPCBox = async (pokemon: {
  name: string;
  image: string;
  description: string;
  types: { name: string; url: string }[];
  moves: string[];
}) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Inicia una transacción

    // Insertar el Pokémon en la tabla pcbox
    const insertPokemonQuery = `
      INSERT INTO pcbox (name, image, description, date_captured)
      VALUES ($1, $2, $3, DEFAULT)
      RETURNING id
    `;
    const insertPokemonValues = [pokemon.name, pokemon.image, pokemon.description];
    const result = await client.query(insertPokemonQuery, insertPokemonValues);
    const pokemonId = result.rows[0].id;

    // Insertar tipos y relaciones
    for (const type of pokemon.types) {
      const insertTypeQuery = `
        INSERT INTO types (name, url) VALUES ($1, $2) 
        ON CONFLICT (name) DO NOTHING
      `;
      await client.query(insertTypeQuery, [type.name, type.url]);

      const getTypeIdQuery = `SELECT id FROM types WHERE name = $1`;
      const typeIdResult = await client.query(getTypeIdQuery, [type.name]);
      const typeId = typeIdResult.rows[0].id;

      const insertPokemonTypeQuery = `
        INSERT INTO pokemon_types_pcbox (pokemon_id, type_id) 
        VALUES ($1, $2) 
        ON CONFLICT DO NOTHING
      `;
      await client.query(insertPokemonTypeQuery, [pokemonId, typeId]);
    }

    // Insertar movimientos y relaciones
    for (const move of pokemon.moves) {
      const insertMoveQuery = `
        INSERT INTO moves (name) VALUES ($1) 
        ON CONFLICT (name) DO NOTHING
      `;
      await client.query(insertMoveQuery, [move]);

      const getMoveIdQuery = `SELECT id FROM moves WHERE name = $1`;
      const moveIdResult = await client.query(getMoveIdQuery, [move]);
      const moveId = moveIdResult.rows[0].id;

      const insertPokemonMoveQuery = `
        INSERT INTO pokemon_moves_pcbox (pokemon_id, move_id) 
        VALUES ($1, $2) 
        ON CONFLICT DO NOTHING
      `;
      await client.query(insertPokemonMoveQuery, [pokemonId, moveId]);
    }

    await client.query('COMMIT'); // Finaliza la transacción
  } catch (error) {
    await client.query('ROLLBACK'); // Deshace la transacción en caso de error
    throw new Error(`Error saving Pokémon to PCBox: ${error}`);
  } finally {
    client.release(); // Libera la conexión al pool
  }
};

// Obtener Pokémon de la PCBox
export const fetchPCBoxPokemon = async () => {
  const query = `
    SELECT 
      p.id, 
      p.name, 
      p.image, 
      p.description, 
      p.date_captured,
      COALESCE(
        ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('name', t.name, 'url', t.url)) FILTER (WHERE t.name IS NOT NULL),
        '{}'
      ) AS types,
      COALESCE(
        ARRAY_AGG(DISTINCT m.name) FILTER (WHERE m.name IS NOT NULL),
        '{}'
      ) AS moves
    FROM pcbox p
    LEFT JOIN pokemon_types_pcbox pt ON pt.pokemon_id = p.id
    LEFT JOIN types t ON t.id = pt.type_id
    LEFT JOIN pokemon_moves_pcbox pm ON pm.pokemon_id = p.id
    LEFT JOIN moves m ON m.id = pm.move_id
    GROUP BY p.id;
  `;
  const result = await pool.query(query);
  return result.rows;
};
