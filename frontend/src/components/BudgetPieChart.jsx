import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPieChart = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("❌ User token not found in local storage.");
          return;
        }

        const response = await axios.get(`${process.env.base_backend_URL}/api/budget`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Budget Data:", response.data);
        setBudgets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching budgets:", error);
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const categoryData = budgets.reduce((acc, { category, targetAmount }) => {
    acc[category] = (acc[category] || 0) + targetAmount;
    return acc;
  }, {});

  const labels = Object.keys(categoryData);
  const values = Object.values(categoryData);
  const colors = ["#73BBA3", "#88D66C", "#B4E380", "#F6FB7A", "#BFF6C3"];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: "transparent",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#EFE3C2",
        },
      },
    },
  };

  if (loading) return <p>Loading chart...</p>;
  if (labels.length === 0) return <p>No budgets to display.</p>;

  return (
    <div className="h-full w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default BudgetPieChart;
