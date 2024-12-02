import { saveToPCBox, fetchPCBoxPokemon } from '../models/pcBoxModel';

export const savePokemonToPCBox = async (pokemon: any) => {
  return saveToPCBox(pokemon);
};

export const getPCBoxPokemon = async () => {
  return fetchPCBoxPokemon();
};
