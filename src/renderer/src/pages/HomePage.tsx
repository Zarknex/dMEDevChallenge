function HomePage(): JSX.Element {
  return (
    <div className="bg-red-100 flex flex-col items-center justify-center text-center w-full">
      <div className="px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          ¡Bienvenido a la Aplicación Pokémon!
        </h1>
        <p className="text-xl font-semibold text-gray-600">
          Explora Pokémon salvajes por tipo, captúralos y organiza tu equipo. Gestiona un límite de
          6 Pokémon y envía los adicionales al PC Box automáticamente.
        </p>
      </div>
    </div>
  )
}

export default HomePage
