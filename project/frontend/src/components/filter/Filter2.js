import classes from "./Filter.module.css";
import { useState } from "react";
import RadarChart from "./RadarChart";
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

  function calcRadar(activityFactor, dataKingFactor, feature3Factor) {
    const len = props.allProfiles.length;
    for (let i = 0; i < len; i++) {
      props.allProfiles[i].recommendations =
        (activityFactor * props.allProfiles[i].feature_1 +
          dataKingFactor * props.allProfiles[i].feature_2 +
          feature3Factor * props.allProfiles[i].feature_3) /
        (activityFactor * 1.0 + dataKingFactor * 1.0 + feature3Factor * 1.0);
    }
  }

  function handleRadar(axis1, axis2, axis3) {
    //console.log(axis1, axis2, axis3);
    calcRadar(axis1, axis2, axis3);
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

      <div className={classes.radarChart}>
        <RadarChart
          axis1={activityFactor}
          axis2={dataKingFactor}
          axis3={feature3Factor}
          handleAxisChange={handleRadar}
          labels={[jobCategory, "Feature 2", "Feature 3"]}
        />
      </div>
    </>
  );
}

export default Filter;
