import axios from "axios";

export const fetchChartData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [savingsRes, expensesRes] = await Promise.all([
    axios.get("http://localhost:5000/api/savings", config),
    axios.get("http://localhost:5000/api/transaction", config),
  ]);

  console.log("👉 Savings Response:", savingsRes.data);
  console.log("👉 Expenses Response:", expensesRes.data);

  return {
    savings: savingsRes.data,
    expenses: expensesRes.data,
  };
};
