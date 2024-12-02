import { configureStore } from '@reduxjs/toolkit'
import selectedPokemonReducer from './slices/selectedPokemonSlice'
import pokemonReducer from './slices/pokemonSlice'
import pcboxReducer from './slices/pcboxSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    selectedPokemon: selectedPokemonReducer, // Registrar el slice correctamente
    pcbox: pcboxReducer,
  }
})

// Tipos para Redux
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
