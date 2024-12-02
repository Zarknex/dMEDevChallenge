import React, { useState, useEffect, useRef } from 'react'
import PokeApiService from '../services/PokeApiService'
import PokemonCard from '@renderer/components/PokemonCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPokemon } from '../../../redux/slices/selectedPokemonSlice'
import { RootState } from '../../../redux/store'

function WildPokemon(): JSX.Element {
  const dispatch = useDispatch()
  const selectedPokemon = useSelector((state: RootState) => state.selectedPokemon.selected)
  const capturedPokemons = useSelector((state: RootState) => state.pokemon.capturedPokemons)
  const [types, setTypes] = useState<{ type: string; url: string }[]>([])
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const prevCapturedCount = useRef<number>(capturedPokemons.length)

  useEffect(() => {
    // Obtener los tipos de Pokémon al montar el componente
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
    if (capturedPokemons.length > prevCapturedCount.current) {
    setShowMessage(true)
    dispatch(setSelectedPokemon(null))

    // Ocultar el mensaje después de 3 segundos y cargar un nuevo Pokémon
    const timer = setTimeout(() => {
      setShowMessage(false)
    }, 1000)

    return () => clearTimeout(timer)} 
  }, [capturedPokemons.length, dispatch])

  const handleTypeClick = async (type: string) => {
    try {
      const randomPokemon = await PokeApiService.getRandomPokemonByType(type)
      dispatch(setSelectedPokemon(randomPokemon))
    } catch (error) {
      console.error('Error fetching Pokémon:', error)
    }
  }
  const getRandomMoves = (moves: any[], count: number): string[] => {
    if (!moves || moves.length === 0) return [] // Si no hay movimientos, retorna un array vacío.

    const shuffled = [...moves].sort(() => 0.5 - Math.random()) // Mezcla los movimientos.
    const selectedMoves = shuffled.slice(0, count) // Toma los primeros n elementos.

    // Extrae el nombre de los movimientos.
    return selectedMoves.map((move) => move.move.name)
  }

  return (
    <div className="flex bg-slate-100">
      {showMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20 animate-fade-in">
          <div className="bg-yellow-500 text-white py-4 px-8 rounded-lg shadow-lg animate-pop-up">
            <h2 className="text-3xl font-bold">¡Pokémon Atrapado!</h2>
          </div>
        </div>
      )}
      {/* Menú lateral */}
      <aside className="bg-gray-200 w-1/6 p-4">
        <h2 className="text-lg font-bold mb-4">Pokémon Types</h2>
        <div className="flex-col space-y-2">
          {types.map((typeObj) => (
            <button
              key={typeObj.type}
              onClick={() => handleTypeClick(typeObj.type)}
              className="focus:outline-none hover:scale-105 transition-transform items-center justify-center"
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

      {/* Contenido principal */}
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Wild Pokémon</h1>
        <p>Select a type of pokemon to randomize.</p>
        {selectedPokemon && (
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
            attacks={getRandomMoves(selectedPokemon.moves, 4)}
            isWild
            size="large"
          />
        )}
      </main>
    </div>
  )
}

export default WildPokemon
