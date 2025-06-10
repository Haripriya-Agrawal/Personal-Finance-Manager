import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BudgetChart from "../components/BudgetChart";
import BudgetPieChart from "../components/BudgetPieChart";
import AllocatedBudgetChart from "../components/AllocatedBudgetChart";
import BudgetList from "../components/BudgetList";

const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;

const BudgetsPage = () => {
  const [budgetId, setBudgetId] = useState(null);
  const [formData, setFormData] = useState({
    targetAmount: "",
    category: "",
    startDate: "",
    endDate: "",
  });
  const [reloadBudgets, setReloadBudgets] = useState(0);

  const handleEdit = (budget) => {
    setBudgetId(budget._id);
    setFormData({
      targetAmount: budget.targetAmount || "",
      category: budget.category || "",
      startDate: budget.startDate?.split("T")[0] || "",
      endDate: budget.endDate?.split("T")[0] || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/api/budget`, {
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
        setReloadBudgets((prev) => prev + 1);
      } else {
        alert(data.message || "Failed to add budget.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditBudget = async (e) => {
    e.preventDefault();
    if (!budgetId) return alert("Select a budget to edit.");

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${backendUrl}/api/budget/${budgetId}`, {
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
        setReloadBudgets((prev) => prev + 1);
      } else {
        alert(data.message || "Failed to update budget.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen bg-greenDeep text-text flex flex-col overflow-hidden lg:p-12">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col xl:flex-row gap-4 h-full">
          {/* LEFT SECTION */}
          <div className="flex flex-col w-full xl:w-1/3 gap-4 h-full">
            {/* Form */}
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-lg">
              <h1 className="text-lg font-semibold mb-2">{budgetId ? "Edit Budget" : "Add Budget"}</h1>
              <form className="space-y-3" onSubmit={budgetId ? handleEditBudget : handleAddBudget}>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    name="targetAmount"
                    placeholder="Budget amount"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400 text-sm"
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 text-white text-sm"
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
                    className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 text-sm"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-2 bg-greenDeep hover:bg-greenMedium rounded-lg font-semibold text-sm transition-colors"
                >
                  {budgetId ? "Update Budget" : "Add Budget"}
                </button>
              </form>
            </div>

            {/* Pie Chart */}
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-lg flex-1">
              <h1 className="text-lg mb-2">Category wise budget</h1>
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[300px]">
                <BudgetPieChart className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col w-full xl:w-2/3 gap-4 h-full">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Budget List */}
              <div className="w-full lg:w-2/5 bg-greenMedium bg-opacity-30 p-4 rounded-lg h-[300px] overflow-y-auto">
                <h1 className="text-lg font-semibold mb-2">Current Budget Goals</h1>
                <BudgetList onEdit={handleEdit} reloadTrigger={reloadBudgets} />
              </div>

              {/* Budget Bar Chart */}
              <div className="w-full lg:w-3/5 bg-greenMedium bg-opacity-30 p-4 rounded-lg h-[300px]">
                <h1 className="text-lg font-semibold mb-2">Remaining Budget</h1>
                <div className="w-full h-full">
                  <BudgetChart className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* Allocated Budget */}
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-lg h-[300px]">
              <div className="flex justify-center items-center mb-2">
                <h3 className="text-lg font-bold">Allocation Budget</h3>
              </div>
              <div className="w-full h-full">
                <AllocatedBudgetChart className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;
