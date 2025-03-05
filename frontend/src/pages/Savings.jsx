import React from "react";
import Navbar from "../components/Navbar";
import PieChart from "../components/PieChart";
import { Plus } from "lucide-react";


const Savings = () => {
  return (
    <div className="bg-greenDeep min-h-screen p-4 sm:p-8 md:p-12 text-white font-sans">
      <Navbar />
      <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-4 sm:gap-6">


        <div className="flex flex-col gap-4 sm:gap-6 lg:w-1/3">
          
          {/* Add Savings Goal Section */}
          <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg">
            <h2 className="text-base text-text sm:text-lg font-bold mb-2 sm:mb-4">Add Savings Goal</h2>
            <form className="space-y-2 sm:space-y-3">

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Goal amount"
                  className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="date"
                  className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
                />
                <input
                  type="date"
                  className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Amount saved"
                  className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
                />
                {/* <input
                  type="text"
                  placeholder="Frequency"
                  className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
                /> */}
              </div>

              <button
                type="submit"
                className="flex justify-center items-center w-full sm:w-1/2 p-2 bg-greenLight hover:bg-text rounded-lg font-semibold"
              >
                Add
              </button>
            </form>
          </div>


          {/* Current Saving Goals */}
          <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg">
            <h2 className="text-base text-text text-text sm:text-lg font-bold mb-2 sm:mb-4">Current Saving Goals</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="p-2 bg-greenLight rounded-lg font-semibold">
                Ongoing
              </button>
              <button className="p-2 bg-greenLight rounded-lg font-semibold">
                Upcoming
              </button>
              <button className="p-2 bg-greenLight rounded-lg font-semibold">
                Completed
              </button>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Beach Trip</span>
                <span>50%</span>
                <button className="p-2 bg-none"> Add Funds </button>
              </li>
              <li className="flex justify-between">
                <span>Emergency</span>
                <span>25%</span>
                <button className="p-2 bg-none"> Add Funds </button>
                
              </li>
              <li className="flex justify-between">
                <span>Car</span>
                <span>70%</span>
                <button className="p-2 bg-none"> Add Funds </button>
              </li>
              <li className="flex justify-between">
                <span>Coach Bag</span>
                <span>20%</span>
                <button className="p-2 bg-none"> Add Funds </button>
              </li>
              <li className="flex justify-between">
                <span>Home</span>
                <span>30%</span>
                <button className="p-2 bg-none"> Add Funds </button>
                
              </li>
            </ul>
          </div> 
        </div>
        

        {/* Column 2 */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:w-2/3">
          
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

            {/* Available Funds */}
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg flex flex-col justify-center items-center w-full sm:w-1/3">
              <h2 className="text-base text-text text-text sm:text-lg font-bold">Available funds</h2>
              <p className="text-xl sm:text-3xl font-bold mt-2 sm:mt-4">₹ 30,000</p>
            </div>

            {/* Milestone */}
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg w-full sm:w-2/3">
              <h2 className="text-base text-text text-text sm:text-lg font-bold">Milestone</h2>
              <p className="mt-2">50% of Car Savings Done !!</p>
              <div className="w-full bg-greenLight h-4 rounded-full mt-4">
                <div
                  className="bg-text h-4 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
              <p className="text-sm mt-2">₹ 5000 / ₹ 10000</p>
            </div>

            {/* Savings Fact */}

            <div className="flex flex-col p-6 bg-greenMedium bg-opacity-30 rounded-xl gap-6">
              <h2 className="font-bold ">Savings Fact of the day</h2>
              <p>You don’t have to see the whole staircase, just take the first step.</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col  flex-grow sm:flex-row gap-4 sm:gap-6">

            {/* Pie Chart */}
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg w-full sm:w-1/2">
              <h2 className="text-base text-text text-text sm:text-lg font-bold mb-2 sm:mb-4">Total Savings Pie Chart</h2>
              <div className=" bg-greenLight bg-opacity-20 rounded-lg">
                <PieChart className="h-full w-full" />
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg w-full sm:w-1/2">
              <h2 className="text-base text-text text-text sm:text-lg font-bold mb-2 sm:mb-4">Line Chart</h2>
              <div className="h-40 bg-greenLight rounded-lg flex justify-center items-center">
                <p>Line Chart Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Savings;
