import React from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from '@renderer/components/PokemonCard';
import { RootState } from '../../../redux/store';

function PokemonPartyPage(): JSX.Element {
  const capturedPokemons = useSelector((state: RootState) => state.pokemon.capturedPokemons);
  const pokemonParty = capturedPokemons.slice(0, 6);
  console.log(pokemonParty);
  

  return (
    <div className="bg-slate-200 flex flex-col items-center justify-center min-h-full w-full text-center">
      <div className="px-4 w-full">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Pokemon Party</h1>
        {pokemonParty.length === 0 ? (
          <p className="text-sm text-gray-600">You haven't caught any Pokémon yet!</p>
        ) : (
          <div className="grid grid-cols-6 gap-2">
            {pokemonParty.map((pokemon, index) => (
              <div key={index} className="flex justify-center items-center">
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                  description={pokemon.description}
                  moves={pokemon.moves}
                  size='small'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonPartyPage;
