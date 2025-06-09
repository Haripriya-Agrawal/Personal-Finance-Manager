
import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import LineChart from "../components/LineChart";
import BudgetChart from "../components/BudgetChart";
import PieChart from "../components/PieChart";
import BudgetPieChart from "../components/BudgetPieChart";
import AllocatedBudgetChart from "../components/AllocatedBudgetChart";
import BudgetList from "../components/BudgetList";


const BudgetsPage=()=>{
  const [budgets, setBudgets] = useState([]);
  const [budgetId, setBudgetId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    targetAmount: "",
    category: "", 
    startDate: "",
    endDate: "",
  });

  const [reloadBudgets, setReloadBudgets] = useState(0);

const handleAddOrUpdate = () => {
  // after API call is successful:
  setReloadBudgets((prev) => prev + 1); // trigger BudgetList reload
};


  const handleEdit = (budget) => {
  console.log("Edit clicked for budget:", budget);
  
  setBudgetId(budget._id);  // Set the selected budget ID for editing
  
  // Populate the formData with the budget details
  setFormData({
    targetAmount: budget.targetAmount || "",
    category: budget.category || "",
    startDate: budget.startDate ? budget.startDate.split("T")[0] : "",  // format ISO date to YYYY-MM-DD
    endDate: budget.endDate ? budget.endDate.split("T")[0] : "",
  });
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
        setReloadBudgets(prev => prev + 1); // ✅ TRIGGER LIST RELOAD
      }
      else {
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
        setReloadBudgets(prev => prev + 1); // ✅ TRIGGER LIST RELOAD
      }
      else {
        alert(data.message || "Failed to update budget.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" Wholepage w-full h-full bg-greenDeep p-12 m-0">
        <Navbar/>
         


        <div className="flex flex-row gap-6">

        <div className="flex flex-col w-1/3 gap-6 text-text">   
            <div className="h-1/3 w-full bg-greenMedium bg-opacity-30 p-6 rounded-lg">
                <h1 className="text-xl text-text font-semibold mb-3">Add Budget</h1>
                <form className="space-y-2 mt-2 sm:space-y-3">

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
              className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 text-white "
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
              placeholder="Start Date"
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400"
            />
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400"
            />
          </div>

          

        <div className="flex flex-row gap-2">
          {!budgetId ? (
            <button
              type="submit"
              onClick={handleAddBudget}
              className="flex justify-center items-center w-full p-2 bg-greenDeep hover:bg-greenMedium rounded-lg font-semibold"
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleEditBudget}
              className="flex justify-center items-center w-full p-2 bg-greenDeep hover:bg-greenMedium rounded-lg font-semibold"
            >
              Update
            </button>
          )}
        </div>

          
        </form>
                
        </div>
            <div className="h-full w-full bg-greenMedium bg-opacity-30 p-6 rounded-lg ">
                <h1 className="text-xl text-text mb-6" >Category wise budget</h1>
                <div className="h-72">
                  <BudgetPieChart/>
                </div>
                


            </div>
        </div> 

        <div className="flex flex-col w-full  gap-6">


        <div className="flex flex-row h-full w-full gap-6">
    
          <div className="h-full w-2/5  p-6 bg-greenMedium bg-opacity-30 rounded-lg">         
            <h1 className="text-xl text-text font-semibold mb-6">Current Budget Goals</h1>
            <BudgetList onEdit={handleEdit} reloadTrigger={reloadBudgets} />

          </div>

          <div className="h-full w-3/5 bg-greenMedium bg-opacity-30 p-6 rounded-lg">
          <h1 className="text-xl mb-6 text-text font-semibold">Remaining Budget</h1>
          <BudgetChart/>
          </div>
        </div>

      <div className="flex flex-row h-96 w-full gap-2  ">
        <div className="h-full w-full  bg-greenMedium bg-opacity-30 rounded-lg p-6">
            <div className="flex flex-row gap-20  justify-center items-center">
            <h3 className="text-xl font-bold text-text ">Allocation Budget</h3>
            
            </div>

            <div className="h-72 mt-6 flex items-center justify-center">
             
              <AllocatedBudgetChart className="h-auto"/>
            </div>
            
          </div>
          
        </div>

        </div>

        </div>

        
        
    </div>
  )
};
  


export default BudgetsPage;