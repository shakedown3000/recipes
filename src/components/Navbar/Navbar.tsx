import { NavLink } from "react-router-dom";
import LoginStatus from "../LoginStatus/LoginStatus";
import "./Navbar.css";
import { useSearchContext } from "../../Context/SearchContext";

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearchContext();

  return (
    <>
      <div className="yellow_bar"></div>
      <header className="app-header">
        <div className="nav_wrapper">
          <NavLink to="/">
            <img
              src="/public/rezeptwelt logo.png"
              alt="logo"
              className="logo"
            />
          </NavLink>
          <nav className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/allrecipes">Alle Rezepte</NavLink>
            <NavLink to="/aboutus">Über Uns</NavLink>
            <div className="searchbar-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Suche nach Titel"
              />
            </div>
            <p>
              <LoginStatus />
            </p>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
