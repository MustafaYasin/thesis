import ProfileList from "../components/profiles/ProfileList";
import FavoritesContext from "../components/store/favorites-context";
import { useContext } from "react";
import classes from "./Favorites.module.css";
import Card from "../components/ui/Card";
import Filter from "../components/filter/Filter";


function FavoritesPage() {
  const favoriteCtx = useContext(FavoritesContext);

  let content;
  if (favoriteCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    content = (
      <div className={classes.basic}>
        <div className={classes.filter}>
          <h1>Filter</h1>
          <Card>
            <Filter />
          </Card>
        </div>
        <div className={classes.profiles}>favorites
          <ProfileList profiles={favoriteCtx.favorites} />
        </div>
      </div>
    );
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
