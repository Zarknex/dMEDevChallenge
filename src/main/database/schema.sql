CREATE TABLE IF NOT EXISTS caught_pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pokemon_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    type TEXT NOT NULL
);
