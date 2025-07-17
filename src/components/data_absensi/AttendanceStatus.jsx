// components/AttendanceStatus.js
import React from "react";
import { FaCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa";

const AttendanceStatus = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "present":
        return {
          icon: FaCheck,
          color: "text-green-600",
          bg: "bg-green-50",
          text: "Hadir",
        };
      case "absent":
        return {
          icon: FaTimes,
          color: "text-red-600",
          bg: "bg-red-50",
          text: "Tidak Hadir",
        };
      case "late":
        return {
          icon: FaExclamationTriangle,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          text: "Terlambat",
        };
      default:
        return {
          icon: FaExclamationTriangle,
          color: "text-gray-600",
          bg: "bg-gray-50",
          text: "Tidak Ada Data",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.bg}`}
    >
      <Icon className="mr-1 text-xs" />
      {config.text}
    </div>
  );
};

export default AttendanceStatus;