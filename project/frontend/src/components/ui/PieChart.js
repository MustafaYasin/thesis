import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart(props) {
    var sliderSum=props.slider1Factor+props.slider2Factor+props.slider3Factor
    const data = {
        labels: ['Feature 1', 'Feature 2', 'Feature 3'],
        datasets: [
          {
            label: 'Features',
            data: [props.slider1Factor,props.slider2Factor,props.slider3Factor],
            backgroundColor: [
                "rgba(0,100,0, 1)",
                "rgba(72,61,139, 1)",
                "rgba(184,134,11, 1)",

              ],
            borderColor: [
                "rgba(0,100,0, 1)",
                "rgba(72,61,139, 1)",
                "rgba(184,134,11, 1)",

              ],
            borderWidth: 1,
          },
        ],
      };
      const options ={
        rotation: -(props.slider1Factor/sliderSum*180),
        plugins: {
            legend: {
              display: false,
            },}
     }

  return <Pie options={options} data={data} />;
}

export default PieChart;