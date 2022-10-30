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
        avatar: props.image,
        Hireable: props.hireable,
        Name: props.fullName,
        repos: props.repos,
        starredTime: props.starredTime,
        Username: props.username,
        recommendations: props.recommendations,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.fullName} />
        </div>
        <div className={classes.content}>
          <h3>{props.fullName}</h3>
          <address>{props.email}</address>
          <p>Hireable: {props.Hireable?"yes":"no"}</p>
          <p>Repos: {props.repos}</p>
          <p>starredTime: {props.starredTime}</p>
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
