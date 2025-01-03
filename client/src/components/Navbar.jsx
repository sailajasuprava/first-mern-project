import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/authContext";

function Navbar() {
  const { token, setToken } = useAuth();

  const handleClick = () => {
    localStorage.removeItem("merntoken");
    setToken();
  };

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">ThapaTechnical</NavLink>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/about"> About </NavLink>
            </li>
            <li>
              <NavLink to="/service"> Services </NavLink>
            </li>
            <li>
              <NavLink to="/contact"> Contact </NavLink>
            </li>

            {token ? (
              <button onClick={handleClick}>Logout</button>
            ) : (
              <>
                <li>
                  <NavLink to="/register"> Register </NavLink>
                </li>
                <li>
                  <NavLink to="/login"> Login </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
