
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Bar } from "react-chartjs-2";
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
const BudgetChart = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const budgetRes = await fetch(`${backendUrl}/api/budget`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const budgetData = await budgetRes.json();

        const transactionRes = await fetch(`${backendUrl}/api/transaction`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const transactionData = await transactionRes.json();

        setBudgets(budgetData);
        setTransactions(transactionData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading chart...</p>;

  const allMonthsSet = new Set();

  budgets.forEach(({ startDate, endDate }) => {
    const startMonth = moment(startDate).startOf("month");
    const endMonth = moment(endDate).startOf("month");

    let current = startMonth.clone();
    while (current.isSameOrBefore(endMonth)) {
      allMonthsSet.add(current.format("YYYY-MM"));
      current.add(1, "month");
    }
  });

  transactions.forEach(({ date }) => {
    allMonthsSet.add(moment(date).format("YYYY-MM"));
  });

  const allMonths = Array.from(allMonthsSet).sort();

  const budgetPerMonth = {};
  allMonths.forEach((month) => {
    budgetPerMonth[month] = 0;
  });

  budgets.forEach(({ startDate, endDate, targetAmount }) => {
    const startMonth = moment(startDate).startOf("month");
    const endMonth = moment(endDate).startOf("month");
    const monthsCount = endMonth.diff(startMonth, "months") + 1;
    const monthlyBudget = targetAmount / monthsCount;

    let current = startMonth.clone();
    while (current.isSameOrBefore(endMonth)) {
      const m = current.format("YYYY-MM");
      if (budgetPerMonth[m] !== undefined) {
        budgetPerMonth[m] += monthlyBudget;
      }
      current.add(1, "month");
    }
  });

  const spentPerMonth = {};
  allMonths.forEach((month) => {
    spentPerMonth[month] = 0;
  });

  transactions.forEach(({ date, amount }) => {
    const m = moment(date).format("YYYY-MM");
    if (spentPerMonth[m] !== undefined) {
      spentPerMonth[m] += amount;
    }
  });

  const labels = allMonths.map((m) => moment(m).format("MMM YYYY"));

  const spentData = allMonths.map((m) => spentPerMonth[m] || 0);
  const remainingData = allMonths.map((m) => {
    const remain = budgetPerMonth[m] - spentPerMonth[m];
    return remain > 0 ? remain : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Spent",
        data: spentData,
        backgroundColor: "#F87171", 
      },
      {
        label: "Remaining Budget",
        data: remainingData,
        backgroundColor: "#34D399", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#374151" } }, 
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

export default BudgetChart;
