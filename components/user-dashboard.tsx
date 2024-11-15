"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type AttendanceData = {
  sessionId: string;
  startTime: string;
  endTime: string;
  adminId: string;
  latitude: number;
  longitude: number;
};

export default function UserDashboardComponent() {
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
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
    async function fetchAttendedSessions() {
      try {
        const response = await fetch(
          (process.env.API_ENDPOINT || "http://localhost:8000") + "/get-attended-sessions",
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
          throw new Error("Failed to fetch attended sessions");
        }
        const data = await response.json();
        const formattedData = data?.sessions.map((session: string) => ({
          sessionId: session[0],
          startTime: session[1],
          endTime: session[2],
          adminId: session[3],
          latitude: parseFloat(session[4]),
          longitude: parseFloat(session[5]),
        }));
        setAttendanceData(formattedData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAttendedSessions();
  }, []);

  return (
    <div>
      <h1
        style={{ fontSize: "2rem", color: "#4A90E2", marginBottom: "20px" }}
        className="text-center"
      >
        USER DASHBOARD
      </h1>
      <div className="flex flex-row justify-start">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-8 my-4 active:bg-blue-700"
          onClick={() => router.push("/user-active")}
        >
          Join Session
        </button>
      </div>
      <h2 className="text-center font-bold text-xl">Sessions Joined</h2>
      {attendanceData.map((session, index) => (
        <a
          key={index}
          href={`https://www.google.com/maps/search/?api=1&query=${session.latitude},${session.longitude}`}
          target="_blank"
        >
          <div className="flex items-center justify-between p-4 mx-8 bg-slate-700 rounded-lg my-4 shadow-[4px_4px_4px_0px_rgb(0,0,0)]">
            <div>
              <h2 className="text-xl text-white">
                Session ID: {session.sessionId}
              </h2>
              <p className="text-gray-400">Admin ID: {session.adminId}</p>
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
                }).format(new Date(session.startTime))}
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
                }).format(new Date(session.endTime))}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
