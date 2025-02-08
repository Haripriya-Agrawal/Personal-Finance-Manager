import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseChart from "../components/ExpenseChart";

const Expenses = () => {
  // State to manage expenses
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Groceries", amount: 50, category: "Food", date: "2025-01-20" },
    { id: 2, title: "Uber Ride", amount: 15, category: "Transportation", date: "2025-01-21" },
]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", minAmount: "", maxAmount: "" });
  const [form, setForm] = useState({ id: null, title: "", amount: "", category: "", date: "" });

  // Add or Edit Expense
  const handleSave = () => {
    if (form.id) {
      // Edit
      setExpenses(expenses.map((exp) => (exp.id === form.id ? { ...form } : exp)));
    } else {
      // Add
      setExpenses([...expenses, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, title: "", amount: "", category: "", date: "" });
  };

  // Delete Expense
  const handleDelete = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // Filtered and Searched Expenses
  const filteredExpenses = expenses.filter((expense) => {
    return (
      (search === "" || expense.title.toLowerCase().includes(search.toLowerCase())) &&
      (filters.category === "" || expense.category === filters.category) &&
      (filters.minAmount === "" || expense.amount >= parseFloat(filters.minAmount)) &&
      (filters.maxAmount === "" || expense.amount <= parseFloat(filters.maxAmount))
    );
  });

  return (
    <div className="min-h-screen bg-greenDeep text-text p-12">
      <Navbar />


    <div className="grid grid-cols-2 gap-6 p-6 bg-greenDeep">
        <div className="flex flex-col">
      {/* Add Expense Section */}
            <div className="bg-greenMedium bg-opacity-50 p-4 rounded-xl shadow mb-6 grid grid-cols-1 w-full">
                <h2 className="text-lg font-semibold mb-4">
                {form.id ? "Edit Expense" : "Add Expense"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className=" p-2 rounded-xl w-full"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className=" p-2 rounded-xl w-full"
                />
                <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="p-2 rounded-xl w-full"
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className=" p-2 rounded-xl w-full"
                />
                </div>
                <button
                onClick={handleSave}
                className="mt-4 bg-greenLight text-text px-4 py-2 rounded-xl"
                >
                {form.id ? "Save Changes" : "Add Expense"}
                </button>
            </div>


            {/*Chart Section*/ }
            <div className="bg-greenMedium bg-opacity-50 rounded-xl">
              <ExpenseChart/>
            </div>
            </div>

             <div>   {/* Search, Filter, and Transactions */}
                <div className="flex flex-col gap-6 w-full">
                    {/* Search and Filter Section */}
                    <div className="bg-greenMedium bg-opacity-50 p-4 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Search and Filter</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                        type="text"
                        placeholder="Search by Title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className=" p-2 rounded-xl w-full"
                        />
                        <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className=" p-2 rounded-xl w-full"
                        >
                        <option value="">Filter by Category</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                        </select>
                        <input
                        type="number"
                        placeholder="Min Amount"
                        value={filters.minAmount}
                        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                        className=" p-2 rounded-xl w-full"
                        />
                        <input
                        type="number"
                        placeholder="Max Amount"
                        value={filters.maxAmount}
                        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                        className=" p-2 rounded-xl w-full"
                        />
                    </div>
                    </div>

                    {/* Transactions Section */}
                    <div className="bg-greenMedium bg-opacity-50 p-4 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Transactions</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr>
                            <th className="border-b p-2">Title</th>
                            <th className="border-b p-2">Amount</th>
                            <th className="border-b p-2">Category</th>
                            <th className="border-b p-2">Date</th>
                            <th className="border-b p-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredExpenses.map((expense) => (
                            <tr key={expense.id}>
                            <td className="border-b p-2">{expense.title}</td>
                            <td className="border-b p-2">${expense.amount}</td>
                            <td className="border-b p-2">{expense.category}</td>
                            <td className="border-b p-2">{expense.date}</td>
                            <td className="border-b p-2">
                                <button
                                onClick={() => setForm(expense)}
                                className="text-blue-500 mr-2"
                                >
                                Edit
                                </button>
                                <button
                                onClick={() => handleDelete(expense.id)}
                                className="text-red-500"
                                >
                                Delete
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    </div>
                    </div>










      </div>
    </div>
  );
};

export default Expenses;
