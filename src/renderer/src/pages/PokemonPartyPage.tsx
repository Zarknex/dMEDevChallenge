import { useSelector } from 'react-redux'
import PokemonCard from '@renderer/components/PokemonCard'
import { RootState } from '../../../redux/store'

function PokemonPartyPage(): JSX.Element {
  const capturedPokemons = useSelector((state: RootState) => state.pokemon.capturedPokemons)
  const pokemonParty = capturedPokemons.slice(0, 6)
  console.log(pokemonParty)

  return (
    <div className="flex flex-grow flex-col items-center h-full bg-slate-200 px-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center p-4">Pokémon Party</h1>
      {pokemonParty.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-xl font-semibold text-gray-600">
            To catch Pokémon, go to the "Wild Pokémon" tab. There, you can find Pokémon based on
            their type.
          </p>
        </div>
      ) : (
        <div className="pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 place-items-center gap-4 overflow-auto custom-scrollbar">
          {pokemonParty.map((pokemon, index) => (
            <div key={index}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                description={pokemon.description}
                moves={pokemon.moves}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonPartyPage
