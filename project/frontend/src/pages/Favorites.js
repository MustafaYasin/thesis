import ProfileList from "../components/profiles/ProfileList";
import FavoritesContext from "../components/store/favorites-context";
import { useContext } from "react";
import classes from "./Favorites.module.css";


function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);

  let content;
  if (favoriteCtx.totalFavorites === 0) {
    content = <p className={classes.heading}>You got no favorites yet. Maybe start adding some?</p>;
  } else {
    content = (
      <div className={classes.basic}>
        <div className={classes.profiles}>
          <ProfileList profiles={favoriteCtx.favorites} />
        </div>
      </div>
    );
  }

  return (
    <section>
      <h1 className={classes.heading}>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
