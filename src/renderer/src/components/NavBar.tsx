import { Link } from 'react-router';
import pokemonLogo from '../assets/pokemon-logo.svg';
import pcIcon from '../assets/pc-icon.svg';
import grassIcon from '../assets/grass-icon.svg';
import PokeballRow from './PartyPokeballs';

function NavBar(): JSX.Element {
  return (
    <div className="bg-navbar-bg flex flex-col items-center h-48">
      <img alt="logo" className="h-32 mb-4" src={pokemonLogo} />

      <div className="flex w-full shadow-lg">
        <Link
          to="/wild-pokemon"
          className="flex-1 bg-button-primary hover:bg-button-primary-hover border-button-border border-r-2 p-3 font-semibold text-button-text text-2xl flex items-center justify-center"
        >
          <span className="mr-2">Wild Pokemon</span>
          <img src={grassIcon} className="h-7" alt="Grass Icon" />
        </Link>

        <Link
          to="/pokemon-party"
          className="flex-1 bg-button-primary hover:bg-button-primary-hover border-button-border border-r-2 p-3 font-semibold text-button-text text-center flex flex-col items-center text-2xl"
        >
          Pokemon Party
          <PokeballRow activeCount={2} />
        </Link>

        <Link
          to="/pc-box"
          className="flex-1 bg-button-primary hover:bg-button-primary-hover border-button-border p-3 font-semibold text-button-text text-2xl flex items-center justify-center space-x-2"
        >
          <span>PC Box</span>
          <img src={pcIcon} className="h-7" alt="PC Icon" />
          <span>(5)</span>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
