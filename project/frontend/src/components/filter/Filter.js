import classes from "./Filter.module.css";
import { useState } from "react";
import Slider from "./Slider";
import jobs from "../layout/JobCategories";
import GeneralFilter from "./GeneralFilter";
import ProgrammingLanguageFilter from "./ProgrammingLanguageFilter";
import FilterHeader from "./FilterHeader";
import { useEffect } from "react";

function Filter(props) {
  const [feature1Factor, setFeature1Factor] = [
    props.feature1Factor,
    props.setFeature1Factor,
  ];
  const [feature2Factor, setFeature2Factor] = [
    props.feature2Factor,
    props.setFeature2Factor,
  ];
  const [feature3Factor, setFeature3Factor] = [
    props.feature3Factor,
    props.setFeature3Factor,
  ];

  const [jobCategory, setJobCategory] = useState(jobs.dataScience);

  useEffect(() => {
    calcRecommend();
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }, []);

  function calcRecommend() {
    const len = props.allProfiles.length;
    for (let i = 0; i < len; i++) {
      props.allProfiles[i].recommendations =
        (feature1Factor * props.allProfiles[i].feature_1 +
          feature2Factor * props.allProfiles[i].feature_2 +
          feature3Factor * props.allProfiles[i].feature_3) /
        (feature1Factor * 1.0 + feature2Factor * 1.0 + feature3Factor * 1.0);
    }
  }

  function handleFeature1Slider(event) {
    //console.log(event.target.value);
    setFeature1Factor(event.target.value);
    calcRecommend();
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }
  function handleFeature2Slider(event) {
    setFeature2Factor(event.target.value);
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
      {/* <div className={classes.filter}>
        <FilterHeader
          jobCategory={jobCategory}
          setJobCategory={setJobCategory}
          dropDownClickHandler={dropDownClickHandler}
        />
        <GeneralFilter />
        <ProgrammingLanguageFilter />
      </div> */}
      <div className={classes.sliderFilterBox}>
        <div className={classes.sliderHeader}>
          <h1>Use Sliders to adjust Results</h1>
        </div>
        <div className={classes.sliderBox}>
          <div className={classes.featureSlider1}>
            <Slider
              feature={jobCategory}
              text="This feature represents the Data Science Score. It is calculated by the Datascience Project of the User"
              featureValue={feature1Factor}
              setFeatureValue={setFeature1Factor}
              handleSlider={handleFeature1Slider}
              color="darkgreen"
            />
          </div>
          <div className={classes.featureSlider2}>
            <Slider
              feature="Feature 2"
              featureValue={feature2Factor}
              setFeatureValue={setFeature2Factor}
              handleSlider={handleFeature2Slider}
              color="darkgoldenrod"
            />
          </div>
          <div className={classes.featureSlider3}>
            <Slider
              feature="Feature 3"
              featureValue={feature3Factor}
              setFeatureValue={setFeature3Factor}
              handleSlider={handleFeature3Slider}
              color="darkslateblue"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
