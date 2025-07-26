import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
      <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
      <span className="text-red-700 text-sm flex-1">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 font-bold text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;