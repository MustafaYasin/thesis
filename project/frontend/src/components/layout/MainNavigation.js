import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext, useState } from "react";
import FavoritesContext from "../store/favorites-context";
import FilterHeader from "../filter/FilterHeader";
import jobs from "../store/JobCategories";

function MainNavigation() {
  const favoriteCtx = useContext(FavoritesContext);
  const [jobCategory, setJobCategory] = useState(jobs.dataScience);


  return (
    <header className={classes.header}>
      <div className={classes.leftContainer}>
        <Link to="/">
          <div className={classes.logo}>Home</div>
        </Link>
      </div>
      {/* <div className={classes.categoryDropdownContainer}>
        <FilterHeader className={classes.categoryDropdown}
          jobCategory={jobCategory}
          setJobCategory={setJobCategory}
          dropDownClickHandler={dropDownClickHandler}
        />
      </div> */}
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
          {/* <li>
            <Link to="/compare">Compare Favorites</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
