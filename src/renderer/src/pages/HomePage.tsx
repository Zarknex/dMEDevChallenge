import {
  SiPostgresql,
  SiExpress,
  SiSqlite,
  SiRedux,
  SiReactrouter,
  SiReact,
  SiAxios,
  SiElectron,
  SiVite,
  SiTailwindcss,
} from '@icons-pack/react-simple-icons';

function HomePage(): JSX.Element {
  return (
    <div className="bg-slate-200 flex flex-col items-center justify-center text-center h-full w-full">
      <div className="px-32">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to the Pokémon App!
        </h1>
        <p className="text-xl font-semibold text-gray-600">
          Dive into the world of Pokémon! Search for wild Pokémon by type, capture them, and build your party. <br />
          Manage a team of up to 6 Pokémon, and any extras will be automatically sent to your PC Box. <br />
          Start your adventure now and catch 'em all!
        </p>
        <p className="text-lg font-medium text-gray-500 mt-4">
          This app is exclusively designed for Pokémon from the first generation, featuring the original 151 Pokémon!
        </p>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Technologies Used:</h2>
          <div className="grid sm:grid-cols-5 gap-6">
            <div className="flex flex-col items-center">
              <SiPostgresql size={32} color="#336791" />
              <span className="text-blue-600 font-bold mt-2">PostgreSQL</span>
            </div>
            <div className="flex flex-col items-center">
              <SiExpress size={32} color="#000000" />
              <span className="text-black font-bold mt-2">Express</span>
            </div>
            <div className="flex flex-col items-center">
              <SiSqlite size={32} color="#003B57" />
              <span className="text-blue-500 font-bold mt-2">SQLite3</span>
            </div>
            <div className="flex flex-col items-center">
              <SiRedux size={32} color="#764ABC" />
              <span className="text-cyan-500 font-bold mt-2">Redux</span>
            </div>
            <div className="flex flex-col items-center">
              <SiReactrouter size={32} color="#61DAFB" />
              <span className="text-indigo-500 font-bold mt-2">React Router</span>
            </div>
            <div className="flex flex-col items-center">
              <SiReact size={32} color="#34D399" />
              <span className="text-green-500 font-bold mt-2">React Toastify</span>
            </div>
            <div className="flex flex-col items-center">
              <SiAxios size={32} color="#5A29E4" />
              <span className="text-purple-500 font-bold mt-2">Axios</span>
            </div>
            <div className="flex flex-col items-center">
              <SiElectron size={32} color="#47848F" />
              <span className="text-sky-500 font-bold mt-2">Electron</span>
            </div>
            <div className="flex flex-col items-center">
              <SiVite size={32} color="#646CFF" />
              <span className="text-teal-500 font-bold mt-2">VITE</span>
            </div>
            <div className="flex flex-col items-center">
              <SiTailwindcss size={32} color="#06B6D4" />
              <span className="text-blue-400 font-bold mt-2">TailwindCSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
