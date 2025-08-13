import React from "react";

const HeaderSection = ({ onToggleSidebar }) => {
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

      {/* Teks "DATA KARYAWAN" */}
      <h1 className="text-3xl font-bold text-gray-800">
        DATA KARYAWAN
      </h1>
    </div>
  );
};

export default HeaderSection;
