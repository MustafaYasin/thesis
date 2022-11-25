import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function VerticalBarChart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Feature Comparison of Favorites",
      },
      options: {
        plugins: {
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
    },
  };

  const labels = ["Feature 1", "Feature 2", "Feature 3"];

  const data = {
    labels,
    datasets: [
      {
        label: props.names[0],
        data: props.data[0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: props.names[1],
        data: props.data[1],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: props.names[2],
        data: props.data[2],
        backgroundColor: "lightgreen",
      },
      {
        label: props.names[3],
        data: props.data[3],
        backgroundColor: "rgba(235, 52, 225,0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
export default VerticalBarChart;
