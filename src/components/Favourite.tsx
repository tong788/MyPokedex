import { Link } from "react-router-dom";
import { PokemonContext } from "../data/PokemonContext";
import { useContext } from "react";
import "../scss/style.scss";

const Favourite = () => {
  const pokeContext = useContext(PokemonContext);
  const itemsPerPage = 63;

  if (!pokeContext) return <div>Context not available</div>;

  const { pokemon } = pokeContext;
  const favouritePokemon = pokemon.filter((p) => p.favourite);
  const totalItems = favouritePokemon.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section>
      <h2 className="poke-list-header">Your Favourite Pokémon</h2>
      <div className="poke-big-container">
        <div className="poke-container">
          {favouritePokemon.length === 0 ? (
            <p className="no-favourites">You have no favourite Pokémon yet.</p>
          ) : (
            favouritePokemon.map((item) => {
              const id = item.url.split("/").slice(-2, -1)[0];
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

              return (
                <Link
                  to={`/pokemon/${item.name}`}
                  key={id}
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
            })
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <span>Total Favourite Pokémon: {totalItems}</span>
        </div>
      )}
    </section>
  );
};

export default Favourite;
