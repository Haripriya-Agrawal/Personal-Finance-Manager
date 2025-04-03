import React, { useEffect, useState } from "react";
import axios from "axios";

const SavingsOverview = () => {
  const [savings, setSavings] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.get("/api/savings");
        setSavings(response.data);

        // Calculate totals
        const saved = response.data.reduce((acc, goal) => acc + goal.savedAmount, 0);
        const target = response.data.reduce((acc, goal) => acc + goal.targetAmount, 0);
        
        setTotalSaved(saved);
        setTotalTarget(target);
      } catch (error) {
        console.error("Error fetching savings:", error);
      }
    };

    fetchSavings();
  }, []);

  const progress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="bg-greenMedium bg-opacity-30 p-6 rounded-2xl">
      <h2 className="text-lg font-semibold">Total Savings Progress</h2>
      <div className="mt-2 bg-green-500 h-4 rounded-full overflow-hidden">
        <div
          className="bg-green-200 h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span>₹ {totalSaved}</span>
        <span>₹ {totalTarget}</span>
      </div>
    </div>
  );
};

export default SavingsOverview;
