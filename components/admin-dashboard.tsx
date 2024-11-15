"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardComponent() {
  const [sessions, setSessions] = useState<string[][]>([]);
  const router = useRouter();
  useEffect(() => {
    const token = getCookie("token");
    const role = getCookie("role");
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
          (process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000") +
            "/get-sessions-created",
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
        setSessions(data["sessions"]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSessions();
  }, []);
  return (
    <div>
      <h1
        style={{ fontSize: "2rem", color: "#4A90E2", marginBottom: "20px" }}
        className="text-center"
      >
        ADMIN DASHBOARD
      </h1>
      <div className="flex flex-row justify-start">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-8 my-4 active:bg-blue-700"
          onClick={() => router.push("/create-session")}
        >
          New Session
        </button>
      </div>
      <h2 className="text-center font-bold text-xl">Sessions Created</h2>
      {sessions.map((session, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 mx-8 bg-slate-700 rounded-lg my-4 shadow-[4px_4px_4px_0px_rgb(0,0,0)] cursor-pointer"
          onClick={() => {
            router.push(`/admin-dashboard/${session[0]}`);
          }}
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
                timeZone: "UTC",
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
                timeZone: "UTC",
              }).format(new Date(session[2]))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
