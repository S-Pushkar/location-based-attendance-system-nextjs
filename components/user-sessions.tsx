"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserSessionsComponent() {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !localStorage) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user-login");
      return;
    }
    const role = localStorage.getItem("role");
    if (role !== "attendee") {
      router.back();
      return;
    }
    const fetchSessions = async () => {
      try {
        const response = await axios.post(
          (process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000") + "/my-sessions", {
          tok: localStorage.getItem("token"),
        });

        // Assuming the response structure is correct
        if (response.data && response.data.sessions) {
          setSessions(response.data.sessions);
        }
      } catch (error) {
        console.error(error);
        // Optionally, redirect or show an error message
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col items-center py-5">
        <h1 className="text-2xl font-bold text-center text-blue-200">
          Joined Sessions
        </h1>
      </div>

      <table
        className="min-w-full bg-white border border-gray-300 rounded-md shadow-md"
      >
        <thead style={{ color: "#000000" }}>
          <tr>
            <th className="py-2 px-4 border-b text-left">
              Session ID
            </th>
            <th className="py-2 px-4 border-b text-left">
              Start Time
            </th>
            <th className="py-2 px-4 border-b text-left">
              End Time
            </th>
            <th className="py-2 px-4 border-b text-left">
              Admin ID
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "#000000" }}>
          {sessions.map((session, index) => (
            <tr key={index} className="cursor-pointer hover:bg-blue-100">
              <td className="py-2 px-4 border-b">{session[0]}</td>
              <td className="py-2 px-4 border-b">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }).format(new Date(session[1]))}
              </td>
              <td className="py-2 px-4 border-b">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }).format(new Date(session[2]))}
              </td>
              <td className="py-2 px-4 border-b">{session[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center pt-10 pb-10">
        {" "}
        {/* Adds padding-top and centers the button */}
        {/* <button
    className="w-1/2 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={toDashboard}
  >
    Dashboard
  </button> */}
      </div>
    </div>
  );
}
