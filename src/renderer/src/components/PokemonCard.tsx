import React, { useState, useEffect } from 'react'
import pokeballColored from '../assets/pokeball-colored.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { addCapturedPokemon } from '../../../redux/slices/pokemonSlice'
import { toast } from 'react-toastify'
import { addPokemonToPCBox } from '../../../redux/slices/pcboxSlice'
import capitalizeFirstLetter from '@renderer/utils/capitalizeFirstLetter'

interface PokemonCardTypesProps {
  name: string
  url: string
}

interface PokemonCardProps {
  name: string
  image: string
  types: PokemonCardTypesProps[]
  description: string
  moves: string[]
  isWild?: boolean
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  image,
  types,
  description,
  moves,
  isWild = false
}) => {
  const dispatch = useDispatch()
  const capturedPokemons = useSelector((state: RootState) => state.pokemon.capturedPokemons)
  const [spriteKey, setSpriteKey] = useState(0)

  const handleCatchPokemon = async () => {
    const pokemon = {
      name,
      image,
      types,
      description,
      moves,
    };
  
    if (capturedPokemons.length >= 6) {
      const response = await fetch('http://localhost:3000/api/pcbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pokemon),
      });
      if (!response.ok) {
        throw new Error('Error moving Pokémon to the PCBox');
      }
      toast.info(`${capitalizeFirstLetter(pokemon.name)} was sent to the PCBox.`);
      dispatch(addPokemonToPCBox(pokemon));
    } else {
      const response = await window.electron.ipcRenderer.invoke('pokemon:capture', pokemon);
      if (response.success) {
        toast.success(`${capitalizeFirstLetter(pokemon.name)} was successfully captured.`);
        dispatch(addCapturedPokemon(pokemon));
      } else {
        console.error(response.message);
      }
    }
  };
  

  useEffect(() => {
    setSpriteKey((prevKey) => prevKey + 1)
  }, [image])

  return (
<div className="max-w-sm mx-auto min-h-[550px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
  <div>
    <div className="bg-gray-200 p-4 text-center">
      <h2 className="text-xl font-bold text-gray-800">{capitalizeFirstLetter(name)}</h2>
    </div>

    <div className="relative bg-gray-100 flex justify-center items-center">
      <img
        key={spriteKey}
        src={image}
        alt={name}
        className="h-48 w-48 object-contain animate-fade-in"
      />
    </div>

    <div className="flex flex-wrap justify-center gap-y-2 mt-2">
      {types.map((type, index) => (
        <img
          key={index}
          src={type.url}
          alt={`${type.name} sprite`}
          className="h-7 object-contain px-2"
        />
      ))}
    </div>

    <div className="px-4 py-2">
    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Description</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  </div>

  <div className="px-4 pb-4">
    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Moves</h3>
    <ul className="grid grid-cols-2 gap-2">
      {moves.map((moves, index) => (
        <li
          key={index}
          className="text-sm bg-gray-100 p-2 rounded shadow text-center font-medium text-gray-700"
        >
          {capitalizeFirstLetter(moves)}
        </li>
      ))}
    </ul>
  </div>

  {isWild && (
    <div
      onClick={handleCatchPokemon}
      className="flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-500/90 text-white py-2 px-4 rounded shadow-md cursor-pointer transition-transform transform hover:scale-105"
    >
      <span className="text-center font-bold">Catch it</span>
      <img src={pokeballColored} alt="pokeball" className="h-8" />
    </div>
  )}
</div>
  )
}

export default PokemonCard
