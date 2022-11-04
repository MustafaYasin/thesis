import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Gauge(props) {
  const score = props.recommendations;
  const value = (score *10).toFixed(1);

  //function for color calculation
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;
    //return csl color string
    return "hsl(" + c + ",100%,50%)";
  };

  return (
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      circleRatio={0.7}
      styles={{
        trail: {
          strokeLinecap: "butt",
          transform: "rotate(-126deg)",
          transformOrigin: "center center",
        },
        path: {
          strokeLinecap: "butt",
          transform: "rotate(-126deg)",
          transformOrigin: "center center",
          stroke: calcColor(value, 0, 120),
        },
        text: {
          fill: "#2c292b",
        },
      }}
      strokeWidth={10}
    />
  );
}

export default Gauge;
