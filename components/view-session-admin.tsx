"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type attendee = {
  email?: string;
  fname?: string;
  lname?: string;
};

export default function ViewSessionAdminComponent() {
  const params = useParams<{ id: string }>();
  const sessionId = params.id;
  const [session, setSession] = useState<{
    starttime?: string;
    endtime?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
    attendees?: attendee[];
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
        data.starttime = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(data.starttime));
        data.endtime = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(data.endtime));
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
      <h1 className="text-2xl sm:text-3xl">Session {sessionId}</h1>
      {session.starttime ? (
        <h2 className="text-xl text-gray-400">
          <span className="text-gray-300">From:</span> {session.starttime}
        </h2>
      ) : null}
      {session.endtime ? (
        <h2 className="text-xl text-gray-400">
          <span className="text-gray-300">To:</span> {session.endtime}
        </h2>
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
      <h2 className="text-xl sm:text-2xl">Attendees:</h2>
      <table className="w-full border-2 border-gray-400 mt-2 mb-14">
        <thead>
          <tr>
            <th className="text-center border border-gray-400 p-2">Name</th>
            <th className="text-center border border-gray-400 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {session.attendees?.map((attendee, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-700" : ""}>
              <td className="text-center border border-gray-400 p-2">
                {attendee.fname}&nbsp;{attendee.lname}
              </td>
              <td className="text-center border border-gray-400 p-2">
                {attendee.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
