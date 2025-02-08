import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/Dashboard");
  };

  return (
    <div 
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/loginBg.jpg')" }} // Change the path as needed
    >
      <div className="bg-greenMedium bg-opacity-50 shadow-lg rounded-lg p-8 w-full max-w-md backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Log in to your account</h1>
        <p className="text-sm mb-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="  text-text hover:underline">
            Sign up
          </Link>
        </p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
