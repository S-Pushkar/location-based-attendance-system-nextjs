"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !localStorage) {
      return;
    }
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsSignedIn(true);
    }
    if (role === "attendee") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, []);
  const router = useRouter();
  return (
    <div
      className="p-8 flex flex-row justify-between bg-slate-700 mb-4"
      style={{ zIndex: 10, position: "relative" }}
    >
      <h1 className="md:text-4xl sm:text-xl text-blue-400">
        <Link href="/">Attendance System</Link>
      </h1>
      <button
        className="p-2 bg-blue-400 text-white rounded-lg"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <Image
          className="aspect-square"
          src="/assets/Bars3.svg"
          alt="Logo"
          width={25}
          height={25}
        />

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
            <ul className="flex flex-col text-blue-800">
              {!isSignedIn ? (
                <>
                  <Link href="/admin-login">
                    <li className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer rounded-lg">
                      Admin Log In
                    </li>
                  </Link>
                  <Link href="/admin-signup">
                    <li className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer rounded-lg">
                      Admin Sign Up
                    </li>
                  </Link>
                  <Link href="/user-login">
                    <li className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer rounded-lg">
                      User Log In
                    </li>
                  </Link>
                  <Link href="/user-signup">
                    <li className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer rounded-lg">
                      User Sign Up
                    </li>
                  </Link>
                </>
              ) : (
                <Link href={isUser ? "/user-dashboard" : "/admin-dashboard"}>
                  <li className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer rounded-lg">
                    Dashboard
                  </li>
                </Link>
              )}
              {isSignedIn && (
                <li
                  className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer rounded-lg text-red-500"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    setIsSignedIn(false);
                    router.push("/");
                  }}
                >
                  Log Out
                </li>
              )}
            </ul>
          </div>
        )}
      </button>
    </div>
  );
}
