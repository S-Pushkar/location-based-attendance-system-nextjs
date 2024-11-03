"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserSessionsComponent() {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
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
        const response = await axios.post('http://localhost:8000/my-sessions', {
          tok: localStorage.getItem("token"),
        });

        // Assuming the response structure is correct
        if (response.data && response.data.sessions) {
          setSessions(response.data.sessions);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        // Optionally, redirect or show an error message
      }
    };

    fetchSessions();
  }, []);
  
  const toDashboard = async () => {
	console.log("sessions")
	router.push("/user-dashboard");
	}

  return (
    <div className="overflow-x-auto">
	<div className="flex flex-col items-center py-5"> 
  <h1 className="text-2xl font-bold text-center text-blue-200">Joined Sessions</h1>
</div>

      <table className="min-w-full divide-y divide-gray-200" style={{color: "#000000" }}>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Session ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Admin ID
            </th>
          </tr>
        </thead >
        <tbody className="bg-white divide-y divide-gray-200">
          {sessions.map((session, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{session[0]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{session[1]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{session[2]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{session[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
	  <div className="flex justify-center pt-10 pb-10"> {/* Adds padding-top and centers the button */}
  <button
    className="w-1/2 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={toDashboard}
  >
    Dashboard
  </button>
</div>
    </div>
  );
}
