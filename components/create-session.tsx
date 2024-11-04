"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateSessionComponent() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined" || !localStorage) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin-login");
      return;
    }
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.back();
      return;
    }
  }, []);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [error, setError] = useState<string>("");
  async function handleCreateSession(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-lg p-6 space-y-4 shadow-[0px_0px_20px_4px_gray]">
        <h1 className="text-2xl sm:text-3xl text-white font-bold text-center">
          New Session
        </h1>

        <form className="space-y-3" onSubmit={handleCreateSession}>
          <label className="">
            <span>Start Time: </span>
            <input
              className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="datetime-local"
              required
              autoFocus
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>

          <label className="">
            <span>End Time: </span>
            <input
              className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="datetime-local"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>

          <label>
            <span>Address: </span>
            <input
              className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Address"
              required
            />
          </label>

          <button
            className="w-1/2 mx-auto block py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
