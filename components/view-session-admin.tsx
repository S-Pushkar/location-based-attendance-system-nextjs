"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type attendee = {
  email?: string;
  fname?: string;
  lname?: string;
};

export default function ViewSessionAdminComponent() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined" || !localStorage) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin-login");
      return;
    }
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.back();
      return;
    }
  }, []);
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
    if (typeof window === "undefined" || !localStorage) {
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
          return;
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
      <h1 className="text-2xl sm:text-3xl my-2">Session {sessionId}</h1>
      {session.starttime ? (
        <h2 className="md:text-xl sm:text-lg text-gray-400 my-2">
          <span className="text-gray-300">From:</span> {session.starttime}
        </h2>
      ) : null}
      {session.endtime ? (
        <h2 className="md:text-xl sm:text-lg text-gray-400 my-2">
          <span className="text-gray-300">To:</span> {session.endtime}
        </h2>
      ) : null}
      {session.address ? (
        <span className="md:text-xl sm:text-lg text-gray-400 my-2">
          <span className="text-gray-300">Address:</span> {session.address}
        </span>
      ) : null}
      {session.latitude && session.longitude ? (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${session.latitude},${session.longitude}`}
          className="mx-8 text-blue-400 underline"
          target="_blank"
        >
          (View on map)
        </a>
      ) : null}
      <h2 className="text-xl sm:text-2xl my-2">Attendees:</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead style={{ color: "#000000" }}>
          <tr>
            <th className="py-2 px-4 border-b text-center text-sm md:text-base">
              Name
            </th>
            <th className="py-2 px-4 border-b text-center text-sm md:text-base">
              Email
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "#000000" }}>
          {session.attendees?.map((session, index) => (
            <tr key={index} className="hover:bg-blue-100 text-xs md:text-sm">
              <td className="py-2 px-4 border-b text-center">
                {session.fname}&nbsp;{session.lname}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {session.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
