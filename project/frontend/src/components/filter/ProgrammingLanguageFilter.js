import ProgrammingLanguageCheckboxes from "./ProgrammingLanguageCheckboxes";
import classes from "./ProgrammingLanguageFilter.module.css";

function ProgrammingLanguageFilter() {
  return (
    <div className={classes.programmingLanguageContainer}>
      <div className={classes.programmingLanguageHeaderContainer}>
        <h2>ProgrammingLanguage</h2>
      </div>
      <div className={classes.programmingLanguageList}>
        <ProgrammingLanguageCheckboxes />
      </div>
    </div>
  );
}

export default ProgrammingLanguageFilter;
