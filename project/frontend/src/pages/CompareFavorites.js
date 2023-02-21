import VerticalBarChart from "../components/ui/VerticalBarChart";
import { useContext } from "react";
import FavoritesContext from "../components/store/favorites-context";
import classes from "./CompareFavorites.module.css"
function CompareFavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  console.log(favoritesCtx.favorites);
  var names = favoritesCtx.favorites.map((person) => [person.fullName]);
  var data = favoritesCtx.favorites.map((person) => [
    person.feature_1,
    person.feature_2,
    person.feature_3,
  ]);

  return (
    <div>
      {favoritesCtx.totalFavorites && (
        <div className={classes.verticalBarChartContainer}>
          <VerticalBarChart names={names} data={data} />
        </div>
      )}
      {!favoritesCtx.totalFavorites && <h1>Select Favorites first</h1>}
    </div>
  );
}

export default CompareFavoritesPage;
