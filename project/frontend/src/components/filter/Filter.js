import classes from "./Filter.module.css";
import { useState } from "react";
import Slider from "./Slider";
import jobs from "../layout/JobCategories";
import GeneralFilter from "./GeneralFilter";
import ProgrammingLanguageFilter from "./ProgrammingLanguageFilter";
import FilterHeader from "./FilterHeader";

function Filter(props) {
  const [activityFactor, setActivityFactor] = [
    props.slider1Factor,
    props.setSlider1Factor,
  ];
  const [dataKingFactor, setDataKingFactor] = [
    props.slider2Factor,
    props.setSlider2Factor,
  ];
  const [feature3Factor, setFeature3Factor] = [
    props.slider3Factor,
    props.setSlider3Factor,
  ];

  const [jobCategory, setJobCategory] = useState(jobs.dataScience);

  function calcRecommend() {
    const len = props.allProfiles.length;
    for (let i = 0; i < len; i++) {
      props.allProfiles[i].recommendations =
        (activityFactor * props.allProfiles[i].feature_1 +
          dataKingFactor * props.allProfiles[i].feature_2 +
          feature3Factor * props.allProfiles[i].feature_3) /
        (activityFactor * 1.0 + dataKingFactor * 1.0 + feature3Factor * 1.0);
    }
  }

  function handleActivitySlider(event) {
    //console.log(event.target.value);
    setActivityFactor(event.target.value);
    calcRecommend();
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }
  function handleDataKingSlider(event) {
    setDataKingFactor(event.target.value);
    calcRecommend();
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }
  function handleFeature3Slider(event) {
    setFeature3Factor(event.target.value);
    calcRecommend();
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }
  function dropDownClickHandler(category) {
    setJobCategory(category);
  }

  return (
    <>
      <div className={classes.filter}>
        <FilterHeader
          jobCategory={jobCategory}
          setJobCategory={setJobCategory}
          dropDownClickHandler={dropDownClickHandler}
        />
        <GeneralFilter />
        <ProgrammingLanguageFilter />
      </div>
      <div className={classes.sliderBox}>
        <div className={classes.featureSlider}>
          <Slider
            feature={jobCategory}
            featureValue={activityFactor}
            setFeatureValue={setActivityFactor}
            handleSlider={handleActivitySlider}
            color="darkgreen"
          />
        </div>
        <div className={classes.featureSlider}>
          <Slider
            feature="DataKing"
            featureValue={dataKingFactor}
            setFeatureValue={setDataKingFactor}
            handleSlider={handleDataKingSlider}
            color="darkgoldenrod"
          />
        </div>
        <div className={classes.featureSlider}>
          <Slider
            feature="Feature 3"
            featureValue={feature3Factor}
            setFeatureValue={setFeature3Factor}
            handleSlider={handleFeature3Slider}
            color="darkslateblue"
          />
        </div>
      </div>
    </>
  );
}

export default Filter;
