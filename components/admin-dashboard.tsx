"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardComponent() {
  const [sessions, setSessions] = useState<string[][]>([]);
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      router.push("/admin-login");
      return;
    }
    if (role !== "admin") {
      router.back();
      return;
    }
    async function fetchSessions() {
      try {
        const response = await fetch(
          "http://localhost:8000/get-sessions-created",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tok: token,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSessions();
  }, []);
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl mx-8">Dashboard</h1>
      {sessions.map((session, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 mx-8 bg-slate-800 rounded-lg shadow-lg my-4"
        >
          <div>
            <h2 className="text-xl text-white">Session ID: {session[0]}</h2>
            <p className="text-gray-400">
              From:{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              }).format(new Date(session[1]))}
            </p>
            <p className="text-gray-400">
              To:{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              }).format(new Date(session[2]))}
            </p>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                router.push(`/admin-dashboard/${session[0]}`);
              }}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
