import axios from "axios";

const API_URL = `${process.env.base_backend_URL}/api/savings`;

export const addSavingsGoal = async (goalData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const { _id, ...newGoalData } = goalData; 

    const response = await axios.post(API_URL, newGoalData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding savings goal:", error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

export const updateSavingsGoal = async (goalId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const { _id, __v, createdAt, updatedAt, userId, ...cleanData } = updatedData;

    console.log("Updating Savings Goal:", goalId);
    console.log("Payload to backend:", cleanData);

    const response = await axios.put(`${API_URL}/${goalId}`, cleanData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating savings goal:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to update goal" };
  }
};


export const fetchSavings = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const response = await axios.get(API_URL, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching savings:", error);
    return []; 
  }
};
