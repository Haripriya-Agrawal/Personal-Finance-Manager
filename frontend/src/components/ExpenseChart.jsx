import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CategoryExpenseChart = ({ expenseData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#21E6C1' // Legend label color
        }
      },
      title: {
        display: true,
        text: 'Expenses by Category',
        color: '#21E6C1', // Title color
        font: {
          size: 16,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)',
          color: '#21E6C1' // Y-axis title color
        },
        ticks: {
          color: '#21E6C1' // Y-axis labels color
        },
        grid: {
          color: '#e5e5e5' // Y-axis grid lines color
        }
      },
      x: {
        ticks: {
          color: '#21E6C1' // X-axis labels color
        },
        grid: {
          color: '#808080' // X-axis grid lines color
        }
      }
    }
  };

  const data = {
    labels: ['Food', 'Travel', 'Shopping', 'Entertainment', 'Misc'],
    datasets: [
      {
        data: [230.50, 150.75, 498.50, 200.25, 120.00],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl p-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default CategoryExpenseChart;