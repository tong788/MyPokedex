import {
  createContext,
  // useContext,
} from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextType {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

// // Create a custom hook to use the PokemonContext
// export const usePokemon = () => {
//   const context = useContext(PokemonContext);
//   if (!context) {
//     throw new Error("usePokemon must be used within a PokemonProvider");
//   }
//   return context;
// };
