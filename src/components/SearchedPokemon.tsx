import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext } from "../data/PokemonContext";
import { FaArrowLeft } from "react-icons/fa";
import "../scss/style.scss";

const SearchPokemon = () => {
  const pokeContext = useContext(PokemonContext);
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const navigate = useNavigate(); 

  const imageUrl = location.state?.imageUrl;
  const foundPokemon = pokeContext?.pokemon.find((p) => p.name === name);

  if (!foundPokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <div className="big-searched-pokemon-container">
      <div className="arrow-container" onClick={() => navigate(-1)}>
        <FaArrowLeft className="left-arrow" />
      </div>
      <div className="searched-pokemon-container">
        <div>
          <h1 className="pokemon-name">{foundPokemon.name}</h1>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={foundPokemon.name}
              className="selected-pokemon-image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPokemon;
