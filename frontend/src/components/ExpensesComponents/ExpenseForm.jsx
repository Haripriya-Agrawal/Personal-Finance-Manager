import { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BASE_BACKEND_URL;
const ExpenseForm = ({ fetchExpenses, form, setForm }) => {
  useEffect(() => {
    if (form.date) {
      setForm((prevForm) => ({
        ...prevForm,
        date: new Date(form.date).toISOString().split("T")[0], 
      }));
    }
  }, [form.date]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated.");
        return;
      }
  
      const amount = Number(form.amount);
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }
  
      const formattedDate = new Date(form.date).toISOString();
  
      const { _id, createdAt, updatedAt, __v,  ...transactionData } = form;
      transactionData.amount = amount;
      transactionData.date = formattedDate;
  
      let response;
      if (_id) {
        response = await axios.put(`${backendUrl}/api/transaction/${_id}`, transactionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await axios.post(`${backendUrl}/api/transaction`, transactionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
  
      setForm({ _id: null, title: "", amount: "", category: "", date: "" });
      fetchExpenses();
    } catch (error) {
      console.error("Error saving expense:", error);
      alert(`Failed to save expense: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className="bg-greenMedium bg-opacity-50 p-4 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">{form._id ? "Edit Expense" : "Add Expense"}</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 rounded-xl w-full"
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="p-2 rounded-xl w-full"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 rounded-xl w-full"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={form.date || ""}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 rounded-xl w-full"
        />
      </div>
      <button onClick={handleSave} className="mt-4 bg-greenLight text-text px-4 py-2 rounded-xl">
        {form._id ? "Save Changes" : "Add Expense"}
      </button>
    </div>
  );
};

export default ExpenseForm;
