import React, { useEffect, useState } from "react";
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
const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: monthNames,
    datasets: [
      {
        label: "Cumulative Spending",
        data: new Array(12).fill(0),
        borderColor: "#21E6C1",
        backgroundColor: "greenMedium",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/api/transaction`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transactions = await res.json();
        if (!Array.isArray(transactions)) return;

        const monthlyTotals = new Array(12).fill(0);

        transactions.forEach((t) => {
          const date = new Date(t.date);
          const month = date.getMonth(); 
          monthlyTotals[month] += t.amount;
        });

        setChartData({
          labels: monthNames,
          datasets: [
            {
              label: "Cumulative Spending",
              data: monthlyTotals,
              borderColor: "#21E6C1",
              backgroundColor: "greenMedium",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error("Error loading chart data", err);
      }
    };

    fetchData();
  }, []);

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#21E6C1",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#21E6C1" },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#21E6C1",
        callback: (value) => `₹${value}`, // Add currency symbol
      },
      grid: { color: "#21E6C1" },
    },
  },
};


  return (
    <div className="p-4 bg-none rounded">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
