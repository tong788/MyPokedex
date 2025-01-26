import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../data/PokemonContext";
import { FaArrowLeft } from "react-icons/fa";
import "../scss/style.scss";

interface PokemonStat {
  stat: { name: string };
  base_stat: number;
}

interface PokemonType {
  type: { name: string };
}

const SelectedPokemon = () => {
  const pokeContext = useContext(PokemonContext);
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const imageUrl = location.state?.imageUrl;
  const foundPokemon = pokeContext?.pokemon.find((p) => p.name === name);

  const [stats, setStats] = useState<PokemonStat[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]); // State for types

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!name) return;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setStats(data.stats as PokemonStat[]); // Set stats
        setTypes(data.types as PokemonType[]); // Set types
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (!foundPokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <div className="big-searched-pokemon-container">
      <div className="arrow-container" onClick={() => navigate(-1)}>
        <FaArrowLeft className="left-arrow" />
      </div>
      <div className="searched-pokemon-container">
        <div className="inner-search-pokemon-container">
          <h1 className="pokemon-name">{foundPokemon.name}</h1>
          <div className="deepest-search-pokemon-container">
            <div className="image-container">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={foundPokemon.name}
                  className="selected-pokemon-image"
                />
              )}
            </div>

            {/* Display Pokémon Stats */}
            <div className="pokemon-stats">
              <h2 className="stat-text">Stats</h2>
              <ul className="stats">
                {stats.map((stat) => (
                  <li key={stat.stat.name}>
                    -<strong>{stat.stat.name}:</strong> {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="type-text">Types</p>
          {/* Display Pokémon Types */}
          <div className="pokemon-types">
            <ul className="types">
              {types.map((type) => (
                <li className="list-pokemon-types" key={type.type.name}>
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPokemon;
