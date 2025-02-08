
import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import LineChart from "../components/LineChart";
import BudgetChart from "../components/BudgetChart";
import PieChart from "../components/PieChart";


const BudgetsPage=()=>{
    return (
        <div className=" Wholepage w-full h-full bg-greenDeep p-12 m-0">
            <Navbar/>
             


            <div className="flex flex-row gap-6">

            <div className="flex flex-col w-1/3 gap-6 text-text">   {/*Add Budgets and Current Budgets col */}
                <div className="h-1/3 w-full bg-greenMedium bg-opacity-30 p-6 rounded-lg">
                    <h1 className="text-xl text-text font-semibold mb-3">Add-Edit Budget</h1>
                    <form className="space-y-2 mt-2 sm:space-y-3">

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Budget amount"
                  className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="date"
                  placeholder="Start Date"
                  className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  className="w-full p-2 rounded-lg bg-greenLight bg-opacity-30 placeholder-gray-400"
                />
              </div>

              

            <div className="flex flex-row gap-2">

            <button
                type="submit"
                className="flex justify-center items-center w-full sm:w-1/2 p-2 bg-greenDeep hover:bg-greenMedium rounded-lg font-semibold"
              >
                Add
              </button>

              <button
                type="submit"
                className="flex justify-center items-center w-full sm:w-1/2 p-2 bg-greenDeep hover:bg-greenMedium rounded-lg font-semibold"
              >
                Edit
              </button>
            </div>
              
            </form>
                    
            </div>



                <div className="h-full w-full bg-greenMedium bg-opacity-30 p-6 rounded-lg ">
                    <h1 className="text-xl text-text mb-6" >Category wise budget</h1>
                    <div className="h-72">
                      <PieChart/>
                    </div>
                    


                </div>
            </div> 

            <div className="flex flex-col w-full  gap-6">


            <div className="flex flex-row h-full w-full gap-6">
              
            <div className="h-full w-2/5  p-6 bg-greenMedium bg-opacity-30 rounded-lg">
              {/* Insights */}
              <h1 className="text-xl text-text font-semibold mb-6">Insights</h1>
              <p className="text-l text-text font-medium">Spent 30% more than expected on Food.</p>
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
                <div className="flex gap-2">
                  <button className=" py-0 px-3 text-text bg-greenLight bg-opacity-30">Monthly</button>
                <button className=" py-0 px-3 text-text bg-greenLight bg-opacity-30">Weekly</button>
                </div>
                <button className=" py-0 px-3 text-text bg-greenLight bg-opacity-30">Export</button>
                </div>

                <div className="h-72 mt-6 flex items-center justify-center">
                  {/* Chart goes here  */}
                  <BudgetChart className="h-auto"/>
                </div>
                
              </div>
              
            </div>

            </div>

            </div>

            
            
        </div>
      )
};
  


export default BudgetsPage;