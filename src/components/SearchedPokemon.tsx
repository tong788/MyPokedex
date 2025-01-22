import { useParams, useLocation } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext} from "../data/PokemonContext";
import "../scss/style.scss";

const SearchPokemon = () => {
  const pokeContext = useContext(PokemonContext)
  // const { pokemon } = usePokemon();
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  const foundPokemon = pokeContext?.pokemon.find((p) => p.name === name);

  if (!foundPokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <div className="searched-pokemon-container">
      <div>
        <h2>{foundPokemon.name}</h2>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={foundPokemon.name}
            className="pokemon-image"
          />
        )}
      </div>
    </div>
  );
};

export default SearchPokemon;
