import React from "react";
import { FaQrcode } from "react-icons/fa";

const ScannerHeader = ({ onToggleSidebar }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
      <div className="w-full px-6 py-8">
        <div className="flex items-center space-x-3">
          {/* Tombol Toggle Sidebar di sebelah kiri icon QR */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-800 bg-white rounded-md shadow"
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
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <FaQrcode className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Scan QR Absensi
            </h1>
            <p className="text-gray-600 text-sm">Arahkan kamera ke QR code</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerHeader;
