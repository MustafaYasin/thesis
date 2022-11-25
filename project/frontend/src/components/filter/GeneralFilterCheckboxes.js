import classes from "./GeneralFilterCheckboxes.module.css"

function GeneralFilterCheckboxes() {
  return (
    <div>
      <ul>
        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="isHireable"
            id="isHireable"
          />
          <label className={classes.label} htmlFor="isHireable">
            hireable
          </label>
        </li>
        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="githubStar"
            id="githubStar"
          />
          <label className={classes.label} htmlFor="githubStar">
            githubStar
          </label>
        </li>
        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="campusExpert"
            id="campusExpert"
          />
          <label className={classes.label} htmlFor="campusExpert">
            campusExpert
          </label>
        </li>
        <li className={classes.generalListItem}>
          <input
            className={classes.checkbox}
            type="checkbox"
            name="developerProgramMember"
            id="developerProgramMember"
          />
          <label className={classes.label} htmlFor="developerProgramMember">
            developerProgramMember
          </label>
        </li>
      </ul>
    </div>
  );
}

export default GeneralFilterCheckboxes;