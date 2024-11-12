"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateSessionComponent() {
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

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleCreateSession(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin-login");
      return;
    }
    const latRegex = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/;
    const longRegex = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/;
    if (new Date(startTime) >= new Date(endTime)) {
      setError("End time must be after start time");
      return;
    }
    if (!latRegex.test(latitude) || !longRegex.test(longitude)) {
      setError("Invalid latitude or longitude");
      return;
    }
    try {
      const formattedStartTime = startTime.replace("T", " ") + ":00";
      const formattedEndTime = endTime.replace("T", " ") + ":00";
      const response = await fetch("http://localhost:8000/create-session", {
        method: "POST",
        body: JSON.stringify({
          tok: token,
          start_time: formattedStartTime,
          end_time: formattedEndTime,
          locs: [
            {
              address: address,
              longitude: parseFloat(longitude),
              latitude: parseFloat(latitude),
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        router.push("/admin-dashboard");
      } else {
        setError("Failed to create session");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  }

  const handleUseCurrentLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isUsingCurrentLocation = e.target.value === "current";
    setUseCurrentLocation(isUsingCurrentLocation);
    if (isUsingCurrentLocation) {
      const position: GeolocationPosition = await new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
          });
        }
      );
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    } else {
      setLatitude("");
      setLongitude("");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-lg p-6 space-y-4 shadow-[0px_0px_20px_4px_gray]">
        <h1 className="text-2xl sm:text-3xl text-white font-bold text-center">
          New Session
        </h1>

        <form className="space-y-3" onSubmit={handleCreateSession}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Start Time
            </label>
            <input
              type="datetime-local"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              End Time
            </label>
            <input
              type="datetime-local"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Address
            </label>
            <input
              type="text"
              autoFocus
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="1234 Main St, City, State, Zip"
              className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Do you want to use current location?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="current"
                  checked={useCurrentLocation}
                  onChange={handleUseCurrentLocationChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-200">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="manual"
                  checked={!useCurrentLocation}
                  onChange={handleUseCurrentLocationChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-200">No</span>
              </label>
            </div>
          </div>

          {!useCurrentLocation && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Latitude
              </label>
              <input
                type="text"
                required
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <label className="block text-sm font-medium text-gray-200">
                Longitude
              </label>
              <input
                type="text"
                required
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full bg-white text-gray-900 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          <button
            className="w-1/2 mx-auto block py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Create
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
