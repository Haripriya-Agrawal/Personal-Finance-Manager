import axios from "axios";
const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;

export const addBudget = async (budgetData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found. Please log in again.");

    const response = await axios.get(`${backendUrl}/api/budget`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
