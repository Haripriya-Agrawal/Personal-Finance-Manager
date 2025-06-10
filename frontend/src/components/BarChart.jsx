import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "June", "July", "Aug",
    "Sept", "Oct", "Nov", "Dec"
  ];

  const aggregateByMonth = (items, type) => {
    const monthlyTotals = Array(12).fill(0);

    items.forEach((item) => {
      const rawDate = type === "transaction" ? item.date : item.startDate;
      const value = type === "transaction" ? item.amount : item.savedAmount;

      if (!rawDate || isNaN(new Date(rawDate))) return;

      const monthIndex = new Date(rawDate).getMonth();

      if (type === "transaction" && item.category !== "income") {
        monthlyTotals[monthIndex] += parseFloat(value || 0);
      }

      if (type === "saving") {
        monthlyTotals[monthIndex] += parseFloat(value || 0);
      }
    });

    return monthlyTotals;
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    try {
      const [txRes, savingRes] = await Promise.all([
        axios.get(`${process.env.base_backend_URL}/api/transaction`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.base_backend_URL}/api/savings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const expenses = aggregateByMonth(txRes.data, "transaction");
      const savings = aggregateByMonth(savingRes.data, "saving");

      setChartData({
        labels: months,
        datasets: [
          {
            label: "Savings",
            data: savings,
            backgroundColor: "#40A798",
            borderColor: "#388E3C",
            borderWidth: 1,
          },
          {
            label: "Expenses",
            data: expenses,
            backgroundColor: "#DF3554",
            borderColor: "#D32F2F",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#EFE3C2" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#EFE3C2" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#EFE3C2" },
        grid: { color: "#E0E0E0" },
      },
    },
  };

  if (!chartData) return <div style={{ color: "#EFE3C2" }}>Loading chart...</div>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
