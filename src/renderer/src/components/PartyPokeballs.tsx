import React from 'react'
import pokeballBlack from '../assets/pokeball-black.svg'
import pokeballColored from '../assets/pokeball-colored.svg'

interface PokeballRowProps {
  activeCount: number // Número de Pokeballs activas (rojas)
}

const PokeballRow: React.FC<PokeballRowProps> = ({ activeCount }) => {
  // Validar que activeCount esté entre 0 y 6
  const normalizedCount = Math.max(0, Math.min(6, activeCount))

  return (
    <div className="flex space-x-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <img
          key={index}
          src={index < normalizedCount ? pokeballColored : pokeballBlack}
          alt="Pokeball"
          className="h-6"
        />
      ))}
    </div>
  )
}

export default PokeballRow
