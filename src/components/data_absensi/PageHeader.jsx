import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const PageHeader = ({ selectedDate, onToggleSidebar }) => {
  const monthInfo = {
    month: selectedDate.toLocaleDateString("id-ID", { month: "long" }),
    year: selectedDate.getFullYear(),
  };

  return (
    <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
      {/* Tombol Toggle Sidebar di atas */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-800 rounded-md"
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
      </div>

      {/* Teks "DATA ABSENSI" dan Kalender */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          DATA ABSENSI
        </h1>
        <p className="text-gray-500 text-sm flex items-center">
          <FaCalendarAlt className="mr-2" />
          <span>
            {monthInfo.month} {monthInfo.year}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
