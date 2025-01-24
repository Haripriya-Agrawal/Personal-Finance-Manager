import React from "react";
import Navbar from "../components/Navbar";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

const Analytics=()=>{
    return(
        
        <div className="bg-greenDeep text-text min-h-screen p-12">
            
            {/* Navbar*/}
            <Navbar/>

            <div className="flex flex-row gap-6">

            <div className="flex  h-full" >
                {/*common container*/}
                <div className="flex  flex-col items-center h-[660px] bg-greenMedium bg-opacity-30 w-[350px] rounded-2xl p-4  ">
                    {/* //wrapper container */}
                    <h1 className="text-xl font-semibold text-text p-4">Total Expenses</h1>
                    <div className="h-[162px] bg-greenLight bg-gradient-to-b from-greenLight to-greenMedium w-full rounded-2xl">
                        <div className="flex justify-center items-center p-2">
                            {/* Filter buttons */}
                            <button className="bg-greenMedium rounded-2xl m-1 text-xs hover:bg-greenDeep">Daily</button>
                            <button className="bg-greenMedium rounded-2xl m-1 text-xs hover:bg-greenDeep">Monthly</button>
                            <button className="bg-greenMedium rounded-2xl m-1 text-xs hover:bg-greenDeep">Yearly</button>
                        </div>
                        <h1 className="flex justify-center items-center text-4xl font-bold p-6">$30000</h1>
                    </div>
                    <h1 className="text-xl font-semibold text-text p-4">Transactions</h1>
                    <div className="bg-gradient-to-b from-greenMedium to-greenLight  p-6 rounded-2xl h-full w-full">

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
                </div>
                
               
            </div>

            {/* Column2  */}
            <div className="flex flex-col">
                {/* Row1 */}
                <div className="flex flex-row">
                    <div className="h-[230px] bg-greenMedium bg-opacity-30 rounded-2xl">Largest Expense</div>
                    <div>Budget Goals</div>
                    <div>Spending Heatmap</div>
                </div>

                {/* Row2 */}
                <div className="flex flex-row">
                    <div className="h-[430px] w-[470px] rounded-2xl bg-greenMedium bg-opacity-30">
                        <h1 className="text-xl font-semibold p-6">Categorywise Spending</h1>
                        <div>
                            {/* Chart */}
                            <LineChart/>
                        </div>
                    </div>
                    <div>Line Chart</div>
                </div>
            </div>

            </div>

            {/* Column 1 - Total Expenses and Transactions */}
            
            
            
        </div>
        
        
    );
};

export default Analytics;