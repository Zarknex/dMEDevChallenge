import { useDispatch } from 'react-redux';
import { clearCapturedPokemons } from '../../../redux/slices/pokemonSlice';

function Footer(): JSX.Element {
  const dispatch = useDispatch();

  const reset = async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('pokemon:clear'); // Limpiar en SQLite
      dispatch(clearCapturedPokemons()); // Limpiar en Redux
      console.log('All data cleared!');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  // const exportData = (): void => {
  //   console.log('Data exported successfully!');
  // };

  const exitApp = (): void => {
    window.electron.ipcRenderer.invoke('app:exit'); // Invocar cierre de app
  };

  return (
    <footer className="bg-gray-800 flex justify-around items-center h-16 w-full border-t-4 border-red-700">
      <button
        onClick={reset}
        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow"
      >
        RESET
      </button>
      <span className="text-white font-semibold">Creado por: Matias Donoso</span>
      <button
        onClick={exitApp}
        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow"
      >
        SALIR
      </button>
    </footer>
  );
}

export default Footer;
