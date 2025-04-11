import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpensesComponents/ExpenseForm";
import ExpenseFilters from "../components/ExpensesComponents/ExpenseFilters";
import ExpenseList from "../components/ExpensesComponents/ExpenseList";
import ExpenseChart from "../components/ExpensesComponents/ExpenseChart";
import axios from "axios";

const Expenses = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minAmount: "",
    maxAmount: ""
  });
  const [form, setForm] = useState({
    _id: null,
    title: "",
    amount: "",
    category: "",
    date: ""
  });
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axios.get("http://localhost:5000/api/transaction", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const maxExpense = expenses.reduce(
    (max, expense) =>
      parseFloat(expense.amount) > parseFloat(max.amount) ? expense : max,
    { amount: 0, category: "" }
  );

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = filters.category
      ? expense.category === filters.category
      : true;
    const matchesMin = filters.minAmount
      ? expense.amount >= parseFloat(filters.minAmount)
      : true;
    const matchesMax = filters.maxAmount
      ? expense.amount <= parseFloat(filters.maxAmount)
      : true;
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  return (
    <div className="min-h-screen bg-greenDeep text-text px-4 py-6 sm:px-6 md:px-12">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Left Section */}
        <div className="flex flex-col gap-8">
          <ExpenseForm
            form={form}
            setForm={setForm}
            fetchExpenses={fetchExpenses}
          />
          <ExpenseChart />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-8">
          <ExpenseFilters
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
          />
          <ExpenseList
            expenses={filteredExpenses}
            setForm={setForm}
            fetchExpenses={fetchExpenses}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
