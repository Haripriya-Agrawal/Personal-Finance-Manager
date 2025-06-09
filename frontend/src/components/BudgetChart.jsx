// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BudgetChart = () => {
//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
//     datasets: [
//       {
//         label: "Essential Expenses",
//         data: [2000, 1800, 2200, 1900, 2100, 2000, 2300, 2400, 2100, 2200],
//         backgroundColor: "#73BBA3",
//       },
//       {
//         label: "Savings",
//         data: [1200, 1300, 1100, 1400, 1500, 1200, 1400, 1300, 1250, 1350],
//         backgroundColor: "#88D66C",
//       },
//       {
//         label: "Discretionary Spending",
//         data: [500, 600, 700, 550, 650, 400, 500, 600, 700, 800],
//         backgroundColor: "#F6FB7A",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       tooltip: { enabled: true },
//     },
//     scales: {
//       x: { stacked: true },
//       y: { stacked: true },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export default BudgetChart;
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

const BudgetChart = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const budgetRes = await fetch("http://localhost:5000/api/budget", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const budgetData = await budgetRes.json();

        const transactionRes = await fetch("http://localhost:5000/api/transaction", {
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

  // Extract all months from budgets and transactions combined for x-axis labels
  const allMonthsSet = new Set();

  budgets.forEach(({ startDate, endDate }) => {
    // assuming startDate & endDate are ISO strings
    const startMonth = moment(startDate).startOf("month");
    const endMonth = moment(endDate).startOf("month");

    // Add all months between start and end month inclusive
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

  // Calculate total budget per month
  const budgetPerMonth = {};
  allMonths.forEach((month) => {
    budgetPerMonth[month] = 0;
  });

  budgets.forEach(({ startDate, endDate, targetAmount }) => {
    const startMonth = moment(startDate).startOf("month");
    const endMonth = moment(endDate).startOf("month");
    const monthsCount = endMonth.diff(startMonth, "months") + 1;
    // Spread targetAmount equally across months (simple approach)
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

  // Calculate total transactions spent per month
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

  // Prepare data arrays for chart
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
        backgroundColor: "#F87171", // red-ish for spent
      },
      {
        label: "Remaining Budget",
        data: remainingData,
        backgroundColor: "#34D399", // green-ish for remaining
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#374151" } }, // keep your default colors if you want
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
