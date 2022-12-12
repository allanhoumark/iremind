// remix navigation component that uses tailwindcss

import { Link } from "@remix-run/react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <Link to="/">Remix</Link>
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className={`block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 ${
              location.pathname === "/" ? "text-white" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/appointment/add"
            className={`block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 ${
              location.pathname === "/kalender" ? "text-white" : ""
            }`}
          >
            Ny aftale
          </Link>
        </div>
      </div>
    </nav>
  );
}
