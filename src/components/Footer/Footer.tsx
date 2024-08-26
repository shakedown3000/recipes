import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <section className="footer_wrapper">
        <div className="footer_inner_wrapper">
          <NavLink to="/">
            <img
              src="/Logo_Rezeptwelt_yellow.png"
              alt="logo"
              className="yellow_logo"
            />
          </NavLink>
          <div className="social_media">
            <a href="#">
              <img src="/YouTube.svg" alt="YouTube"></img>
            </a>
            <a href="#">
              <img src="/Twitter.svg" alt="Twitter"></img>
            </a>
            <a href="#">
              <img src="/Browser.svg" alt="Browser"></img>
            </a>
            <a href="#">
              <img src="/Pinterest.svg" alt="Pinterest"></img>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
