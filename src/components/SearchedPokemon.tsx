import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { PokemonContext } from "../data/PokemonContext";
import "../scss/style.scss";
import { Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
// Define the expected shape of a Pokémon
interface Pokemon {
  name: string;
  url: string;
}

const SearchedPokemon = () => {
  const { name } = useParams<{ name: string }>(); // Ensure `name` is a string
  const pokeContext = useContext(PokemonContext); // Access Pokémon list from context
  const navigate = useNavigate()

  // Ensure `pokeContext?.pokemon` is treated as an array
  const pokemon: Pokemon[] = pokeContext?.pokemon || [];

  // Filter Pokémon based on name
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(name?.toLowerCase() || "") //include all pokemon name which related to search 
  );

  return (
    <div className="searched-pokemon-container">
      <div className="arrow-container" onClick={() => navigate(-1)}>
        <FaArrowLeft className="left-arrow" />
      </div>
      <p className="result-text">Search results for "{name}"</p>
      <div className="poke-big-container">
        <div className="poke-container">
          {filteredPokemon.length > 0 ? (
            <div className="pokemon-results">
              {filteredPokemon.map((item) => {
                const id = item.url.split("/").slice(-2, -1)[0];
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                return (
                  <Link
                    key={id}
                    to={`/pokemon/${item.name}`}
                    state={{ imageUrl }}
                    className="pokemon"
                  >
                    <p className="poke-name">
                      {id}. {item.name}
                    </p>
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="pokemon-image"
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="result-text">No Pokémon found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchedPokemon;
