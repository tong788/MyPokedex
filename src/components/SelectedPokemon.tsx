import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../data/PokemonContext";
import { FaArrowLeft } from "react-icons/fa";
import "../scss/style.scss";
import { FaStar } from "react-icons/fa";

interface PokemonStat {
  stat: { name: string };
  base_stat: number;
}

interface PokemonType {
  type: { name: string };
}

const SelectedPokemon = () => {
  const pokeContext = useContext(PokemonContext);
  const toggleFavourite  = pokeContext?.toggleFavourite;
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const imageUrl = location.state?.imageUrl;
  const foundPokemon = pokeContext?.pokemon.find((p) => p.name === name);

  const [stats, setStats] = useState<PokemonStat[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]); // State for types

  const typeIcons: Record<string, string> = {
    normal:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/normal.png",
    fire: "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fire.png",
    water:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/water.png",
    grass:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/grass.png",
    electric:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/electric.png",
    ice: "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/ice.png",
    fighting:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fighting.png",
    poison:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/poison.png",
    ground:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/ground.png",
    flying:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/flying.png",
    psychic:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/psychic.png",
    bug: "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/bug.png",
    rock: "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/rock.png",
    ghost:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/ghost.png",
    dark: "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/dark.png",
    dragon:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/dragon.png",
    steel:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/steel.png",
    fairy:
      "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/fairy.png",
  };

  const like = () => {
    if (name && toggleFavourite) {
      // Ensure `name` is not undefined
      toggleFavourite(name);
    }
    console.log("like");
  };


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
    <div className="big-selected-pokemon-container">
      <div className="arrow-container" onClick={() => navigate(-1)}>
        <FaArrowLeft className="left-arrow" />
      </div>
      <div className="selected-pokemon-container">
        <div className="inner-selected-pokemon-container">
          <div className="star-container" onClick={like}>
            {/* check from toggle favourite in context api instead state */}
            <FaStar
              className={
                foundPokemon?.favourite ? "yellow-star-icon" : "star-icon"
              }
            />
          </div>
          <h1 className="pokemon-name">{foundPokemon.name}</h1>
          <div className="deepest-selected-pokemon-container">
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
          {/* Display Pokémon Types with Icons */}
          <div className="pokemon-types">
            <ul className="types">
              {types.map((type) => {
                const typeName = type.type.name;
                const typeIcon = typeIcons[typeName];

                return (
                  <li className="list-pokemon-types" key={typeName}>
                    {typeIcon && (
                      <img
                        src={typeIcon}
                        alt={typeName}
                        className="type-icon"
                      />
                    )}
                    <span className="type-name">{typeName}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPokemon;
