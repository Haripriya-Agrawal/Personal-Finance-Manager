import React from "react";
import Navbar from "../components/Navbar";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
const Dashboard = () => {
  return (
  <div className="bg-greenDeep text-text min-h-screen p-12">
      <Navbar/>

   <div className="flex flex-row ">
      <div>
      {/* Main Content */}
      <div className="w-4/6 grid grid-cols-[200px,200px,200px,320px] gap-6">
        {/* Stats Cards */}
        <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Current Balance</h2>
          <p className="text-3xl font-bold mt-2">₹ 100000</p>
        </div>
        <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Remaining Budget</h2>
          <p className="text-3xl font-bold mt-2">₹ 30000</p>
        </div>
        <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Current Savings</h2>
          <p className="text-3xl font-bold mt-2">₹ 30000</p>
        </div>
        <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl col-span-1 lg:col-span-1">
          <h2 className="text-lg font-semibold">Saving Goals</h2>
          <div className="mt-2 bg-green-500 h-4 rounded-full overflow-hidden">
            <div className="bg-green-200 h-full w-1/2"></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>₹ 5000</span>
            <span>₹ 10000</span>
          </div>
        </div>
      </div>  

       


        {/* Charts Section */}
       <div className="w-2/6 grid grid-cols-[430px,540px,1fr] pt-6 h-[432px]  gap-6">
       <div className="bg-greenMedium bg-opacity-30 h-[432px] p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Category wise Spending</h2>
          <div className="mt-4 bg-text bg-opacity-10 rounded-2xl h-[350px] items-center justify-center"><PieChart/></div>
        </div>
        <div className="bg-greenMedium bg-opacity-30 h-432 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold">Income vs Expense</h2>
          <div className="mt-4 bg-text bg-opacity-10 rounded-2xl h-[350px]"><BarChart/></div>
        </div>
       </div>
       </div>
        
        


      <div className="flex flex-col-reverse w-[348px] h-full">
        
        <div className="bg-greenMedium bg-opacity-30 p-6 rounded-b-2xl h-[410px]">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center mb-2 mt-2 gap-2">
              <p>Haripriya Agrawal</p>
              <p>₹ 10000</p>
            </div>
            <div className="flex justify-between items-center mb-2 mt-2">
              <p>Netflix</p>
              <p>₹ 499</p>
            </div>
            <div className="flex justify-between items-center mb-2 mt-2 ">
              <p>Devendra Ingale</p>
              <p>₹ 25</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Samiksha Jadhav</p>
              <p>₹ 250</p>
            </div>
          </div>
        </div>
        
       
        <div className="bg-greenMedium bg-opacity-30 p-6 rounded-t-2xl ">
         <div className="bg-gradient-to-r from-greenMedium via-greenLight to-greenMedium p-6 rounded-2xl h-[140px] hover:scale-105  transition-transform duration-500 ease-in-out ">
          <h2 className="text-lg font-semibold">Current Account</h2>
          <p className="text-3xl font-bold mt-2">₹ 100000</p>
          <p className="text-sm mt-1">ICICI - Haripriya Agrawal</p>
        </div>
        </div>
        </div>
    </div>    
        
      
  </div>
  );
};

export default Dashboard;
