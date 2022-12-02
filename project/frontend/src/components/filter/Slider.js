import classes from "./Slider.module.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import DataScientistScoreTooltip from "../ui/tooltips/DataScientistScoreTooltip";

function Slider(props) {
  const [sliderValue, setSliderValue] = [
    props.featureValue,
    props.setFeatureValue,
  ];

  //   function handleSlider(event) {
  //     setSliderValue(event.target.value);
  //   }

  return (
    <div className={classes.sliderElement}>
      <div className={classes.wrapper}>
        <header>
          <Tippy className={classes.tooltip}
            content={<DataScientistScoreTooltip color={props.color} feature={props.feature}></DataScientistScoreTooltip>}
            delay={100}
            placement="right"
          >
            <h2>{props.feature} Score</h2>
          </Tippy>
          <p>Use the Slider to adjust the Featureweight</p>

          {props.text ? (
            <p>{props.text}</p>
          ) : (
            <p>This feature's weight is currently</p>
          )}
        </header>
        <div className={classes.priceInput}>
          <div className={classes.field}>
            Faktor
            <span className={classes.faktor}>{sliderValue} x</span> Fold
          </div>
        </div>
        <div
          className={classes.slider}
          style={{ backgroundColor: props.color }}
        >
          <div
            className={classes.progress}
            style={{ backgroundColor: props.color }}
          ></div>
        </div>
        <div className={classes.rangeInput}>
          <input
            type="range"
            className={classes.rangeMin}
            min={0}
            max={1}
            step={0.1}
            value={sliderValue}
            onChange={props.handleSlider}
          />
        </div>
      </div>
    </div>
  );
}

export default Slider;
