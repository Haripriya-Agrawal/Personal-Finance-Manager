import axios from "axios";

const API_URL = "http://localhost:5000/api/savings";

export const addSavingsGoal = async (goalData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const response = await axios.post(API_URL, goalData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding savings goal:", error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
