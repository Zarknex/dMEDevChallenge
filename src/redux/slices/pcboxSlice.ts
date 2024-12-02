import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PCBoxState {
  pokemonList: any[]; 
  pokemonCount: number;
}

const initialState: PCBoxState = {
  pokemonList: [], 
  pokemonCount: 0, 
};

const pcboxSlice = createSlice({
  name: 'pcbox',
  initialState,
  reducers: {
    addPokemonToPCBox(state, action: PayloadAction<any>) {
      state.pokemonList.push(action.payload);
      state.pokemonCount += 1; 
    },
    setPokemonInPCBox(state, action: PayloadAction<any>) {
      state.pokemonList = action.payload; 
      state.pokemonCount = action.payload.length; 
    },
    clearPCBox(state) {
      state.pokemonList = []; 
      state.pokemonCount = 0;
    },
  },
});

export const {
  addPokemonToPCBox,
  clearPCBox,
  setPokemonInPCBox
} = pcboxSlice.actions;

export default pcboxSlice.reducer;
