import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  selected: any | null;
}

const initialState: PokemonState = {
  selected: null,
};

const selectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    setSelectedPokemon(state, action: PayloadAction<any>) {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedPokemon } = selectedPokemonSlice.actions;
export default selectedPokemonSlice.reducer;
