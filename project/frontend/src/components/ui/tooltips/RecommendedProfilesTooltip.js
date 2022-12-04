import classes from "./RecommendedProfilesTooltip.module.css";

function RecommendedProfilesTooltip() {
  return (
    <div className={classes.tooltipContainer}>
      <div className={classes.tooltipHeader}>Why do I see these people?</div>
      <div className={classes.tooltipBody}>
        These Profiles are crawled from Github. Based on your their Projects and
        individual Commits, they are rated by the 3 Features you see on the
        left. You can adjust the weight of those by using the Sliders on the
        left side of the screen.
      </div>
    </div>
  );
}

export default RecommendedProfilesTooltip;
