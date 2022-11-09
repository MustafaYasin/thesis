import classes from "./Filter.module.css";
import { useState } from "react";
import RangeSlider from "./RangeSlider";
import Slider from "./Slider";

function Filter(props) {
  const [allPressed, setAllPressed] = useState(true);
  const [hirePressed, setHirePressed] = useState(false);
  const [activityFactor, setActivityFactor] = useState(1);
  const [dataKingFactor, setDataKingFactor] = useState(1);
  const [feature3Factor, setFeature3Factor] = useState(1);

  function hireableHandler() {
    if (hirePressed) {
      props.setFilteredProfiles(props.allProfiles);
      setHirePressed(false);
    } else {
      const filtered = props.allProfiles.filter(
        (profile) => profile.hireable === true
      );
      props.setFilteredProfiles(filtered);
      setAllPressed(false);
      setHirePressed(true);
    }
  }
  
  function calcRecommend() {
    const len = props.allProfiles.length;
    for (let i = 0; i < len; i++) {
      props.allProfiles[i].recommendations =
        (activityFactor * props.allProfiles[i].feature_1 +
          dataKingFactor * props.allProfiles[i].feature_2 +
          feature3Factor * props.allProfiles[i].feature_3) /
        (activityFactor*1.0 + dataKingFactor + feature3Factor);
    }
  }

  function handleActivitySlider(event) {
    setActivityFactor(event.target.value);
    calcRecommend();
  }
  function handleDataKingSlider(event) {
    setDataKingFactor(event.target.value);
  }
  function handleFeature3Slider(event) {
    setFeature3Factor(event.target.value);
  }

  return (
    <>
      <div className={classes.filter}>
        <div className={classes.headerContainer}>
          <h1>Filter</h1>
        </div>

        <div className={classes.generalContainer}>
          <div className={classes.generalHeaderContainer}>
            <h2>General</h2>
          </div>
          <div className={classes.generalList}>
            <ul>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="hireable"
                  id="hireable"
                  value={hirePressed}
                  onChange={hireableHandler}
                />
                <label className={classes.label} htmlFor="hireable">
                  hireable
                </label>
              </li>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="githubStar"
                  id="githubStar"
                />
                <label className={classes.label} htmlFor="githubStar">
                  githubStar
                </label>
              </li>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="campusExpert"
                  id="campusExpert"
                />
                <label className={classes.label} htmlFor="campusExpert">
                  campusExpert
                </label>
              </li>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="developerProgramMember"
                  id="developerProgramMember"
                />
                <label
                  className={classes.label}
                  htmlFor="developerProgramMember"
                >
                  developerProgramMember
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.programmingLanguageContainer}>
          <div className={classes.programmingLanguageHeaderContainer}>
            <h2>ProgrammingLanguage</h2>
          </div>
          <div className={classes.programmingLanguageList}>
            <ul>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="r"
                  id="r"
                />
                <label className={classes.label} htmlFor="r">
                  R
                </label>
              </li>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="c++"
                  id="c++"
                />
                <label className={classes.label} htmlFor="c++">
                  C++
                </label>
              </li>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="java"
                  id="java"
                />
                <label className={classes.label} htmlFor="java">
                  Java
                </label>
              </li>
              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="python"
                  id="python"
                />
                <label className={classes.label} htmlFor="python">
                  Python
                </label>
              </li>

              <li className={classes.generalListItem}>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  name="javascript"
                  id="javascript"
                />
                <label className={classes.label} htmlFor="javascript">
                  Javascript
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.rangeSliderContainer}>
        <RangeSlider />
      </div>
      <div className={classes.sliderBox}>
        <div className={classes.featureSlider}>
          <Slider
            featureName="Activity"
            featureValue={activityFactor}
            setFeatureValue={setActivityFactor}
            handleSlider={handleActivitySlider}
          />
        </div>
        <div className={classes.featureSlider}>
          <Slider
            feature="DataKing"
            featureValue={dataKingFactor}
            setFeatureValue={setDataKingFactor}
            handleSlider={handleDataKingSlider}
          />
        </div>
        <div className={classes.featureSlider}>
          <Slider
            feature="Feature 3"
            featureValue={feature3Factor}
            setFeatureValue={setFeature3Factor}
            handleSlider={handleFeature3Slider}
          />
        </div>
      </div>
    </>
  );
}

export default Filter;
