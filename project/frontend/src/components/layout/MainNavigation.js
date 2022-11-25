import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";

function MainNavigation() {
  const favoriteCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Profile Recommender</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/recommend">Slider Profiles</Link>
          </li>
          <li>
            <Link to="/recommend2">Radar Profiles</Link>
          </li>
          <li>
            <Link to="/favorites" className={classes.link}>
              Favorites
              <span className={classes.badge}>
                {favoriteCtx.totalFavorites}
              </span>
            </Link>
          </li>
          <li>
            <Link to="/compare">Compare Favorites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
