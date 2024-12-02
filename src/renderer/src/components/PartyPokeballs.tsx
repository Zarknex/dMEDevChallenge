import React from 'react'
import { useSelector } from 'react-redux' // Hook para acceder al estado global
import { RootState } from '../../../redux/store' // Importa el tipo RootState para el selector
import pokeballBlack from '../assets/pokeball-black.svg' // Pokeball vacía
import pokeballColored from '../assets/pokeball-colored.svg' // Pokeball capturada

const PartyPokeballs: React.FC = () => {
  // Acceder al estado global para obtener los Pokémon capturados
  const capturedPokemons = useSelector((state: RootState) => state.pokemon.capturedPokemons)

  // Calcula cuántos Pokémon están en el equipo (máximo 6)
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
