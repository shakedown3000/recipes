import Recipes from "../../components/Rezepte/Recipes";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">
      <div className="hero">
        <p className="hero_headline">
          Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben
          Sie unvergessliche Momente bei Tisch.
        </p>
      </div>
      <Recipes />
    </section>
  );
};

export default Home;
