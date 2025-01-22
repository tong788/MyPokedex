import {
  useState,
  useEffect,
  ReactNode,
} from "react";

import { PokemonContext } from "./PokemonContext";

interface Pokemon {
  name: string;
  url: string;
}

// Create a provider component
export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=63");
        if (!res.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await res.json();
        setPokemon(data.results);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, loading, error }}>
      {children}
    </PokemonContext.Provider>
  );
};

