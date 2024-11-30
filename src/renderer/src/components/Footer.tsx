import React from 'react'

function Footer(): JSX.Element {
  const reset = (): void => {
    console.log('All data is now cleared!')
  }

  const exportData = (): void => {
    console.log('Data exported successfully!')
  }

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
        onClick={exportData}
        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded shadow"
      >
        SALIR
      </button>
    </footer>
  )
}

export default Footer
