import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
        <FaSpinner className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Memproses Absensi
        </h3>
        <p className="text-gray-600">Mohon tunggu sebentar...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;