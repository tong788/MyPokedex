import "../scss/style.scss";
import pokeball from "../assets/png/pokeball.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="logo">
        <img src={pokeball} className="pokeball"></img>
        My Pokedex
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pokemon/page/1">Pokemon</Link>
        </li>
        <li>
          <Link to="/favourite">Favourite</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
