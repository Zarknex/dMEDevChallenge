import { Link } from 'react-router'
import pokemonLogo from '../assets/pokemon-logo.svg'
import pcIcon from '../assets/pc-icon.svg'
import grassIcon from '../assets/grass-icon.svg'
import PartyPokeballs from './PartyPokeballs'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const NavBar: React.FC = () => {
  const pcBoxCount = useSelector((state: RootState) => state.pcbox.pokemonCount);
  return (
    <div className="bg-navbar-bg flex flex-col items-center">
      <Link to="/" className="mb-2">
        <img alt="logo" className="h-32" src={pokemonLogo} />
      </Link>

      <div className="flex w-full shadow-lg">
        <Link
          to="/wild-pokemon"
          className="flex-1 bg-button-primary hover:bg-button-primary-hover border-button-border border-r-2 p-3 font-semibold text-button-text text-2xl flex items-center justify-center"
        >
          <span className="mr-2">Wild Pokémon</span>
          <img src={grassIcon} className="h-7" alt="Grass Icon" />
        </Link>

        <Link
          to="/pokemon-party"
          className="flex-1 bg-button-primary hover:bg-button-primary-hover border-button-border border-r-2 p-3 font-semibold text-button-text text-center flex flex-col items-center text-2xl"
        >
          Pokémon Party
          <PartyPokeballs />
        </Link>

        <Link
          to="/pc-box"
          className="flex-1 bg-button-primary hover:bg-button-primary-hover border-button-border p-3 font-semibold text-button-text text-2xl flex items-center justify-center space-x-2"
        >
          <span>PC Box</span>
          <img src={pcIcon} className="h-7" alt="PC Icon" />
          <span>({pcBoxCount})</span>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
