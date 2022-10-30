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
  const detailsCtx = useContext(DetailsContext);
  const detailsOpen = detailsCtx.totalDetails;

  function toggleDetailsStatusHandler() {
    if (detailsOpen) {
      detailsCtx.removeDetails();
    } else {
      detailsCtx.addDetails({
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
    <>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        layout
      >
        <li className={classes.item}>
          <div className={classes.card}>
            <Card>
              <div className={classes.image} onClick={toggleDetailsStatusHandler}>
                <img src={props.image} alt={props.fullName} />
              </div>
              <div className={classes.content}>
                <h3>{props.fullName}</h3>
                <address>{props.email}</address>
                <div className={classes.gauge}>
                  <Gauge recommendations={props.recommendations} />
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
    </>
  );
}

export default ProfileItemMini;
