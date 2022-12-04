import classes from "./DataScientistScoreTooltip.module.css";

function DataScientistScoreTooltip(props) {
  return (
    <div className={classes.tooltipContainer}>
      <div className={classes.tooltipHeader} style={{ color: props.color }}>
        What is the {props.feature} Score?
      </div>
      <div className={classes.tooltipBody} style={{ color: props.color }}>
        {props.featureTooltipText}
      </div>
    </div>
  );
}

export default DataScientistScoreTooltip;
