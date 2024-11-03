"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewSessionAdminComponent() {
  const params = useParams<{ id: string }>();
  const sessionId = params.id;
  const [session, setSession] = useState<{
    starttime?: string;
    endtime?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
  }>({});
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const token = localStorage.getItem("token");
    async function fetchSession() {
      try {
        const response = await fetch(
          "http://localhost:8000/get-session-attendees",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tok: token,
              sessionid: sessionId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const data = await response.json();
        setSession(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSession();
  }, [sessionId]);
  return (
    <div className="mx-8">
      <h1 className="text-2xl sm:text-3xl">
        Session {sessionId}
      </h1>
      {session.starttime ? (
        <h2 className="text-xl text-gray-400">
          <span className="text-gray-300">From:</span> {session.starttime}
        </h2>
      ) : null}
      {session.endtime ? (
        <h2 className="text-xl text-gray-400"><span className="text-gray-300">To:</span> {session.endtime}</h2>
      ) : null}
      {session.address ? (
        <span className="text-xl text-gray-400">
          <span className="text-gray-300">Address:</span> {session.address}
        </span>
      ) : null}
      {session.latitude && session.longitude ? (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${session.latitude},${session.longitude}`}
          className="mx-8 text-blue-400 underline"
        >
          (View on map)
        </a>
      ) : null}
    </div>
  );
}
