import classes from "./Filter.module.css";
import { useState } from "react";
import Slider from "./Slider";
import jobs from "../store/JobCategories";
import features from "../store/FeatureTexts";
import { useEffect } from "react";
import FilterHeader from "./FilterHeader";
import Tippy from "@tippyjs/react";
import RecommendedProfilesTooltip from "../ui/tooltips/RecommendedProfilesTooltip";
import { Tooltip } from "../store/FeatureTexts";

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

  const [jobCategory, setJobCategory] = [props.jobCategory, props.setJobCategory];

  useEffect(() => {
    calcRecommend();
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }, []);

  function dropDownClickHandler(category) {
    console.log(jobCategory)
    setJobCategory(category);
    category === jobs.dataScience
      ? props.apiRequest("data_science")
      : category === jobs.medicalAi
      ? props.apiRequest("ai_for_health")
      : props.apiRequest("computer_vision");

    setJobCategory(category);
    console.log(jobCategory) 
  }
  
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
  // function dropDownClickHandler(category) {
  //   setJobCategory(category);
  // }

  return (
    <>
      <div className={classes.filter}>
        {/* <GeneralFilter />
        <ProgrammingLanguageFilter /> */}
      </div>
      <div className={classes.sliderFilterBox}>
        <div className={classes.sliderHeader}>
          <h1>Use Sliders to adjust Results</h1>
        </div>
        <div className={classes.sliderBox}>
          <div className={classes.featureSlider1}>
            <Slider
              feature={jobCategory}
              featureValue={feature1Factor}
              setFeatureValue={setFeature1Factor}
              handleSlider={handleFeature1Slider}
              color="darkgreen"
              featureTooltipText={
                jobCategory === "Data Scientist"
                  ? features.dataScience.description
                  : jobCategory === "AI in Medicine"
                  ? features.medicalAi.description
                  : features.computerVision.description
              }
            />{" "}
          </div>{" "}
          <div className={classes.categorySelector}>
            Select prefered Category
            <Tippy
              placement="right"
              content={
                <RecommendedProfilesTooltip
                  header={Tooltip.selectCategory.header}
                  text={Tooltip.selectCategory.text}
                ></RecommendedProfilesTooltip>
              }
            >
              <span className={classes.info}>&#9432; </span>
            </Tippy>
            <FilterHeader
              jobCategory={jobCategory}
              setJobCategory={setJobCategory}
              dropDownClickHandler={dropDownClickHandler}
            />
          </div>
          <div className={classes.featureSlider2}>
            <Slider
              feature={features.activity.title}
              featureValue={feature2Factor}
              setFeatureValue={setFeature2Factor}
              handleSlider={handleFeature2Slider}
              color="darkgoldenrod"
              featureTooltipText={features.activity.description}
            />
          </div>
          <div className={classes.featureSlider3}>
            <Slider
              feature={features.experience.title}
              featureValue={feature3Factor}
              setFeatureValue={setFeature3Factor}
              handleSlider={handleFeature3Slider}
              color="darkslateblue"
              featureTooltipText={features.experience.description}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
