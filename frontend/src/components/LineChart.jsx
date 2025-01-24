import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Replace with your months or time periods
    datasets: [
      {
        label: "Cumulative Spending",
        data: [100, 250, 400, 600, 900, 1200, 1500], // Example data
        borderColor: "#4F46E5", // Tailwind indigo-600
        backgroundColor: "rgba(79, 70, 229, 0.2)", // Transparent indigo
        tension: 0.4, // Smooth curve
        fill: true, // Fills area under the curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#1E293B", // Tailwind slate-800 for labels
        },
      },
      title: {
        display: true,
        text: "Cumulative Spending Over Time",
        color: "#1E293B",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#1E293B", // Tailwind slate-800 for x-axis ticks
        },
        grid: {
          display: false, // Hide x-axis gridlines
        },
      },
      y: {
        ticks: {
          color: "#1E293B", // Tailwind slate-800 for y-axis ticks
        },
        grid: {
          color: "#E5E7EB", // Tailwind gray-300 for gridlines
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
