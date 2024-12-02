import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WildPokemonPage from './pages/WildPokemonPage';
import PokemonPartyPage from './pages/PokemonPartyPage';
import PCBoxPage from './pages/PCBoxPage';
import { setCapturedPokemons } from '../../redux/slices/pokemonSlice';
import { setPokemonCount } from '../../redux/slices/pcboxSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCapturedPokemons = async () => {
      try {
        const capturedPokemons = await window.electron.ipcRenderer.invoke('pokemon:getCaptured');
        dispatch(setCapturedPokemons(capturedPokemons));
      } catch (error) {
        console.error('Error fetching captured Pokémon:', error);
      }
    };

    const fetchPCBoxCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pcbox');
        const data = await response.json();
        dispatch(setPokemonCount(data.length)); // Actualiza el número de Pokémon
      } catch (error) {
        console.error('Error fetching PCBox Pokémon:', error);
      }
    };
    fetchCapturedPokemons();
    fetchPCBoxCount();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        {/* Navbar fijo */}
        <header className="flex-none">
          <NavBar />
        </header>

        {/* Contenedor principal */}
        <main className="flex-grow flex bg-red-800 overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wild-pokemon" element={<WildPokemonPage />} />
            <Route path="/pokemon-party" element={<PokemonPartyPage />} />
            <Route path="/pc-box" element={<PCBoxPage />} />
          </Routes>
        </main>

        {/* Footer fijo */}
        <footer className="flex-none">
          <Footer />
        </footer>
      </BrowserRouter>
      <ToastContainer pauseOnHover={false} position="bottom-right" autoClose={1000} />
    </div>
  );
};

export default App;
