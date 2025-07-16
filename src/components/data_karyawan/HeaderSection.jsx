// components/HeaderSection.js
import React from 'react';

function HeaderSection({ toggleSidebar }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-gray-800">DATA KARYAWAN</h1>
      <button
        onClick={toggleSidebar}
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
    </div>
  );
}

export default HeaderSection;