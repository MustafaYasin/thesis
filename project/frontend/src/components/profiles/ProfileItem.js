import classes from "./ProfileItem.module.css";
import Card from "../ui/Card";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";

function ProfileItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.email);
    } else {
      favoritesCtx.addFavorite({
        email: props.email,
        avatar_url: props.avatar_url,
        isHireable: props.isHireable,
        fullName: props.fullName,
        repository_count: props.repository_count,
        star_time: props.star_time,
        username: props.username,
        recommendations: props.recommendations,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.avatar_url} alt={props.fullName} />
        </div>
        <div className={classes.content}>
          <h3>{props.fullName}</h3>
          <address>{props.email}</address>
          <p>Hireable: {props.isHireable?"yes":"no"}</p>
          <p>Repos: {props.repository_count}</p>
          <p>starredTime: {props.star_time}</p>
          <p>username: {props.username}</p>
          <p>recommendations: {props.recommendations}</p>
          <p>END OF CARD</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ProfileItem;
