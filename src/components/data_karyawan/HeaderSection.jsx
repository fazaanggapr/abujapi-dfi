// components/PageHeader.js
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const HeaderSection = ({ onToggleSidebar }) => {
  return (
    <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-800">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-800 bg-white rounded-md shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        DATA KARYAWAN
      </h1>
    </div>
  );
};

export default HeaderSection;
