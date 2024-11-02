"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserSignup() {
  const [email, setEmail] = useState<string>("");
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/register-attendee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            fname: fname.trim(),
            lname: lname.trim(),
            address: address.trim(),
            password: password.trim(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Signup failed");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.access_token as string); // Store JWT token
        console.log("JWT Token:", localStorage.getItem("token"));
        //router.push("/user-dashboard"); // Navigate to dashboard or another page
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl sm:text-3xl text-white font-bold text-center">
          User Signup
        </h1>

        <div className="space-y-3">
          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            className="w-1/2 mx-auto block py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
