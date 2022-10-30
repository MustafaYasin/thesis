import classes from "./Filter.module.css";
import { useState } from "react";

function Filter(props) {
  const [allPressed, setAllPressed] = useState(true);
  const [hirePressed, setHirePressed] = useState(false);

  function clickHireableHandler() {
    const filtered = props.allProfiles.filter(
      (profile) => profile.Hireable === true
    );
    props.setFilteredProfiles(filtered);
    setAllPressed(false);
    setHirePressed(true);
  }

  function clickAllHandler() {
    props.setFilteredProfiles(props.allProfiles);
    setAllPressed(true);
    setHirePressed(false);
  }
  function hireableHandler() {
    if (hirePressed) {
      props.setFilteredProfiles(props.allProfiles);
      setHirePressed(false);
    } else {
      const filtered = props.allProfiles.filter(
        (profile) => profile.Hireable === true
      );
      props.setFilteredProfiles(filtered);
      setAllPressed(false);
      setHirePressed(true);
    }
  }
  // list mit allen filtern --> funktion mit for Filter in filter alles filter --> 1 Fkt fuer alle Filter

  return (
    <div className={classes.filter}>
      <p>Ich bin der Filteraaaaaaaaaaaaaaaa</p>
      <div>
        <button
          className={allPressed ? classes.active : ""}
          onClick={clickAllHandler}
        >
          All
        </button>
      </div>
      <div>
        <button
          className={hirePressed ? classes.active : ""}
          onClick={clickHireableHandler}
        >
          hireable
        </button>
      </div>
      <ul>
        <li>
          <input
            type="checkbox"
            id="vehicle1"
            name="hireable"
            value={hirePressed}
            onChange={hireableHandler}
            className={classes.largerCheckbox}
          />
          <label for="hireable"> Hireable</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="vehicle2"
            name="vehicle2"
            value="Car"
            className={classes.largerCheckbox}
          />
          <label for="vehicle2"> I have a car</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="vehicle3"
            name="vehicle3"
            value="Boat"
            className={classes.largerCheckbox}
          />
          <label for="vehicle3"> I have a boat</label>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
