import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PCBoxState {
  pokemonCount: number;
}

const initialState: PCBoxState = {
  pokemonCount: 0, // Número inicial de Pokémon en la PCBox
};

const pcboxSlice = createSlice({
  name: 'pcbox',
  initialState,
  reducers: {
    setPokemonCount(state, action: PayloadAction<number>) {
      state.pokemonCount = action.payload; // Actualiza el número total de Pokémon
    },
    incrementPokemonCount(state) {
      state.pokemonCount += 1; // Incrementa el contador en 1
    },
    decrementPokemonCount(state) {
      if (state.pokemonCount > 0) {
        state.pokemonCount -= 1; // Decrementa el contador en 1
      }
    },
  },
});

export const { setPokemonCount, incrementPokemonCount, decrementPokemonCount } = pcboxSlice.actions;

export default pcboxSlice.reducer;
