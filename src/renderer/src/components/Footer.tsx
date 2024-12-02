import { useDispatch } from 'react-redux'
import { clearCapturedPokemons } from '../../../redux/slices/pokemonSlice'
import { setPokemonInPCBox } from '../../../redux/slices/pcboxSlice'

function Footer(): JSX.Element {
  const dispatch = useDispatch()

  const reset = async (): Promise<void> => {
    try {
      await window.electron.ipcRenderer.invoke('pokemon:clear') 
      await fetch('http://localhost:3000/api/reset', {
        method: 'DELETE'
      })
      dispatch(clearCapturedPokemons()) 
      dispatch(setPokemonInPCBox([]))
      console.log('All data cleared!')
      window.location.reload();
    } catch (error) {
      console.error('Error clearing data:', error)
    }
  }

  const exitApp = (): void => {
    window.electron.ipcRenderer.invoke('app:exit')
  }

  return (
    <footer className="bg-gray-800 flex justify-around items-center h-16 w-full border-t-4 border-red-700">
      <button
        onClick={reset}
        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow"
      >
        RESET
      </button>
      <span className="text-white font-semibold">Created by Matias Donoso for a Dev Challenge</span>
      <button
        onClick={exitApp}
        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow"
      >
        QUIT
      </button>
    </footer>
  )
}

export default Footer
