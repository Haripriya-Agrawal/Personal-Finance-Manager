const SavingsList = ({ savings, setEditingGoal }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="p-2 bg-greenLight rounded-lg font-semibold">Ongoing</button>
        <button className="p-2 bg-greenLight rounded-lg font-semibold">Upcoming</button>
        <button className="p-2 bg-greenLight rounded-lg font-semibold">Completed</button>
      </div>
      <ul className="space-y-2">
        {savings.length === 0 ? (
          <p>No savings goals added yet.</p>
        ) : (
          savings.map((saving) => (
            <li key={saving._id} className="flex justify-between items-center bg-blue p-3 rounded-lg shadow">
              <div className="flex flex-col">
                <span className="font-medium">{saving.goalName}</span>
                <span className="text-sm text-gray-500">
                  Progress: {((saving.savedAmount / saving.targetAmount) * 100).toFixed(0)}%
                </span>
              </div>
              <button
                onClick={() => setEditingGoal(saving)}
                className="p-2 bg-greenLight hover:bg-greenDark text-white rounded-lg font-semibold"
              >
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
