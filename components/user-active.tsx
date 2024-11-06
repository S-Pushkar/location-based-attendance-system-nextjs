"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserActiveComponent() {
  const [sessions, setSessions] = useState([]);
  const router = useRouter();

  // Fetch active sessions on page load
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
    const fetchActiveSessions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/active-sessions",
          {
            tok: token,
          }
        );
        setSessions(response.data.sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchActiveSessions();
  }, []);

  // Handle row click to join session
  const handleJoinSession = async (sessionId: string) => {
    const position: GeolocationPosition = await new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
        });
      }
    );

    const latitude = position.coords.latitude.toString();
    const longitude = position.coords.longitude.toString();

    try {
      const response = await fetch("http://localhost:8000/join-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tok: localStorage.getItem("token"),
          sessionid: sessionId,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      });
      if (response.status === 400) {
        alert("You are not located within the session area");
        return;
      }
      if (response.status !== 200) {
        alert("Failed to join session");
        return;
      }
      alert(`Joined session with ID ${sessionId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error joining session:", error);
    }
  };

  const toDashboard = async () => {
    console.log("sessions");
    router.push("/user-dashboard");
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-center text-blue-200 mb-6">Active Sessions</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead style={{ color: "#000000" }}>
          <tr>
            <th className="py-2 px-4 border-b text-left">Session ID</th>
            <th className="py-2 px-4 border-b text-left">Start Time</th>
            <th className="py-2 px-4 border-b text-left">End Time</th>
            <th className="py-2 px-4 border-b text-left">Admin ID</th>
          </tr>
        </thead>
        <tbody style={{ color: "#000000" }}>
          {sessions.map((session, index) => (
            <tr
              key={index}
              onClick={() => handleJoinSession(session[0])}
              className="cursor-pointer hover:bg-blue-100"
            >
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
      <div className="flex justify-center pt-10">
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
