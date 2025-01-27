import { useNavigate } from "react-router-dom";
import pikachu from "../assets/png/pikachu.png";
import "../scss/style.scss";
import { useState } from "react";

const HeroHome = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate()

  const handleSearch = () => {
    const key = searchTerm.toLowerCase()
    navigate(`/search/${key}`);
  }

  return (
    <section className="herohome-container">
      <div className="left-home-container">
        <img src={pikachu} className="pikachu"></img>
      </div>

      <div className="right-home-container">
        <h1>Welcome to My Pokedex</h1>
        <div>
          <form onSubmit={handleSearch}>
            <h3>Start searching your pokemon now!</h3>
            <div className="home-search">
              <input
                type="text"
                placeholder="Input the pokemon name"
                className="search-bar"
                onChange={(event)=>setSearchTerm(event.target.value)}
              ></input>
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
