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

function HorizontalBarChart(props) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Comparison of Features",
      },
    },
  };

  const labels = ["Category Score", "Activity", "Experience"];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [props.feature_1, props.feature_2, props.feature_3],
        backgroundColor: [
          "rgba(0,100,0, 1)",
          "rgba(184,134,11, 1)",
          "rgba(72,61,139, 1)",
        ],
        borderColor: [
          "rgba(0,100,0, 1)",
          "rgba(184,134, 1)",
          "rgba(72,61,139, 1)",
        ],
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default HorizontalBarChart;
