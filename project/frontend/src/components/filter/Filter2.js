import classes from "./Filter.module.css";
import { useState } from "react";
import RadarChart from "./RadarChart";
import jobs from "../layout/JobCategories";
import GeneralFilter from "./GeneralFilter";
import ProgrammingLanguageFilter from "./ProgrammingLanguageFilter";
import FilterHeader from "./FilterHeader";
import PieChart from "../ui/PieChart";

function Filter(props) {
  const [slider1Factor, setSlider1Factor] = [
    props.slider1Factor,
    props.setSlider1Factor,
  ];
  const [slider2Factor, setSlider2Factor] = [
    props.slider2Factor,
    props.setSlider2Factor,
  ];
  const [slider3Factor, setSlider3Factor] = [
    props.slider3Factor,
    props.setSlider3Factor,
  ];

  const [jobCategory, setJobCategory] = useState(jobs.dataScience);

  function calcRadar(slider1Factor, slider2Factor, slider3Factor) {
    const len = props.allProfiles.length;
    for (let i = 0; i < len; i++) {
      props.allProfiles[i].recommendations =
        (slider1Factor * props.allProfiles[i].feature_1 +
          slider2Factor * props.allProfiles[i].feature_2 +
          slider3Factor * props.allProfiles[i].feature_3) /
        (slider1Factor * 1.0 + slider2Factor * 1.0 + slider3Factor * 1.0);
    }
  }

  function handleRadar(axis1, axis2, axis3) {
    //console.log(axis1, axis2, axis3);
    setSlider1Factor(axis1);
    setSlider2Factor(axis2);
    setSlider3Factor(axis3);
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
          axis1={slider1Factor}
          axis2={slider2Factor}
          axis3={slider3Factor}
          handleAxisChange={handleRadar}
          labels={[jobCategory, "Feature 2", "Feature 3"]}
        />
      </div>
      <div className={classes.pieChartContainer}>
        <PieChart
          slider1Factor={slider1Factor}
          slider2Factor={slider3Factor}
          slider3Factor={slider2Factor}
        />
      </div>
    </>
  );
}

export default Filter;
