import React from 'react'
import { useSelector } from 'react-redux' 
import { RootState } from '../../../redux/store' 
import pokeballBlack from '../assets/pokeball-black.svg' 
import pokeballColored from '../assets/pokeball-colored.svg'

const PartyPokeballs: React.FC = () => {

  const capturedPokemons = useSelector((state: RootState) => state.pokemon.capturedPokemons)

  const activeCount = Math.min(capturedPokemons.length, 6)

  return (
    <div className="flex space-x-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <img
          key={index}
          src={index < activeCount ? pokeballColored : pokeballBlack}
          alt="Pokeball"
          className="h-6 hover:scale-110 hover:brightness-110 transition-all"
        />
      ))}
    </div>
  )
}

export default PartyPokeballs
