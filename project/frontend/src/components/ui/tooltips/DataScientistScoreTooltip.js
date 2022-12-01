import classes from "./DataScientistScoreTooltip.module.css";

function DataScientistScoreTooltip(props) {
  return (
    <div className={classes.tooltipContainer}>
      <div className={classes.tooltipHeader} style={{ color: props.color }}>
        What is the {props.feature} Score?
      </div>
      <div className={classes.tooltipBody} style={{ color: props.color }}>
        The score is calculated by looking at the different repositories of the
        Github user. The readmes are fed into an intelligent recommender system
        that checks how many projects the user has contributed to in the field
        of data science.
      </div>
    </div>
  );
}

export default DataScientistScoreTooltip;
