import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const connectDb = async () => {
  return open({
    filename: './src/main/database/pokemon.db',
    driver: sqlite3.Database
  })
}
