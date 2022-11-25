import classes from "./ProgrammingLanguageCheckboxes.module.css";

function ProgrammingLanguageCheckboxes() {
  return (
    <div>
      <ul>
        <li className={classes.generalListItem}>
          <input className={classes.checkbox} type="checkbox" name="r" id="r" />
          <label className={classes.label} htmlFor="r">
            R
          </label>
        </li>
        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="c++"
            id="c++"
          />
          <label className={classes.label} htmlFor="c++">
            C++
          </label>
        </li>
        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="java"
            id="java"
          />
          <label className={classes.label} htmlFor="java">
            Java
          </label>
        </li>
        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="python"
            id="python"
          />
          <label className={classes.label} htmlFor="python">
            Python
          </label>
        </li>

        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="javascript"
            id="javascript"
          />
          <label className={classes.label} htmlFor="javascript">
            Javascript
          </label>
        </li>
      </ul>
    </div>
  );
}

export default ProgrammingLanguageCheckboxes;
