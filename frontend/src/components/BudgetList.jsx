import React, { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const BudgetList = ({ onEdit, reloadTrigger }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${backendUrl}/api/budget`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBudgets(sorted);
      } else {
        setBudgets([]);
      }
    } catch (err) {
      console.error("Error fetching budgets:", err);
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [reloadTrigger]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Budgets</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : budgets.length === 0 ? (
        <p className="text-gray-400">No recent budgets found.</p>
      ) : (
        <ul className="space-y-2">
          {budgets.map(({ _id, category, targetAmount, spentAmount = 0, startDate, endDate }) => (
            <li
              key={_id}
              className="flex justify-between items-center bg-blue p-3 rounded-lg shadow"
            >
              <div className="flex flex-col">
                <span className="font-medium">{category} : ₹{targetAmount}</span>
                <span className="text-sm text-gray-300">
                  {new Date(startDate).toISOString().split("T")[0]} to {new Date(endDate).toISOString().split("T")[0]}
                </span>
              </div>
              <button
                onClick={() => onEdit?.({ _id, category, targetAmount, spentAmount, startDate, endDate })}
                className="p-2 bg-greenLight hover:bg-greenDark text-white rounded-lg font-semibold"
              >
                Edit
              </button>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default BudgetList;
