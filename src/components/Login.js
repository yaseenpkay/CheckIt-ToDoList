// src/components/Login.js
import React from "react";

function Login() {
  return (
    <div className="min-h-screen bg-white-100 flex justify-end mr-60 items-center w-full">
      <div className="bg-lightOrange p-8 rounded shadow-md w-5/12 min-w-min  h-4/6">
        <h2 className="text-2xl text-midOrange font-bold mb-6 text-left">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              className="text-midOrange placeholder-midOrange w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className="text-midOrange placeholder-midOrange w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-50 bg-midOrange text-white py-2 px-4 rounded hover:bg-darkOrange focus:outline-none"
            >
              Sign In
            </button>
            <button
              type="submit"
              className="w-50 bg-midOrange text-white py-2 px-4 rounded hover:bg-darkOrange focus:outline-none "
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
