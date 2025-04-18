import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [last24hrTotal, setLast24hrTotal] = useState(0);

  const fetchData = async () => {
    try {
      // Fetch budgets
      const budgetRes = await axios.get("http://localhost:5000/api/budget");
      const budgets = Array.isArray(budgetRes.data)
        ? budgetRes.data
        : budgetRes.data.budgets || [];

      // Handle budget notifications
      const exceeded = budgets.filter(budget => budget.spent > budget.amount);
      const exceededMessages = exceeded.map(budget =>
        `⚠️ Budget exceeded for ${budget.category}: Spent ₹${budget.spent} of ₹${budget.amount}`
      );

      // Fetch transactions
      const txnRes = await axios.get("http://localhost:5000/api/transaction");
      const transactions = txnRes.data || [];

      // Calculate last 24hr expenses
      const now = dayjs();
      const last24hrExpenses = transactions
        .filter(txn => dayjs(txn.createdAt).isAfter(now.subtract(24, "hour")))
        .reduce((total, txn) => total + txn.amount, 0);

      setLast24hrTotal(last24hrExpenses);
      setNotifications(exceededMessages);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

      <p><strong>🕒 Last 24 hours expense:</strong> ₹{last24hrTotal}</p>

      {notifications.length === 0 ? (
        <p>No budgets exceeded ✅</p>
      ) : (
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
