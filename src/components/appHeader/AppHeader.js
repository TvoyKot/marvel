import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";

const AppHeader = () => {
  const getActiveClass = ({ isActive }) => {
    return isActive ? "active" : "";
  };
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/" end="true">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink to="/" end className={getActiveClass}>
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink to="/comics" className={getActiveClass}>
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
