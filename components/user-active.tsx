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

  return (
    <div className="mt-6 px-2 sm:px-6">
      <h1 className="text-2xl font-bold text-center text-blue-200 mb-6">
        Active Sessions
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead style={{ color: "#000000" }}>
            <tr>
              <th className="py-2 px-4 border-b text-center text-sm md:text-base">
                Session ID
              </th>
              <th className="py-2 px-4 border-b text-center text-sm md:text-base">
                Admin ID
              </th>
              <th className="py-2 px-4 border-b text-center text-sm md:text-base">
                Start Time
              </th>
              <th className="py-2 px-4 border-b text-center text-sm md:text-base">
                End Time
              </th>
              <th className="py-2 px-4 border-b text-center text-sm md:text-base">
                Location
              </th>
              <th className="py-2 px-4 border-b text-center text-sm md:text-base"></th>
            </tr>
          </thead>
          <tbody style={{ color: "#000000" }}>
            {sessions.map((session, index) => (
              <tr key={index} className="hover:bg-blue-100 text-xs md:text-sm">
                <td className="py-2 px-4 border-b text-center">{session[0]}</td>
                <td className="py-2 px-4 border-b text-center">{session[3]}</td>
                <td className="py-2 px-4 border-b text-center">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  }).format(new Date(session[1]))}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  }).format(new Date(session[2]))}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${session[4]},${session[5]}`}
                    target="_blank"
                    className="text-blue-400 underline"
                  >
                    View
                  </a>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg active:bg-blue-700"
                    onClick={() => handleJoinSession(session[0])}
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
