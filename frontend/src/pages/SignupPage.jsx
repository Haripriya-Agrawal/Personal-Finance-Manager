import React from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gray-900 text-gray-200">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-greenMedium to-greenLight p-8">
          <h2 className="text-3xl font-bold text-white">Your Wealth, Evolved</h2>
          <h2 className="text-3xl font-bold text-white"></h2>
          <p className="text-gray-300 mt-auto">A beautiful journey starts here.</p>
        </div>

        {/* Right Section */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-center mb-6">Create an account</h1>
          <p className="text-center text-gray-400 mb-6">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 underline">
              Log in
            </Link>
          </p>
          <form className="space-y-4">
            {/* Name Inputs */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Email and Password */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Income Range */}
            {/* <div>
             
              <select
                className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select your income range</option>
                <option value="0-25k">0 - 25k</option>
                <option value="25k-50k">25k - 50k</option>
                <option value="50k-100k">50k - 100k</option>
                <option value="100k+">100k+</option>
              </select>
            </div> */}

            {/* User Type */}
            <div>
              
              <select
                className="w-full px-4 py-2 bg-gray-700 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select your user type</option>
                <option value="students">Students</option>
                <option value="working-professionals">Working Professionals</option>
                <option value="freelancers">Freelancers/Contractors</option>
                <option value="remote-workers">Remote Workers/Digital Nomads</option>
                <option value="small-business-owners">Small Business Owners</option>
                <option value="entrepreneurs">Entrepreneurs</option>
                <option value="families">Families & Homemakers</option>
                <option value="investors">Investors</option>
                <option value="crypto-traders">Crypto Traders</option>
                <option value="retirees">Retirees & Pensioners</option>
                <option value="travel-enthusiasts">Travel Enthusiasts</option>
                <option value="debt-managers">Debt Managers</option>
                <option value="non-profit-workers">Non-Profit Workers & Volunteers</option>
                <option value="tech-savvy-planners">Tech-Savvy Financial Planners</option>
              </select>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 h-4 w-4 text-text bg-gray-700 rounded border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-gray-400">
                I agree to the{" "}
                <Link to="#" className="text-blue-500 underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-greenLight text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between mt-4">
            <hr className="w-full border-gray-600" />
            <span className="px-4 text-gray-400">Or register with</span>
            <hr className="w-full border-gray-600" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="flex-1 flex items-center justify-center bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition">
              Google
            </button>
            <button className="flex-1 flex items-center justify-center bg-gray-700 text-gray-200 py-2 rounded-md hover:bg-gray-600 transition">
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
