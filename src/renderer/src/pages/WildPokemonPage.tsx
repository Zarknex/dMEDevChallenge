import { useState, useEffect, useRef } from 'react'
import PokeApiService from '../services/PokeApiService'
import PokemonCard from '@renderer/components/PokemonCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPokemon } from '../../../redux/slices/selectedPokemonSlice'
import { RootState } from '../../../redux/store'

function WildPokemon(): JSX.Element {
  const dispatch = useDispatch()
  const selectedPokemon = useSelector((state: RootState) => state.selectedPokemon.selected)
  const capturedPokemons = useSelector((state: RootState) => state.pokemon.capturedPokemons)
  const capturedPokemonsPCBox = useSelector((state: RootState)=> state.pcbox.pokemonCount)
  const [types, setTypes] = useState<{ type: string; url: string }[]>([])
  const prevCapturedCount = useRef<number>(capturedPokemons.length+capturedPokemonsPCBox)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const fetchedTypes = await PokeApiService.getPokemonTypes()
        setTypes(fetchedTypes)
      } catch (error) {
        console.error('Error fetching Pokémon types:', error)
      }
    }

    fetchTypes()
  }, [])

  useEffect(() => {
    // Detectar si se ha capturado un nuevo Pokémon
    if (capturedPokemons.length+capturedPokemonsPCBox > prevCapturedCount.current) {
      dispatch(setSelectedPokemon(null))
    }
  }, [capturedPokemons.length, capturedPokemonsPCBox, dispatch])
  
  const handleTypeClick = async (type: string) => {
    try {
      const randomPokemon = await PokeApiService.getRandomPokemonByType(type)
      dispatch(setSelectedPokemon(randomPokemon))
    } catch (error) {
      console.error('Error fetching Pokémon:', error)
    }
  }
  const getRandomMoves = (moves: any[], count: number): string[] => {
    if (!moves || moves.length === 0) return [] 

    const shuffled = [...moves].sort(() => 0.5 - Math.random()) 
    const selectedMoves = shuffled.slice(0, count) 

    return selectedMoves.map((move) => move.move.name)
  }

  return (
    <div className="flex bg-slate-200 h-full">
      {/* Menú lateral */}
      <aside className="bg-gray-300 min-w-44  max-w-44 p-3">
        <h2 className="text-lg font-bold mb-2">Pokémon Types</h2>
        <div className="flex-col space-y-2">
          {types.map((typeObj) => (
            <button
              key={typeObj.type}
              onClick={() => handleTypeClick(typeObj.type)}
              className="focus:outline-none hover:scale-110 transition-transform items-center justify-center"
              aria-label={typeObj.type}
            >
              <img
                src={typeObj.url}
                alt={`${typeObj.type} sprite`}
                className="h-7 object-contain"
              />
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Wild Pokemon</h1>

        {selectedPokemon ? (
          <PokemonCard
            name={selectedPokemon.name}
            image={selectedPokemon.sprites.front_default}
            types={selectedPokemon.types
              .map((type: any) => {
                const matchingType = types.find((t) => t.type === type.type.name)
                return matchingType ? { name: matchingType.type, url: matchingType.url } : null
              })
              .filter(Boolean)}
            description={selectedPokemon.description}
            moves={getRandomMoves(selectedPokemon.moves, 4)}
            isWild
          />
        ) : (
          <p className="text-xl font-semibold text-gray-600 text-center">
          To encounter a wild Pokémon, press one of the type buttons on the left.<br />
          Pokémon with at least the selected type will appear.
        </p>
        
        )}
      </main>
    </div>
  )
}

export default WildPokemon
