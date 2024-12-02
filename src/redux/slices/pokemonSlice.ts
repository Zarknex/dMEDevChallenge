// src/redux/slices/pokemonSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  capturedPokemons: any[]; // Lista de Pokémon capturados
}

const initialState: PokemonState = {
  capturedPokemons: []
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCapturedPokemons(state, action: PayloadAction<any[]>) {
      state.capturedPokemons = action.payload;
    },
    addCapturedPokemon(state, action: PayloadAction<any>) {
      state.capturedPokemons.push(action.payload);
    },
    clearCapturedPokemons(state) {
      state.capturedPokemons = [];
    },
    
  }
});

export const { setCapturedPokemons, addCapturedPokemon, clearCapturedPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;
