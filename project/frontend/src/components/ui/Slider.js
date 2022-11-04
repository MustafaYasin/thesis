import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function Slider() {
    function inputHandler(event){
        const rangeValue=event[1];
        console.log(rangeValue)
    }

  return <RangeSlider thumbsDisabled={[true,false]} onInput={inputHandler} />;
}

export default Slider;
