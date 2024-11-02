"use client";

import { useState } from "react";

export default function AdminSignupComponent() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-lg p-6 space-y-4 shadow-[0px_0px_25px_#e6e6e6]">
        <h1 className="text-2xl sm:text-3xl text-white font-bold text-center">
          Admin Signup
        </h1>

        <form className="space-y-3">
          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm
                       bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm
                       bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm
                       bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm
                       bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="w-1/2 mx-auto block py-1.5 px-3 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg text-sm
                       transition-colors duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
