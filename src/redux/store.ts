import { configureStore } from '@reduxjs/toolkit'
import selectedPokemonReducer from './slices/selectedPokemonSlice'
import pokemonReducer from './slices/pokemonSlice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    selectedPokemon: selectedPokemonReducer // Registrar el slice correctamente
  }
})

// Tipos para Redux
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
