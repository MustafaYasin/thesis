import classes from "./ProfileItemMini.module.css";
import Card from "../ui/Card";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import DetailsContext from "../store/details-context.js";

import "react-circular-progressbar/dist/styles.css";
import Gauge from "../ui/Gauge";

import { motion } from "framer-motion";

function ProfileItemMini(props) {
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
        feature_1: props.feature_1,
        feature_2: props.feature_2,
        feature_3: props.feature_3,
      });
    }
  }
  const detailsCtx = useContext(DetailsContext);
  const detailsOpen = detailsCtx.totalDetails;

  function toggleDetailsStatusHandler() {
    if (detailsOpen) {
      detailsCtx.removeDetails();
    } else {
      detailsCtx.addDetails({
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
        feature_1: props.feature_1,
        feature_2: props.feature_2,
        feature_3: props.feature_3,
      });
    }
  }

  return (
    <div className={classes.item}>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        layout
      >
        <li>
          <div className={classes.card}>
            <Card>
              <div
                className={classes.imageContainer}
                onClick={toggleDetailsStatusHandler}
              >
                <img
                  className={classes.image}
                  src={props.avatar_url}
                  alt={props.fullName}
                />
              </div>
              <div className={classes.content}>
                <h3>{props.fullName}</h3>
                <address>{props.email}</address>
                <div className={classes.gauge}>
                  <Gauge
                    recommendations={props.recommendations}
                    feature_1={props.feature_1}
                    feature_2={props.feature_2}
                    feature_3={props.feature_3}
                    slider1Factor={props.slider1Factor}
                    slider2Factor={props.slider2Factor}
                    slider3Factor={props.slider3Factor}
                  />
                </div>
              </div>
              <div className={classes.actions}>
                <button onClick={toggleFavoriteStatusHandler}>
                  {itemIsFavorite ? "Undo-Favorite" : "To Favorites"}
                </button>
              </div>
            </Card>
          </div>
        </li>
      </motion.div>
    </div>
  );
}

export default ProfileItemMini;
