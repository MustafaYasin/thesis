import classes from "./Slider.module.css";

function Slider(props) {
  const [sliderValue, setSliderValue] = [props.featureValue,props.setFeatureValue];

//   function handleSlider(event) {
//     setSliderValue(event.target.value);
//   }

  return (
    <div className={classes.sliderElement}>
      <div className={classes.wrapper}>
        <header>
          <h2>{props.feature} Score</h2>
          <p>This feature's weight is currently</p>
        </header>
        <div className={classes.priceInput}>
          <div className={classes.field}>
            Faktor
            <span className={classes.faktor}>{sliderValue} x</span> Fold
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
            max={2}
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
