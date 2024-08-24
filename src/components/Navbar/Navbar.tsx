import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="yellow_bar"></div>
      <header className="app-header">
        <img src="/public/rezeptwelt logo.png" alt="" />
        <p>Logo Rezeptwelt</p>
        <nav className="navbar">Home Rezepte Über Uns</nav>
        <p>{/* <LoginStatus /> */} Login</p>
      </header>
    </>
  );
};

export default Navbar;
