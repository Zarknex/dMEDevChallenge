import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

const dbPath = path.join(app.getPath('userData'), 'pokemon.sqlite');
export const db = new Database(dbPath);

// Crear las tablas necesarias
db.exec(`
  CREATE TABLE IF NOT EXISTS captured_pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    date_captured TEXT DEFAULT (datetime('now'))
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS pokemon_types (
    pokemon_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL,
    PRIMARY KEY (pokemon_id, type_id),
    FOREIGN KEY (pokemon_id) REFERENCES captured_pokemon (id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES types (id) ON DELETE CASCADE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS moves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS pokemon_moves (
    pokemon_id INTEGER NOT NULL,
    move_id INTEGER NOT NULL,
    PRIMARY KEY (pokemon_id, move_id),
    FOREIGN KEY (pokemon_id) REFERENCES captured_pokemon (id) ON DELETE CASCADE,
    FOREIGN KEY (move_id) REFERENCES moves (id) ON DELETE CASCADE
  );
`);

// Función para guardar un Pokémon capturado
export const saveCapturedPokemon = (pokemon: {
  name: string;
  image: string;
  types: { name: string; url: string }[];
  description: string;
  attacks: string[];
}) => {
  const countPokemonStmt = db.prepare(`SELECT COUNT(*) as count FROM captured_pokemon`);
  const currentCount = countPokemonStmt.get().count;

  if (currentCount >= 6) {
    throw new Error('Has alcanzado el límite máximo de 6 Pokémon capturados.');
  }

  const insertPokemonStmt = db.prepare(`
    INSERT INTO captured_pokemon (name, image, description) 
    VALUES (@name, @image, @description)
  `);

  const getPokemonIdStmt = db.prepare(`
    SELECT last_insert_rowid() as id
  `);

  const insertTypeStmt = db.prepare(`
    INSERT INTO types (name, url) 
    VALUES (@name, @url)
    ON CONFLICT(name) DO NOTHING
  `);

  const insertPokemonTypeStmt = db.prepare(`
    INSERT INTO pokemon_types (pokemon_id, type_id)
    VALUES (@pokemon_id, (SELECT id FROM types WHERE name = @type_name))
    ON CONFLICT DO NOTHING
  `);

  const insertMoveStmt = db.prepare(`
    INSERT INTO moves (name)
    VALUES (@name)
    ON CONFLICT(name) DO NOTHING
  `);

  const insertPokemonMoveStmt = db.prepare(`
    INSERT INTO pokemon_moves (pokemon_id, move_id)
    VALUES (@pokemon_id, (SELECT id FROM moves WHERE name = @move_name))
    ON CONFLICT DO NOTHING
  `);

  const transaction = db.transaction(() => {
    // Insertar el Pokémon
    insertPokemonStmt.run({
      name: pokemon.name,
      image: pokemon.image,
      description: pokemon.description,
    });

    // Obtener el ID del Pokémon recién insertado
    const pokemonId = getPokemonIdStmt.get().id;

    // Insertar los tipos y relaciones
    pokemon.types.forEach((type) => {
      insertTypeStmt.run(type); // Inserta el tipo si no existe
      insertPokemonTypeStmt.run({ pokemon_id: pokemonId, type_name: type.name }); // Relación
    });

    // Insertar los ataques y relaciones
    pokemon.attacks.forEach((attack) => {
      insertMoveStmt.run({ name: attack }); // Inserta el ataque si no existe
      insertPokemonMoveStmt.run({ pokemon_id: pokemonId, move_name: attack }); // Relación
    });
  });

  transaction();
};

// Función para obtener todos los Pokémon capturados con sus tipos y ataques
export const getCapturedPokemon = () => {
  const pokemonStmt = db.prepare(`
    SELECT * FROM captured_pokemon
  `);

  const typesStmt = db.prepare(`
    SELECT t.name, t.url
    FROM pokemon_types pt
    INNER JOIN types t ON pt.type_id = t.id
    WHERE pt.pokemon_id = @pokemon_id
  `);

  const movesStmt = db.prepare(`
    SELECT m.name
    FROM pokemon_moves pm
    INNER JOIN moves m ON pm.move_id = m.id
    WHERE pm.pokemon_id = @pokemon_id
  `);

  const capturedPokemon = pokemonStmt.all();

  return capturedPokemon.map((pokemon) => {
    const types = typesStmt.all({ pokemon_id: pokemon.id });
    const moves = movesStmt.all({ pokemon_id: pokemon.id }).map((move) => move.name);

    return {
      ...pokemon,
      types,
      attacks: moves,
    };
  });
};

// Función para limpiar todos los Pokémon capturados
export const clearCapturedPokemon = () => {
  const stmt = db.prepare('DELETE FROM captured_pokemon');
  stmt.run();
};
