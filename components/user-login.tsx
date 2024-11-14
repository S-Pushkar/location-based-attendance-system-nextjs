"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginComponent() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined" || !localStorage) {
      return;
    }
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/user-dashboard");
    }
  }, []);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        (process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000") + "/auth/login-attendee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
      } else {
        const data = await response.json();
        localStorage.setItem("token", data.access_token as string); // Store JWT token
        localStorage.setItem("role", "attendee");
        router.push("/user-dashboard"); // Navigate to dashboard or another page
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-lg p-6 space-y-4 shadow-[0px_0px_20px_4px_gray]">
        <h1 className="text-2xl sm:text-3xl text-white font-bold text-center">
          User Login
        </h1>

        <form className="space-y-3" onSubmit={handleLogin}>
          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            className="w-1/2 mx-auto block py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
