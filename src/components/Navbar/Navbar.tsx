import { NavLink } from "react-router-dom";
import LoginStatus from "../LoginStatus/LoginStatus";
import "./Navbar.css";

const Navbar = () => {
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
            <NavLink to="/aboutus">Über Uns</NavLink>{" "}
            <p>
              <LoginStatus />
              {/* <NavLink to="./login">Login</NavLink> */}
            </p>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
