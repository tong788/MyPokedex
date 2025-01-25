import "./scss/app.scss";
import HomePage from "./pages/HomePage";
import FavouritePage from "./pages/FavouritePage";
import PokemonPage from "./pages/PokemonPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchedPokePage from "./pages/SearchedPokePage";
import { PokemonProvider } from "./data/PokemonProvider";

function App() {
  return (
    <PokemonProvider>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/page/:page" element={<PokemonPage />} />
            <Route path="/pokemon/:name" element={<SearchedPokePage />} />
            <Route path="/favourite" element={<FavouritePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </PokemonProvider>
  );
}

export default App;
