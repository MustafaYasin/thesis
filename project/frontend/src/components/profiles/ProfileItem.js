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
        bio: props.bio,
        company: props.company,
        primary_language: props.primary_language,
        yearsofExperience: props.yearsofExperience,
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
          <p>
            {props.fullName} arbeitet bei{" "}
            {props.company ? props.company : "Keine Angabe"},
          </p>
          <p>und hat {props.repository_count} Repos auf GitHub</p>
          <p>
            kurze Bio: {props.bio ? props.bio : "wurde leider nicht angegeben"}
          </p>
          <div className={classes.skills}>
            <p>Skills:</p>
            <div className={classes.programmingLanguageContainer}>
              {Object.keys(props.primary_language).map((language) => (
                <div key={language} className={classes.programmingLanguage}>
                  {language}
                </div>
              ))}
            </div>
          </div>
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
