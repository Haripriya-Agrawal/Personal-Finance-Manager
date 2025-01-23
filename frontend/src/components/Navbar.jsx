import React from "react";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Analytics from "../pages/Analytics";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center bg-greenDeep text-text p-4 rounded-lg mb-6 ">
      <nav className="flex items-center gap-2 text-text">
        <a href="Dashboard" className="hover:underline text-text">Dashboard</a>
        <span className="mx-1">•</span>
        <a href="Expenses" className="hover:underline text-text">Expenses</a>
        <span className="mx-1">•</span>
        <a href="Analytics" className="hover:underline text-text">Analytics</a>
        <span className="mx-1">•</span>
        <a href="#" className="hover:underline text-text">Savings</a>
        <span className="mx-1">•</span>
        <a href="#" className="hover:underline text-text">Budgets</a>
      </nav>
    </div>
  );
};

export default Navbar;
