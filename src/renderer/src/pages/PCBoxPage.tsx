import React, { useEffect, useState } from 'react';
import PokemonCard from '@renderer/components/PokemonCard';
import { toast } from 'react-toastify';

function PCBoxPage(): JSX.Element {
  const [pcBoxPokemons, setPCBoxPokemons] = useState<any[]>([]); // Estado para almacenar los Pokémon de la PC Box

  // Fetch de los Pokémon desde el backend
  const fetchPCBoxPokemons = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pcbox'); // URL del endpoint
      if (!response.ok) {
        throw new Error('Error fetching Pokémon from PC Box');
      }
      const data = await response.json();
      setPCBoxPokemons(data);
    } catch (error: any) {
      console.error('Error fetching PC Box Pokémon:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  // Llamar al fetch al montar el componente
  useEffect(() => {
    fetchPCBoxPokemons();
  }, []);

  return (
    <div className="bg-slate-200 flex flex-col items-center justify-center h-full w-full text-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">PC BOX</h1>
      {pcBoxPokemons.length === 0 ? (
        <p className="text-sm text-gray-600">
          La PC Box está vacía. ¡Atrapa más Pokémon para enviarlos aquí automáticamente!
        </p>
      ) : (
        // Contenedor para el scroll
        <div className="flex-grow overflow-y-auto w-full max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pcBoxPokemons.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                description={pokemon.description}
                moves={pokemon.moves}
                size="small" // Ajusta el diseño de las cards
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PCBoxPage;
