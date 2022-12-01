import classes from "./Filter2.module.css";
import { useState } from "react";
import RadarChart from "./RadarChart";
import jobs from "../layout/JobCategories";
import GeneralFilter from "./GeneralFilter";
import ProgrammingLanguageFilter from "./ProgrammingLanguageFilter";
import FilterHeader from "./FilterHeader";
import PieChart from "../ui/PieChart";
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
    calcRadar(1, 1, 1);
    const sorted = [...props.allProfiles].sort(
      (a, b) => b.recommendations - a.recommendations
    );
    props.setFilteredProfiles(sorted);
  }, []);

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

  function handleRadar(axis1, axis2, axis3) {
    //console.log(axis1, axis2, axis3);
    setFeature1Factor(axis1);
    setFeature2Factor(axis2);
    setFeature3Factor(axis3);
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
        <div className={classes.mixedChartContainer}>
          <div className={classes.radarChart}>
            <RadarChart
              axis1={feature1Factor}
              axis2={feature2Factor}
              axis3={feature3Factor}
              handleAxisChange={handleRadar}
              labels={[jobCategory, "Feature 2", "Feature 3"]}
            />
          </div>
          <div className={classes.pieChartContainer}>
            <PieChart
              feature1Factor={feature1Factor}
              feature2Factor={feature3Factor}
              feature3Factor={feature2Factor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
