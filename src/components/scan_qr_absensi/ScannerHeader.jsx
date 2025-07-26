import React from "react";
import { FaQrcode } from "react-icons/fa";

const ScannerHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <FaQrcode className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Scan QR Absensi
            </h1>
            <p className="text-gray-600 text-sm">
              Arahkan kamera ke QR code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerHeader;
