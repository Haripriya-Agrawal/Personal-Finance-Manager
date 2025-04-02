import { useEffect, useState } from "react";
import { fetchSavings } from "../../services/addSavings";

const SavingsList = ({ setEditingGoal  }) => {
  const [savings, setSavings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSavings = async () => {
      try {
        const data = await fetchSavings();
        setSavings(data);
      } catch (err) {
        setError("Failed to load savings.");
      }
    };

    loadSavings();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {savings.length === 0 ? (
          <p>No savings goals added yet.</p>
        ) : (
          savings.map((saving) => (
            <li key={saving._id} className="flex justify-between">
              <span>{saving.goalName}</span>
              <span>{((saving.savedAmount / saving.targetAmount) * 100).toFixed(0)}%</span>
              <button className="p-2 bg-none" onClick={() => setEditingGoal(saving)}>
                Add Funds
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SavingsList;
