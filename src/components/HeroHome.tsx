import pikachu from "../assets/png/pikachu.png";
import "../scss/style.scss";

const HeroHome = () => {
  return (
    <section className="herohome-container">
      <div className="left-home-container">
        <img src={pikachu} className="pikachu"></img>
      </div>

      <div className="right-home-container">
        <h1>Welcome to My Pokedex</h1>
        <div>
          <form>
            <h3>Start searching your pokemon now!</h3>
            <div className="home-search">
              <input
                type="text"
                placeholder="Input the pokemon name"
                className="search-bar"
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
