import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import classes from "./Gauge.module.css";

function Gauge(props) {
  const score = props.recommendations;
  const value = (score * 100).toFixed(1);
  const gaugeRatio = 0.7;
  var sliderSum =
    parseFloat(props.slider1Factor) +
    parseFloat(props.slider2Factor) +
    parseFloat(props.slider3Factor);
  var featureSum = (
    parseFloat(props.slider1Factor) * props.feature_1 +
    parseFloat(props.slider2Factor) * props.feature_2 +
    parseFloat(props.slider3Factor) * props.feature_3
  ).toFixed(2);

  function calcTransform() {
    const rotation =
      -126 + gaugeRatio * (props.slider1Factor / sliderSum) *  360;
    return "rotate(" + rotation + "deg)";
  }
  function calcTransform2() {
    const rotation =
      -126 +
      gaugeRatio * (props.slider1Factor / sliderSum) *  360 +
      gaugeRatio * (props.slider2Factor / sliderSum) *  360;
    return "rotate(" + rotation + "deg)";
  }

  return (
    <div className={classes.gaugeContainer}>
      <div className={classes.gauge}>
        <CircularProgressbar
          value={(props.recommendations * 100).toFixed(1)}
          text={`${value}%`}
          circleRatio={gaugeRatio * (props.slider1Factor / sliderSum)}
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              // -126 for 1/3 rd alignment
              transformOrigin: "center center",
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
          value={(props.recommendations * 100).toFixed(1)}
          circleRatio={gaugeRatio * (props.slider2Factor / sliderSum)}
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: calcTransform(),
              transformOrigin: "center center",
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
          value={(props.recommendations * 100).toFixed(1)}
          circleRatio={gaugeRatio * (props.slider3Factor / sliderSum)}
          styles={{
            trail: {
              strokeLinecap: "butt",
              transform: calcTransform2(),
              transformOrigin: "center center",
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
