import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WildPokemonPage from './pages/WildPokemonPage';
import PokemonPartyPage from './pages/PokemonPartyPage';
import PCBoxPage from './pages/PCBoxPage';
import { setCapturedPokemons } from '../../redux/slices/pokemonSlice';
import { setPokemonInPCBox } from '../../redux/slices/pcboxSlice';
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
        dispatch(setPokemonInPCBox(data));
      } catch (error) {
        console.error('Error fetching PCBox Pokémon:', error);
      }
    };

    fetchCapturedPokemons();
    fetchPCBoxCount();
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen select-none">
      <HashRouter>
        <header className="flex-none">
          <NavBar />
        </header>

        <main className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wild-pokemon" element={<WildPokemonPage />} />
            <Route path="/pokemon-party" element={<PokemonPartyPage />} />
            <Route path="/pc-box" element={<PCBoxPage />} />
          </Routes>
        </main>

        <footer className="flex-none">
          <Footer />
        </footer>
      </HashRouter>
      <ToastContainer pauseOnHover={false} position="bottom-right" autoClose={1000} />
    </div>
  );
};

export default App;
