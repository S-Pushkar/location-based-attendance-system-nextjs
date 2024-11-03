"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignup() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin-dashboard");
    }
  }, []);
  const [email, setEmail] = useState<string>("");
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/register-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            fname: fname.trim(),
            lname: lname.trim(),
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
        router.push("/admin-dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl sm:text-3xl text-white font-bold text-center">
          Admin Signup
        </h1>

        <form className="space-y-3" onSubmit={handleSignup}>
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
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            className="w-1/2 mx-auto block py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
