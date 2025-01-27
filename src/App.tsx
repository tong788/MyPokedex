import "./scss/app.scss";
import HomePage from "./pages/HomePage";
import FavouritePage from "./pages/FavouritePage";
import PokemonPage from "./pages/PokemonPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectedPokemonPage from "./pages/SelectedPokemonPage";
import { PokemonProvider } from "./data/PokemonProvider";
import SearchedPokemonPage from "./pages/SearchedPokemonPage";

function App() {
  return (
    <PokemonProvider>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pokemon/page/:page" element={<PokemonPage />} />
            <Route path="/pokemon/:name" element={<SelectedPokemonPage />} />
            <Route path="/favourite" element={<FavouritePage />} />
            <Route path="/search/:name" element={<SearchedPokemonPage/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </PokemonProvider>
  );
}

export default App;
