import axios from "axios";

const API_URL = "http://localhost:5000/api/savings";

export const fetchSavings = async () => {
  try {
    const token = localStorage.getItem("token"); // Get user token
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching savings:", error);
    throw error;
  }
};
