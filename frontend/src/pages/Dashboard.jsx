import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import TransactionsList from "../components/TransactionList";
import SavingsOverview from "../components/SavingsComponents/savingsLine";
import TotalSavings from "../components/SavingsComponents/TotalSavings";
import RemainingBudget from "../components/RemainingBudget";

const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;

const Dashboard = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { currentBalance, firstName, lastName } = response.data;
        setCurrentBalance(currentBalance || 0);
        setFullName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <div className="bg-greenDeep text-text min-h-screen p-4 md:p-6 lg:p-12">
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl">
              <h2 className="text-lg font-semibold">Current Balance</h2>
              <p className="text-2xl md:text-3xl font-bold mt-1">₹ {currentBalance}</p>
            </div>
            
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl">
              <h2 className="text-lg font-semibold">Remaining Budget</h2>
              <p className="text-2xl md:text-3xl font-bold mt-1">₹ <RemainingBudget /></p>
            </div>
            
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl">
              <h2 className="text-lg font-semibold">Current Savings</h2>
              <TotalSavings />
            </div>
            
            <div className="sm:col-span-2 lg:col-span-1">
              <SavingsOverview />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl">
              <h2 className="text-lg font-semibold mb-3">Category Spending</h2>
              <div className="bg-text bg-opacity-10 rounded-xl aspect-[4/3]">
                <PieChart />
              </div>
            </div>
            
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl">
              <h2 className="text-lg font-semibold mb-3">Savings vs Expense</h2>
              <div className="bg-text bg-opacity-10 rounded-xl aspect-[4/3]">
                <BarChart />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Column - Optimized Version */}
        <div className="w-full lg:w-[32%] flex flex-col gap-6">
          {/* Account Card */}
          <div className="bg-gradient-to-r from-greenMedium via-greenLight to-greenMedium p-5 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold">Current Account</h2>
            <p className="text-2xl md:text-3xl font-bold mt-1">₹ {currentBalance}</p>
            <p className="text-sm opacity-80 mt-1">ICICI • {fullName}</p>
          </div>

          {/* Transactions Container */}
          <div className="bg-greenMedium bg-opacity-30 rounded-2xl flex-1 flex flex-col">
            <div className="p-4 border-b border-greenLight border-opacity-20">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
            </div>
            
            <div className="flex-1  justify-center align-items-center overflow-y-auto max-h-[60vh]">
              <div className="p-3 space-y-3">
                <TransactionsList />
              </div>
            </div>
            
            <div className="p-3 border-t border-greenLight border-opacity-20 text-center">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;