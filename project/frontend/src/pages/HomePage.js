import Card from "../components/ui/Card";
import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";
import Slider from "../components/filter/Slider";
import HorizontalBarChart from "../components/ui/HorizontalBarChart";

function CompareFavoritesPage() {
  return (
    <>
      <div className={classes.homePageHeaderContainer}>
        <h1>HomePage</h1>
      </div>
      <div className={classes.cardContainer}>
        <Card>
          <div className={classes.cardContentContainer}>
            <div className={classes.cardContentHeader}>
              <h2>Looking for Data Scientist?</h2>
            </div>
            <div className={classes.imageContainer}>
              <img
                className={classes.image}
                src="https://www.sudeep.co/images/post_images/2018-02-09-Understanding-the-Data-Science-Lifecycle/chart.png"
                alt=""
              />
              <div className={classes.link}>
                <Link to="/recommend">
                  <button> Click Here</button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default CompareFavoritesPage;
