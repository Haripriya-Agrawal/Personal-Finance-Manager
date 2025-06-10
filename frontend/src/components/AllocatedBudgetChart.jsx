import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const AllocatedBudgetChart = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User token not found");
          setLoading(false);
          return;
        }

        const response = await fetch(`${backendUrl}/api/budget`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch budgets");

        const data = await response.json();
        setBudgets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (!budgets.length) return <p>No budgets to display.</p>;

  const categories = Array.from(new Set(budgets.map((b) => b.category)));

  const allMonthsSet = new Set();
  budgets.forEach(({ startDate, endDate }) => {
    const start = moment(startDate).startOf("month");
    const end = moment(endDate).startOf("month");
    let current = start.clone();
    while (current.isSameOrBefore(end)) {
      allMonthsSet.add(current.format("YYYY-MM"));
      current.add(1, "month");
    }
  });
  const allMonths = Array.from(allMonthsSet).sort();

  const budgetPerMonthCategory = {};
  allMonths.forEach((month) => {
    budgetPerMonthCategory[month] = {};
    categories.forEach((cat) => {
      budgetPerMonthCategory[month][cat] = 0;
    });
  });

  budgets.forEach(({ startDate, endDate, targetAmount, category }) => {
    const start = moment(startDate).startOf("month");
    const end = moment(endDate).startOf("month");
    const monthsCount = end.diff(start, "months") + 1;
    const monthlyBudget = targetAmount / monthsCount;
    let current = start.clone();

    while (current.isSameOrBefore(end)) {
      const month = current.format("YYYY-MM");
      if (budgetPerMonthCategory[month]) {
        budgetPerMonthCategory[month][category] += monthlyBudget;
      }
      current.add(1, "month");
    }
  });

  const colors = ["#73BBA3", "#88D66C", "#B4E380", "#F6FB7A", "#BFF6C3"];

  const data = {
    labels: allMonths.map((m) => moment(m).format("MMM YYYY")),
    datasets: categories.map((cat, i) => ({
      label: cat,
      data: allMonths.map((month) => budgetPerMonthCategory[month][cat] || 0),
      backgroundColor: colors[i % colors.length],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div className="h-full w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AllocatedBudgetChart;
