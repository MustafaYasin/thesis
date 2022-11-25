import React from "react";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import "chartjs-plugin-dragdata";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
function RadarChart(props) {
  const [shouldRedraw] = useState(false);
  const [axis1, setAxis1] = useState(1);
  const [axis2, setAxis2] = useState(1);
  const [axis3, setAxis3] = useState(1);
  var x = 1;
  var y = 1;
  var z = 1;
  //  Build Data Set for the Bar Chart
  const buildDataSet = (data) => {

    let options = {
      type: "radar",
      data: {
        labels: props.labels,
        datasets: [
          {
            label:'test',
            data: [axis1, axis2, axis3],
            backgroundColor: "rgba(	45, 45, 45, 0.2)",
            borderColor: "rgba(	45, 45, 45, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          r: {
            max: 2,
            min: 0,
            stepSize: 0.1,
            pointLabels: {
              font: {
                size: 18
              }
            }
          },
        },
        onHover: function (e) {
          const point = e.chart.getElementsAtEventForMode(
            e,
            "nearest",
            { intersect: true },
            false
          );
          if (point.length) e.native.target.style.cursor = "grab";
          else e.native.target.style.cursor = "default";
        },
        plugins: {
          dragData: {
            round: 1,
            showTooltip: true,
            onDragStart: function (e, element) {
              console.log("On Drag Start ", element);
            },
            // Change while dragging
            onDrag: function (e, datasetIndex, index, value) {
              e.target.style.cursor = "grabbing";
              // console.log("On Dragging ", datasetIndex, index, value);
              if (index === 0) {
                x = value;
                setAxis1(value);
              }
              if (index === 1) {
                y = value;
                setAxis2(value);
              }
              if (index === 2) {
                z = value;
                setAxis3(value);
              }
              props.handleAxisChange(x, z, y);
              // if(datasetIndex == 1) {
              //   data[index].bValue = value
              // }

              // props.onHandleChange(data);
            },
            // Only change when finished dragging
            onDragEnd: function (e, datasetIndex, index, value) {
              // console.log('On Drag End ', datasetIndex, index, value)
              e.target.style.cursor = "default";

              //   if (datasetIndex == 0) {
              //     data[index].aValue = value;
              //   }

              //   if (datasetIndex == 1) {
              //     data[index].bValue = value;
              //   }

              //   props.onHandleChange(data);
            },
          },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 24,
              },
            },
          },
        },
      },
    };

    return options;
  };

  let localOption = buildDataSet();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 200);
  // }, []);

  return (
    <div>
      {
        <Radar
          redraw={shouldRedraw}
          data={localOption.data}
          options={localOption.options}
          plugins={localOption.plugins}
        />
      }
    </div>
  );
}

export default RadarChart;
