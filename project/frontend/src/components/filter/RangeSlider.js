import classes from "./RangeSlider.module.css";

function RangeSlider() {
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
            <input type="number" name="input-min" id="input-min" value="25" />
          </div>
          <div className={classes.seperator}>-</div>
          <div className={classes.field}>
            <span>Max</span>
            <input type="number" name="input-max" id="input-max" value="75" />
          </div>
        </div>
        <div className={classes.slider}>
          <div className={classes.progress}></div>
        </div>
        <div className={classes.rangeInput}>
          <input
            type="range"
            className={classes.rangeMin}
            min={0}
            max={100}
            defaultValue={25}
          />
          <input
            type="range"
            className={classes.rangeMax}
            min={0}
            max={100}
            defaultValue={75}
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
