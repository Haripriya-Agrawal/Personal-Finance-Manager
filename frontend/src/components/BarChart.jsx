import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Months
    datasets: [
      {
        label: 'Income',
        data: [5000, 6000, 7000, 8000, 7500, 8500, 9000], // Income data
        backgroundColor: '#40A798', // Green
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: [3000, 4000, 4500, 5000, 4800, 5500, 6000], // Expense data
        backgroundColor: '#DF3554', // Red
        borderColor: '#D32F2F',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#EFE3C2', // Legend text color
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#EFE3C2', // X-axis label color
        },
        grid: {
          display: false, // Hide grid lines on X-axis
        },
      },
      y: {
        ticks: {
          color: '#EFE3C2', // Y-axis label color
        },
        grid: {
          color: '#E0E0E0', // Light gray grid lines on Y-axis
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
