import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token"); 

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/api/transaction`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTransactions(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col-reverse lg:w-[348px] gap-6 rounded-xl bg-greenMedium bg-opacity-30">
      <div className="p-6 rounded-b-2xl h-2/3">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <div className="mt-4 space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{transaction.title}</p>
                <p>₹ {transaction.amount}</p>
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
