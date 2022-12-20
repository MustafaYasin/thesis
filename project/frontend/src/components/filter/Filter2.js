import classes from "./Filter2.module.css";
import { useState } from "react";
import RadarChart from "./RadarChart";
import jobs from "../store/JobCategories";
import features from "../store/FeatureTexts";
import FilterHeader from "./FilterHeader";
import PieChart from "../ui/PieChart";
import { useEffect } from "react";
import Tippy from "@tippyjs/react";
import RecommendedProfilesTooltip from "../ui/tooltips/RecommendedProfilesTooltip";
import { Tooltip } from "../store/FeatureTexts";
import DataScientistScoreTooltip from "../ui/tooltips/DataScientistScoreTooltip";

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
    calcRadar(feature1Factor,feature2Factor,feature3Factor)
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }, [feature1Factor,feature2Factor,feature3Factor]);

  function calcRadar(feature1Factor, feature2Factor, feature3Factor) {
    const len = props.allProfiles.length;
    for (let i = 0; i < len; i++) {
      props.allProfiles[i].recommendations =
        (feature1Factor * props.allProfiles[i].feature_1 +
          feature2Factor * props.allProfiles[i].feature_2 +
          feature3Factor * props.allProfiles[i].feature_3) /
        (feature1Factor * 1.0 + feature2Factor * 1.0 + feature3Factor * 1.0);
    }
  }

  function handleRadar(axis1=1, axis2=1, axis3=1) {
    //console.log(axis1, axis2, axis3);
    setFeature1Factor(axis1);
    setFeature2Factor(axis2);
    setFeature3Factor(axis3);
    // calcRadar(axis1, axis2, axis3);
    // const sorted = [...props.allProfiles].sort(
    //   (a, b) => b.recommendations - a.recommendations
    // );
    // props.setFilteredProfiles(sorted);
  }

  function dropDownClickHandler(category) {
    setJobCategory(category);
  }

  return (
    <div className={classes.filterContainer}>
      <div className={classes.radarHeader}>
        <h1>Use RadarChart to adjust Results</h1>
      </div>
      {/* <div className={classes.filter}>
        <FilterHeader
          jobCategory={jobCategory}
          setJobCategory={setJobCategory}
          dropDownClickHandler={dropDownClickHandler}
        />
        <GeneralFilter />
        <ProgrammingLanguageFilter />
      </div> */}
      <div className={classes.mixedChartContainerBackground}>
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
        <div className={classes.mixedChartContainer}>
          <div className={classes.radarChart}>
            <RadarChart
              axis1={feature1Factor}
              axis2={feature2Factor}
              axis3={feature3Factor}
              handleAxisChange={handleRadar}
              labels={[
                jobCategory,
                features.experience.title,
                features.activity.title,
              ]}
            />
          </div>
          <div className={classes.pieChartContainer}>
            <PieChart
              feature1Factor={feature1Factor}
              feature2Factor={feature3Factor}
              feature3Factor={feature2Factor}
            />
          </div>
          <div className={classes.categoryInfo}>
            <Tippy
              className={classes.tooltip}
              content={
                <DataScientistScoreTooltip
                  color="darkgreen"
                  feature={jobCategory}
                  featureTooltipText={jobCategory === "Data Scientist"
                  ? features.dataScience.description
                  : jobCategory === "AI in Medicine"
                  ? features.medicalAi.description
                  : features.computerVision.description}
                ></DataScientistScoreTooltip>
              }
              delay={100}
              placement="right"
            >
              <span className={classes.info}>&#9432; </span>
            </Tippy>
          </div>
          <div className={classes.experienceInfo}>
            <Tippy
              className={classes.tooltip}
              content={
                <DataScientistScoreTooltip
                  color="darkslateblue"
                  feature={features.dataScience.title}
                  featureTooltipText={features.experience.description}
                ></DataScientistScoreTooltip>
              }
              delay={100}
              placement="right"
            >
              <span className={classes.info}>&#9432; </span>
            </Tippy>
          </div>
          <div className={classes.activityInfo}>
            <Tippy
              className={classes.tooltip}
              content={
                <DataScientistScoreTooltip
                  color="darkgoldenrod"
                  feature={features.activity.title}
                  featureTooltipText={features.activity.description}
                ></DataScientistScoreTooltip>
              }
              delay={100}
              placement="right"
            >
              <span className={classes.info}>&#9432; </span>
            </Tippy>
          </div>
          <div className={classes.hideLegend}></div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
