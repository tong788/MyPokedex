import { Link } from "react-router-dom";
import { PokemonContext } from "../data/PokemonContext";
import { useContext, useState } from "react";

const PokemonList = () => {
  const pokeContext = useContext(PokemonContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 63;

  if (pokeContext?.loading)
    return <div className="poke-loading">Loading...</div>;
  if (pokeContext?.error) return <div>Error: {pokeContext?.error}</div>;

  const totalItems = pokeContext?.pokemon?.length || 0; // Ensure totalItems is never undefined
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 1; // Prevent NaN

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = pokeContext?.pokemon.slice(
    firstItemIndex,
    lastItemIndex
  );

  return (
    <div>
      <h2 className="poke-list-header">Pokemon List (Page {currentPage})</h2>
      <div className="poke-big-container">
        <div className="poke-container">
          {currentItems?.map((item) => {
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

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="prev-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="next-button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
