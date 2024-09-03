import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./styling/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <img className="logoIcon" src="/icons/LogoIcon.png" alt="Logo Icon" />
      <ul className="navList">
        <li className="navListItems">
          <Link to="/" className="navLink">
            Home
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li className="navListItems">
              <Link to="/rentals" className="navLink">
                Rentals
              </Link>
            </li>

            <li className="navListItems">
              <Link to="/faq" className="navLink">
                FAQ
              </Link>
            </li>

            <li className="navListItems">
              <Link to="/profile" className="navLink">
                Cart
              </Link>
            </li>

            <li className="navListItems">
              <button onClick={handleLogout} className="logoutButton">
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
