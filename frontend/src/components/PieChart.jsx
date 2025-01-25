import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Food', 'Travel', 'Rent', 'Misc', 'Lifestyle'],
    datasets: [
      {
        data: [5, 5, 10, 2, 4],
        backgroundColor: ['#73BBA3', '#88D66C', '#B4E380', '#F6FB7A', '#BFF6C3'],
        borderColor: 'transparent',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true, // Ensures the chart scales with the container
    maintainAspectRatio: false, // Disables the fixed aspect ratio
    plugins: {
      legend: {
        labels: {
          color: '#EFE3C2',
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
