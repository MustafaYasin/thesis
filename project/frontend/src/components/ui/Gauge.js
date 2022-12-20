import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./Gauge.module.css";

function Gauge(props) {
  const score = props.recommendations;
  const value = (score * 100).toFixed(1);
  const gaugeRatio = 0.7;
  var sliderSum =
    parseFloat(props.feature1Factor) +
    parseFloat(props.feature2Factor) +
    parseFloat(props.feature3Factor);
  var featureSum = (
    parseFloat(props.feature1Factor) * props.feature_1 +
    parseFloat(props.feature2Factor) * props.feature_2 +
    parseFloat(props.feature3Factor) * props.feature_3
  ).toFixed(2);

  function calcTransform() {
    const rotation =
      -126 + gaugeRatio * (props.feature1Factor / sliderSum) *  360;
    return "rotate(" + rotation + "deg)";
  }
  function calcTransform2() {
    const rotation =
      -126 +
      gaugeRatio * (props.feature1Factor / sliderSum) *  360 +
      gaugeRatio * (props.feature2Factor / sliderSum) *  360;
    return "rotate(" + rotation + "deg)";
  }

  return (
    <div className={classes.gaugeContainer}>
      <div className={classes.gauge}>
        <CircularProgressbar
          value={(props.feature_1 * 100).toFixed(1)}
          text={`${value}%`}
          circleRatio={gaugeRatio * (props.feature1Factor / sliderSum)}
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              // -126 for 1/3 rd alignment
              transformOrigin: "center center",
              stroke: "darkgreen",
              opacity: 0.5
            },
            path: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",

              transformOrigin: "center center",
              // stroke: calcColor(value, 0, 120),
              stroke: "darkgreen",
            },
            text: {
              fill: "#2c292b",
            },
          }}
          strokeWidth={10}
        />
      </div>
      <div className={classes.gauge}>
        <CircularProgressbar
          value={(props.feature_2 * 100).toFixed(1)}
          circleRatio={gaugeRatio * (props.feature2Factor / sliderSum)}
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: calcTransform(),
              transformOrigin: "center center",
              stroke: "darkgoldenrod",
              opacity: 0.5
            },
            path: {
              strokeLinecap: "butt",
              transform: calcTransform(),
              transformOrigin: "center center",
              stroke: "darkgoldenrod",
            },
            text: {
              fill: "#2c292b",
            },
          }}
          strokeWidth={10}
        />
      </div>
      <div className={classes.gauge}>
        <CircularProgressbar
          value={(props.feature_3 * 100).toFixed(1)}
          circleRatio={gaugeRatio * (props.feature3Factor / sliderSum)}
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: calcTransform2(),
              transformOrigin: "center center",
              stroke: "darkslateblue",
              opacity: 0.5

            },
            path: {
              strokeLinecap: "butt",
              transform: calcTransform2(),
              transformOrigin: "center center",
              stroke: "darkslateblue",
            },
            text: {
              fill: "#2c292b",
            },
          }}
          strokeWidth={10}
        />
      </div>
    </div>
  );
}

export default Gauge;
