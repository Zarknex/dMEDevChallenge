import { Pool } from 'pg';

const pool = new Pool({
  user: 'pokemon_user',
  host: 'localhost',
  database: 'pokemon_pcbox',
  password: 'dmeDevChallenge',
  port: 5432, // Puerto por defecto de PostgreSQL
});

export default pool;
