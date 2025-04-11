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
import { fetchChartData } from "../services/barChartData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const aggregateByMonth = (data, key, dateKey) => {
    const monthlyTotals = Array(12).fill(0);
    data.forEach((item) => {
      const rawDate = item[dateKey];
      if (!rawDate || isNaN(new Date(rawDate))) return;

      const monthIndex = new Date(rawDate).getMonth();
      const value = parseFloat(item[key]) || 0;
      monthlyTotals[monthIndex] += value;
    });
    return monthlyTotals;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadData = async () => {
      try {
        const { savings, expenses } = await fetchChartData(token);
        console.log("Fetched savings:", savings);
        console.log("Fetched expenses:", expenses);

        const savingsData = aggregateByMonth(savings, "savedAmount", "startDate");
        const expenseData = aggregateByMonth(expenses, "amount", "date");

        console.log("Monthly savings:", savingsData);
        console.log("Monthly expenses:", expenseData);

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Savings",
              data: savingsData,
              backgroundColor: "#40A798",
              borderColor: "#388E3C",
              borderWidth: 1,
            },
            {
              label: "Expenses",
              data: expenseData,
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

    loadData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#EFE3C2",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#EFE3C2",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#EFE3C2",
        },
        grid: {
          color: "#E0E0E0",
        },
      },
    },
  };

  if (!chartData) return <div style={{ color: "#EFE3C2" }}>Loading...</div>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
