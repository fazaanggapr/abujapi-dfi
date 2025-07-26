import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const StatusMessage = ({ message, status }) => {
  if (!message) return null;

  return (
    <div
      className={`bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 ${
        status === "success" ? "border-green-200" : "border-red-200"
      }`}
    >
      <div
        className={`bg-gradient-to-r p-6 ${
          status === "success"
            ? "from-green-500 to-emerald-600"
            : "from-red-500 to-red-600"
        }`}
      >
        <div className="flex items-center space-x-3">
          {status === "success" ? (
            <FaCheckCircle className="w-6 h-6 text-white" />
          ) : (
            <FaTimesCircle className="w-6 h-6 text-white" />
          )}
          <span className="text-white font-semibold">
            {status === "success" ? "Berhasil" : "Gagal"}
          </span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 font-medium leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default StatusMessage;