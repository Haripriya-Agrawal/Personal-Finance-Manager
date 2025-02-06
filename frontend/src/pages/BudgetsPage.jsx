
import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import LineChart from "../components/LineChart";


const BudgetsPage=()=>{
    return (
        <div className=" Wholepage w-full h-screen bg-greenDeep p-12 m-0">
            <Navbar/>
             


            <div className="flex flex-row gap-6">

            <div className="flex flex-col w-1/3 gap-6 text-text">   {/*Add Budgets and Current Budgets col */}
                <div className="h-full w-full bg-greenMedium bg-opacity-30 p-6 rounded-lg">
                    <h1 className="text-xl text-text mt-3 mb-3">Add/Edit Budget</h1>
                    <form className="space-y-2 sm:space-y-3">

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
                    <h1 className="text-xl text-text mb-2" >Remaining budget</h1>
                    <div className="flex flex-col mt-6 gap-6">

                    <div>
                        <h1 className="text-lg text-text">Food</h1>
                        <div className="border-[2px] border-greenLight  h-[20px] rounded-lg">
                          <div className="w-3/5 h-full bg-text rounded-lg"></div>
                        </div>
                          
                    </div>
                    <div>
                        <h1 className="text-lg text-text">Travel</h1>
                        <div className=" border-[2px] border-greenLight  h-[20px] rounded-lg">
                          <div className="w-2/5 h-full bg-text rounded-lg"></div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-lg text-text">Shopping</h1>
                        <div className=" border-[2px] border-greenLight  h-[20px] rounded-lg">
                          <div className="w-4/5 h-full bg-text rounded-lg"></div>
                        </div>
                    </div>

                    </div>
                    


                </div>
            </div> 

            <div className="flex flex-col w-full  gap-6">


            <div className="flex flex-row h-full w-full gap-6">
              <div className="h-full w-2/5 border">
              
              {/* Insights */}
              <h1>Insights</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, culpa omnis. Fugiat harum qui quidem quibusdam modi laborum earum, deserunt iure quod magni delectus ipsum quia, perferendis quis dolorum illo!</p>
              
              </div>
              <div className="h-full w-3/5 border">Category vise budget pie chart</div>
            </div>

            <div className="flex flex-row h-full w-full gap-2">
              <div className="h-full w-full  bg-greenMedium bg-opacity-30 rounded-lg p-6">
                <div className="flex flex-row gap-20  justify-center items-center">
                <h3 className="text-xl font-bold text-text ">Allocation Budget</h3>
                <div className="flex gap-2">
                  <button className=" py-0 px-3 text-text bg-greenLight bg-opacity-30">Monthly</button>
                <button className=" py-0 px-3 text-text bg-greenLight bg-opacity-30">Weekly</button>
                </div>
                <button className=" py-0 px-3 text-text bg-greenLight bg-opacity-30">Export</button>
                </div>

                <div className="mt-6 h-auto w-full ">
                  {/* Chart goes here  */}
                  <LineChart/>
                </div>
                
              </div>
              
            </div>

            </div>

            </div>

            
            
        </div>
      )
};
  


export default BudgetsPage;