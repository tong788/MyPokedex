import { Link, useParams, useNavigate } from "react-router-dom";
import { PokemonContext } from "../data/PokemonContext";
import { useContext } from "react";

const PokemonList = () => {
  const pokeContext = useContext(PokemonContext);
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // React Router navigation hook
  const currentPage = page ? parseInt(page, 10) : 1; //change from string that get from useParam to number and page 1 by default if don't get string
  const itemsPerPage = 63;

  if (pokeContext?.loading)
    return <div className="poke-loading">Loading...</div>;
  if (pokeContext?.error) return <div>Error: {pokeContext?.error}</div>;

  const totalItems = pokeContext?.pokemon?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = firstItemIndex + itemsPerPage;
  const currentItems = pokeContext?.pokemon.slice(
    firstItemIndex,
    lastItemIndex
  );

  return (
    <div>
      <h2 className="poke-list-header">Pokémon List (Page {currentPage})</h2>
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
        {currentPage > 1 && (
          <button
            className="prev-button"
            onClick={() => navigate(`/pokemon/page/${currentPage - 1}`)}
          >
            Previous
          </button>
        )}

        <span>
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <button
            className="next-button"
            onClick={() => navigate(`/pokemon/page/${currentPage + 1}`)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
