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
        position: "right",
      },
      title: {
        display: true,
        text: "Comparison of Important Features",
      },
    },
  };

  const labels = ["Feature 1", "Feature 2", "Feature 3"];

  const data = {
    labels,
    datasets: [
      {
        label: "%",
        data: [props.feature_1, props.feature_2, props.feature_3],
        backgroundColor: "rgba(	45, 62, 255, 0.2)",
        borderColor: "rgba(	45, 62, 2552, 1)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default HorizontalBarChart;
