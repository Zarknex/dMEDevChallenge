import { useEffect } from 'react'
import PokemonCard from '@renderer/components/PokemonCard'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store';
import { setPokemonInPCBox } from '../../../redux/slices/pcboxSlice';

function PCBoxPage(): JSX.Element {
  const dispatch = useDispatch();
  const pcBoxPokemons = useSelector(
    (state: RootState) => state.pcbox.pokemonList
  );

  const fetchPCBoxPokemons = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pcbox')
      if (!response.ok) {
        throw new Error('Error fetching Pokémon from PC Box')
      }
      const data = await response.json()
      
      dispatch(setPokemonInPCBox(data))
    } catch (error: any) {
      console.error('Error fetching PC Box Pokémon:', error)
      toast.error(`Error: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPCBoxPokemons()
  }, [])

  return (
    <div className="bg-slate-200 flex flex-col items-center justify-start w-full h-full p-4 overflow-hidden">
  <h1 className="text-2xl font-bold mb-4 text-gray-800">PC BOX</h1>
  {pcBoxPokemons.length === 0 ? (
    <p className="text-xl font-semibold text-gray-600 text-center">
    Your PC Box is empty. <br/>
    Start catching more Pokémon, and they'll be sent here automatically!
  </p>  
  ) : (
    <div className="w-full px-2 flex-grow overflow-auto custom-scrollbar">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {pcBoxPokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
            description={pokemon.description}
            moves={pokemon.moves}
          />
        ))}
      </div>
    </div>
  )}
</div>

  )
}

export default PCBoxPage
