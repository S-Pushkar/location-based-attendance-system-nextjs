"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserDashboardComponent() {
  const [attendanceData, setAttendanceData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/check-attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tok: token }),
        });

        if (response.ok) {
          const data = await response.json();

          const formattedData = Object.entries(data).map(([session, present]) => ({
            session,
            present: present ? "Yes" : "No",
          }));

          setAttendanceData(formattedData);
        } else {
          console.error("Failed to fetch attendance data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);


	const sendLocation = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Get user location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Check if current minute is divisible by 5
          const now = new Date();
          if (now.getMinutes() % 5 === 0) {
            // Send data to the backend
            await fetch("http://localhost:8000/current-location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tok: token,
                latitude: latitude,
                longitude: longitude,
              }),
            });
            console.log("Location sent:", { latitude, longitude });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } catch (error) {
      console.error("Error in sendLocation:", error);
    }
  };

  useEffect(() => {
    // Run `sendLocation` every minute
	sendLocation()
    const intervalId = setInterval(sendLocation, 60000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);
	
  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", color: "#4A90E2", marginBottom: "20px" }}>USER DASHBOARD</h1>
      <div style={{ display: "inline-block", textAlign: "center", width: "100%" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "15px" }}>User Attendance</h2>
        <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd", color: "#666" }}>Session</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ddd", color: "#666" }}>Present</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd",color: "#000000" }}>{entry.session}</td>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    color: entry.present === "Yes" ? "#2ECC71" : "#E74C3C",
                    fontWeight: "bold",
                  }}
                >
                  {entry.present}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
	  <div className="flex justify-center space-x-4 mt-6">
  <button
    className="w-1/2 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Active Sessions
  </button>

  <button
    className="w-1/2 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    My Sessions
  </button>
</div>

    </div>
  );
}
