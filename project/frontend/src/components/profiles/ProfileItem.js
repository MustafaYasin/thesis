import classes from "./ProfileItem.module.css";
import Card from "../ui/Card";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import HorizontalBarChart from "../ui/HorizontalBarChart";

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
        feature_1: props.feature_1,
        feature_2: props.feature_2,
        feature_3: props.feature_3,
      });
    }
  }

  return (
    <div className={classes.item}>
      <Card>
        <div className={classes.detailsViewContainer}>
          <div className={classes.image}>
            <img src={props.avatar_url} alt={props.fullName} />
          </div>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <h3>{props.fullName}</h3>
            </div>
            <div className={classes.contentAddress}>
              <address>{props.email}</address>
            </div>
            <div className={classes.contentInfoContainer}>
              <div className={classes.contentInfoGrid}>
                <div className={classes.leftGridContainer}>
                  <div className={classes.barChartContainer}>
                    <HorizontalBarChart
                      feature_1={props.feature_1 * 100}
                      feature_2={props.feature_2 * 100}
                      feature_3={props.feature_3 * 100}
                    />
                  </div>
                  <div className={classes.totalScoreContainer}>
                    Results in Total Score of{" "}
                    <p className={classes.totalScore}>
                      {(
                        ((props.feature_1 + props.feature_2 + props.feature_3) /
                          3) *
                        100
                      ).toFixed(0)}
                      /100
                    </p>
                  </div>
                </div>
                <div className={classes.aboutContainer}>
                  <h2>About</h2>
                  {props.bio &&<div className={classes.bioContainer}>{props.bio}</div>}
                  <div className={classes.workingContainer}> {props.company &&<div> currently working at{" "}
                    <span className={classes.company}>{props.company}</span>{" "}
                    with{" "}</div>}
                   {props.yearsofExperience && <div>
                    <span className={classes.yearsofExperience}>
                      {props.yearsofExperience} years
                    </span>{" "}
                    of Experience.</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.skills}>
              <h2>Skills:</h2>
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
        </div>
      </Card>
    </div>
  );
}

export default ProfileItem;
