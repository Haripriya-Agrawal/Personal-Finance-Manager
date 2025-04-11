import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LineChart from "../components/LineChart";
import BudgetChart from "../components/BudgetChart";
import PieChart from "../components/PieChart";

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [budgetId, setBudgetId] = useState(null);
  const [formData, setFormData] = useState({
    targetAmount: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/budget", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({ targetAmount: "", category: "", startDate: "", endDate: "" });
        fetchBudgets();
      } else {
        alert(data.message || "Failed to add budget.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditBudget = async (e) => {
    e.preventDefault();
    if (!budgetId) {
      alert("Select a budget to edit.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/budget/${budgetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setBudgetId(null);
        setFormData({ targetAmount: "", category: "", startDate: "", endDate: "" });
        fetchBudgets();
      } else {
        alert(data.message || "Failed to update budget.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-greenDeep p-4 sm:p-8">
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* Left Section */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3">
          {/* Add/Edit Budget */}
          <div className="bg-greenMedium bg-opacity-30 p-6 rounded-lg">
            <h1 className="text-xl text-text font-semibold mb-3">Add-Edit Budget</h1>
            <form className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  name="targetAmount"
                  placeholder="Budget amount"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400"
                />
                <select
                  name="category"
                  className="w-full p-2 rounded-lg bg-greenDeep bg-opacity-30 text-text"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  onClick={handleAddBudget}
                  className="w-full sm:w-1/2 p-2 bg-greenDeep hover:bg-greenMedium rounded-lg font-semibold"
                >
                  Add
                </button>
                <button
                  type="submit"
                  onClick={handleEditBudget}
                  className="w-full sm:w-1/2 p-2 bg-greenDeep hover:bg-greenMedium rounded-lg font-semibold"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>

          {/* Pie Chart */}
          <div className="bg-greenMedium bg-opacity-30 p-6 rounded-lg">
            <h1 className="text-xl text-text mb-4">Category wise budget</h1>
            <div className="h-72">
              <PieChart />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/5 bg-greenMedium bg-opacity-30 p-6 rounded-lg">
              <h1 className="text-xl text-text font-semibold mb-4">Current Budgets</h1>
              <p className="text-l text-text font-medium">
                Budget 1
                Budget 2 
                Budget 3
    
              </p>
            </div>

            <div className="w-full md:w-3/5 bg-greenMedium bg-opacity-30 p-6 rounded-lg">
              <h1 className="text-xl text-text font-semibold mb-4">Remaining Budget</h1>
              <BudgetChart />
            </div>
          </div>

          {/* Allocation Section */}
          <div className="bg-greenMedium bg-opacity-30 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h3 className="text-xl font-bold text-text">Allocation Budget</h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 text-text bg-greenLight bg-opacity-30 rounded-md">Monthly</button>
                <button className="px-3 py-1 text-text bg-greenLight bg-opacity-30 rounded-md">Weekly</button>
                <button className="px-3 py-1 text-text bg-greenLight bg-opacity-30 rounded-md">Export</button>
              </div>
            </div>

            <div className="h-72 mt-6 flex items-center justify-center">
              <BudgetChart className="h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;
