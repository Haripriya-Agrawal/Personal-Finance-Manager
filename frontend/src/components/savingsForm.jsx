import { useState, useEffect } from "react";
import { addSavingsGoal } from "../services/addSavings";

const SavingsForm = ({ onGoalAdded }) => {
  const [data, setData] = useState({
    goalName: "",
    targetAmount: "",
    savedAmount: "",
    startDate: "",
    endDate: "",
  });

  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?._id) {
          setUserId(parsedUser._id);
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: ["targetAmount", "savedAmount"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addSavingsGoal({ ...data, userId });
      alert("Goal added successfully!");
      setData({ goalName: "", targetAmount: "", savedAmount: "", startDate: "", endDate: "" });
      if (onGoalAdded) onGoalAdded();
    } catch (error) {
      alert(error.message || "Error adding goal.");
    }
  };

  return (
    <div className="bg-greenMedium bg-opacity-30 p-4 rounded-2xl shadow-lg">
      <h2 className="text-base text-text sm:text-lg font-bold mb-4">Add Savings Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            placeholder="Goal amount"
            value={data.targetAmount}
            onChange={handleChange}
            name="targetAmount"
            required
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Goal Name"
            value={data.goalName}
            onChange={handleChange}
            name="goalName"
            required
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="date"
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
          <input
            type="date"
            name="endDate"
            value={data.endDate}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            placeholder="Amount saved"
            value={data.savedAmount}
            onChange={handleChange}
            name="savedAmount"
            required
            className="w-full p-2 rounded-lg bg-greenLight placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center items-center w-full sm:w-1/2 p-2 bg-greenLight hover:bg-text rounded-lg font-semibold"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default SavingsForm;
