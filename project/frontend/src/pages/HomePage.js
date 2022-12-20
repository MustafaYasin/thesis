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
        <h2>Feel free to explore the App. If you don't know what to do, try to find a very active Computer Vision expert.</h2>
      </div>

      <div className={classes.categoryContainer}>
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

        <div className={classes.cardContainer}>
          <div className={classes.comingSoon}>
            <Card>
              <div className={classes.cardContentContainer}>
                <div className={classes.cardContentHeader}>
                  <h2>Looking for Software Engineer?</h2>
                </div>
                <div className={classes.imageContainer}>
                  <img
                    className={classes.image}
                    src="https://w7.pngwing.com/pngs/386/188/png-transparent-programmer-programming-language-software-developer-computer-programming-sublime-text-computer-cartoon-furniture-reading-cartoon.png"
                    alt=""
                  />
                  <div className={classes.comingSoonButton}>
                    <button> COMING SOON! </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className={classes.cardContainer}>
          <div className={classes.comingSoon}>
            <Card>
              <div className={classes.cardContentContainer}>
                <div className={classes.cardContentHeader}>
                  <h2>Looking for UX/UI design?</h2>
                </div>
                <div className={classes.imageContainer}>
                  <img
                    className={classes.image}
                    src="https://miro.medium.com/max/1100/1*VsNDNsrY96XmmBEpftI2Hw.webp"
                    alt=""
                  />
                  <div className={classes.comingSoonButton}>
                    <button> COMING SOON!</button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareFavoritesPage;
