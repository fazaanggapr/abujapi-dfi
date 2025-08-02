// components/ImageModal.jsx
import React from "react";

function ImageModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden max-w-2xl w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>
        <img src={imageUrl} alt="Report" className="w-full h-auto max-h-[80vh]" />
      </div>
    </div>
  );
}

export default ImageModal;
