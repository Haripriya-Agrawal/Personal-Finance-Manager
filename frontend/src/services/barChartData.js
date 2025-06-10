import axios from "axios";

const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;
export const fetchChartData = async (token) => {
  try {
    const [savingsRes, expensesRes] = await Promise.all([
      axios.get(`${backendUrl}/api/savings`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${backendUrl}/api/transaction`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    return {
      savings: savingsRes.data,
      expenses: expensesRes.data,
    };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { savings: [], expenses: [] };
  }
};
