CREATE DATABASE pokemon_pcbox;
CREATE USER pokemon_user WITH PASSWORD 'dmeDevChallenge';
GRANT ALL PRIVILEGES ON DATABASE pokemon_pcbox TO pokemon_user;
-- captured_pokemon_pcbox: Almacena Pokémon en la PCBox
CREATE TABLE IF NOT EXISTS captured_pokemon_pcbox (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    date_captured TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- types: Tipos de Pokémon
CREATE TABLE IF NOT EXISTS types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL
);

-- pokemon_types_pcbox: Relación muchos a muchos entre Pokémon y Tipos
CREATE TABLE IF NOT EXISTS pokemon_types_pcbox (
    pokemon_id INTEGER NOT NULL,
    type_id INTEGER NOT NULL,
    PRIMARY KEY (pokemon_id, type_id),
    FOREIGN KEY (pokemon_id) REFERENCES captured_pokemon_pcbox (id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES types (id) ON DELETE CASCADE
);

-- moves: Movimientos de Pokémon
CREATE TABLE IF NOT EXISTS moves (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- pokemon_moves_pcbox: Relación muchos a muchos entre Pokémon y Movimientos
CREATE TABLE IF NOT EXISTS pokemon_moves_pcbox (
    pokemon_id INTEGER NOT NULL,
    move_id INTEGER NOT NULL,
    PRIMARY KEY (pokemon_id, move_id),
    FOREIGN KEY (pokemon_id) REFERENCES captured_pokemon_pcbox (id) ON DELETE CASCADE,
    FOREIGN KEY (move_id) REFERENCES moves (id) ON DELETE CASCADE
);
