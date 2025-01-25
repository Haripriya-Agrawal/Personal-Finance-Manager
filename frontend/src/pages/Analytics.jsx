import React from "react";
import Navbar from "../components/Navbar";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

const Analytics = () => {
  return (
    <div className="bg-greenDeep text-text min-h-screen w-full overflow-x-hidden p-6">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Column 1 - Total Expenses and Transactions */}
        <div className="flex flex-col items-center h-auto bg-greenMedium bg-opacity-30 w-full lg:w-[350px] rounded-2xl p-4">
          <h1 className="text-xl font-semibold text-text p-4">Total Expenses</h1>
          <div className="h-auto bg-greenLight bg-gradient-to-b from-greenLight to-greenMedium w-full rounded-2xl">
            <div className="flex justify-center items-center p-2">
              {/* Filter buttons */}
              <button className="bg-greenMedium rounded-2xl m-1 text-xs px-4 py-2 hover:bg-greenDeep">
                Daily
              </button>
              <button className="bg-greenMedium rounded-2xl m-1 text-xs px-4 py-2 hover:bg-greenDeep">
                Monthly
              </button>
              <button className="bg-greenMedium rounded-2xl m-1 text-xs px-4 py-2 hover:bg-greenDeep">
                Yearly
              </button>
            </div>
            <h1 className="flex justify-center items-center text-4xl font-bold p-6">
              $30,000
            </h1>
          </div>
          <h1 className="text-xl font-semibold text-text p-4">Transactions</h1>
          <div className="bg-gradient-to-b from-greenMedium to-greenLight p-6 rounded-2xl h-auto w-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p>Haripriya Agrawal</p>
                <p>₹ 10,000</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Netflix</p>
                <p>₹ 499</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Devendra Ingale</p>
                <p>₹ 25</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Samiksha Jadhav</p>
                <p>₹ 250</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 - Charts and Goals */}
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="h-[230px] w-full lg:w-1/3 bg-greenMedium bg-opacity-30 rounded-2xl ">
              <p className="text-xl font-semibold p-6">Largest Expense</p>
              <p className="text-4xl font-bold p-6 flex justify-center items-center">$500</p>
              <p className="text-l font-medium flex justify-center items-center">Travel </p>
            </div>
            <div className="h-[230px] w-full lg:w-1/3 bg-greenMedium bg-opacity-30 rounded-2xl flex flex-col justify-center items-center">
              <p className="text-xl font-semibold">Budget Goals</p>
              <div className="w-3/4 mt-4">
                {/* Progress bar or other elements */}
              </div>
            </div>
            <div className="h-[230px] w-full lg:w-1/3 bg-greenMedium bg-opacity-30 rounded-2xl flex justify-center items-center">
              <p className="text-xl font-semibold">Spending Heatmap</p>
              
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="h-[430px] w-full lg:w-1/2 rounded-2xl bg-greenMedium bg-opacity-30 flex flex-col">
              <h1 className="text-xl font-semibold p-6">Categorywise Spending</h1>
              <div className="flex-grow flex justify-center items-center">
                {/* Chart */}
                <PieChart className="h-full w-full max-w-full max-h-full" />
              </div>
            </div>
            <div className="h-[430px] w-full lg:w-1/2 rounded-2xl bg-greenMedium bg-opacity-30 flex flex-col ">
              <h1 className="text-xl font-semibold p-6">
                Monthly/Daily Spending Trends
              </h1>
              <div className="flex-grow flex justify-center items-center ">
                {/* Chart */}
                <LineChart className="h-full w-full max-w-full max-h-full " />
              </div>
              <div className="p-4 flex justify-center gap-4">
                {/* Buttons */}
                <button className="bg-greenMedium rounded-2xl m-1 text-xs px-4 py-2 hover:bg-greenDeep">
                  Weekly
                </button>
                <button className="bg-greenMedium rounded-2xl m-1 text-xs px-4 py-2 hover:bg-greenDeep">
                  Monthly
                </button>
                <button className="bg-greenMedium rounded-2xl m-1 text-xs px-4 py-2 hover:bg-greenDeep">
                  Yearly
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
