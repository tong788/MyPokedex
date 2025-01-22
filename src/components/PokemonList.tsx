import { Link } from "react-router-dom";
import { PokemonContext } from "../data/PokemonContext";
import { useContext } from "react";

const PokemonList = () => {

  const pokeContext = useContext(PokemonContext)

  if (pokeContext?.loading) return <div className="poke-loading">Loading...</div>;
  if (pokeContext?.error) return <div>Error: {pokeContext?.error}</div>;

  return (
    <div>
      <h2>Pokémon List</h2>
      <div className="poke-big-container">
        <div className="poke-container">
          {pokeContext?.pokemon.map((item) => {
            const id = item.url.split("/").slice(-2, -1)[0];
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            return (
              <Link
                to={`/pokemon/${item.name}`}
                key={id}
                state={{ imageUrl }}
                className="pokemon"
              >
                <p>
                  {id}. {item.name}
                </p>
                <img src={imageUrl} alt={item.name} className="pokemon-image" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
