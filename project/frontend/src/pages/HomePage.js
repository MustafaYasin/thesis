import Card from "../components/ui/Card";
import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";
import Slider from "../components/filter/Slider";

function CompareFavoritesPage() {
  return (
    <>
      <h1>HomePage</h1>
      <div className={classes.dataScientist}>
        <Card>
          <div>
            <h3>Looking for Data Scientist?</h3>
            <div className={classes.image}>
              <img
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
