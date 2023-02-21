import classes from "./RecommendedProfilesTooltip.module.css";

function RecommendedProfilesTooltip(props) {
  return (
    <div className={classes.tooltipContainer}>
      <div className={classes.tooltipHeader}>{props.header}</div>
      <div className={classes.tooltipBody}>
        {props.text}
      </div>
    </div>
  );
}

export default RecommendedProfilesTooltip;
