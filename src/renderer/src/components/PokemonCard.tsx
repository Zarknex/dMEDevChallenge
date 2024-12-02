import React, { useState, useEffect } from 'react';
import pokeballColored from '../assets/pokeball-colored.svg';
import { useDispatch } from 'react-redux';
import { addCapturedPokemon } from '../../../redux/slices/pokemonSlice';

interface PokemonCardTypesProps {
  name: string;
  url: string;
}

interface PokemonCardProps {
  name: string;
  image: string;
  types: PokemonCardTypesProps[];
  description: string;
  attacks: string[];
  isWild?: boolean;
  size?: 'small' | 'large'; // Nueva propiedad opcional
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  image,
  types,
  description,
  attacks,
  isWild = false,
  size = 'large',
}) => {
  const dispatch = useDispatch();
  const [spriteKey, setSpriteKey] = useState(0); // Estado para forzar el cambio del sprite.

  const capitalizeFirstLetter = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleCatchPokemon = async () => {
    const pokemon = {
      name,
      image,
      types,
      description,
      attacks
    };

    const response = await window.electron.ipcRenderer.invoke('pokemon:capture', pokemon);
    if (response.success) {
      console.log('Pokemon captured successfully!');
      dispatch(addCapturedPokemon(pokemon));
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    // Cambiar la clave del sprite para forzar la animación cuando el sprite cambie.
    setSpriteKey((prevKey) => prevKey + 1);
  }, [image]);

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-200 p-3 text-center">
        <h2 className="text-xl font-bold text-gray-800">{capitalizeFirstLetter(name)}</h2>
      </div>

      <div className="relative bg-gray-100 flex justify-center items-center">
        <img
          key={spriteKey} // Forzar desmontaje/montaje con la clave.
          src={image}
          alt={name}
          className={`${size === 'small' ? 'h-28 w-28' : 'h-48 w-48'} object-contain animate-fade-in`}
        />
      </div>

      <div className={`flex ${size === 'small' ? 'flex-col gap-2' : 'justify-center gap-2'} mt-2`}>
        {types.map((type, index) => (
          <img
            key={index}
            src={type.url}
            alt={`${type.name} sprite`}
            className={`${size === 'small' ? 'h-5' : 'h-7'} object-contain`}
          />
        ))}
      </div>

      <div className="px-4 py-2">
        <p className="text-gray-700 text-sm">{description}</p>
      </div>

      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Attacks</h3>
        <ul
          className={`${
            size === 'small' ? 'flex flex-row flex-wrap gap-1 justify-center' : 'grid grid-cols-2 gap-2'
          }`}
        >
          {attacks.map((attack, index) => (
            <li
              key={index}
              className="text-sm bg-gray-100 p-2 rounded shadow text-center font-medium text-gray-700"
            >
              {capitalizeFirstLetter(attack)}
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
  );
};

export default PokemonCard;
