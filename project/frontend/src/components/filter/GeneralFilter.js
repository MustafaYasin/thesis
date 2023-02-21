import classes from "./GeneralFilter.module.css"
import GeneralFilterCheckboxes from "./GeneralFilterCheckboxes";

function GeneralFilter() {
  return (
    <div className={classes.generalContainer}>
      <div className={classes.generalHeaderContainer}>
        <h2>General </h2>
      </div>
      <div className={classes.generalList}>
        <GeneralFilterCheckboxes />
      </div>
    </div>
  );
}

export default GeneralFilter;
