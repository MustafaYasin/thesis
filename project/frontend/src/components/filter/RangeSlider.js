import classes from "./RangeSlider.module.css";
import { useState } from "react";
import { useRef } from "react";

function RangeSlider() {
  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);
  const refProgress = useRef(null);

  const handleMinChange = (event) => {
    setMinValue(event.target.value);
    refProgress.current.style.left = event.target.value + "%";
  };

  const handleMaxChange = (event) => {
    setMaxValue(event.target.value);
    refProgress.current.style.right = 100 - event.target.value + "%";
  };

  return (
    <div className={classes.rangeSlider}>
      <div className={classes.wrapper}>
        <header>
          <h2>Repo Range</h2>
          <p>Use slider or enter min and max Repo count</p>
        </header>
        <div className={classes.priceInput}>
          <div className={classes.field}>
            <span>Min</span>
            <input
              type="number"
              name="input-min"
              id="input-min"
              value={minValue}
              onChange={handleMinChange}
            />
          </div>
          <div className={classes.seperator}>-</div>
          <div className={classes.field}>
            <span>Max</span>
            <input
              type="number"
              name="input-max"
              id="input-max"
              value={maxValue}
              onChange={handleMaxChange}
            />
          </div>
        </div>
        <div className={classes.slider}>
          <div className={classes.progress} ref={refProgress}></div>
        </div>
        <div className={classes.rangeInput}>
          <input
            type="range"
            className={classes.rangeMin}
            min={0}
            max={99}
            value={minValue}
            onChange={handleMinChange}
          />
          <input
            type="range"
            className={classes.rangeMax}
            min={1}
            max={100}
            value={maxValue}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
