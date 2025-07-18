// src/components/ActionButtons.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const ActionButtons = ({ onDelete, editLink = "/edit-profil-karyawan" }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Tombol Edit */}
        <Link
          to={editLink}
          className="bg-gradient-to-r from-orange-600 to-orange-600 
          hover:from-orange-700 hover:to-orange-700 
          text-white font-bold py-3 px-4 rounded-xl 
          transition-all duration-200 shadow-lg hover:shadow-xl 
          flex items-center justify-center space-x-2 transform hover:-translate-y-1 
          focus:outline-none focus:ring-0 focus:text-white hover:text-white"
        >
          <Edit className="w-4 h-4" />
          <span>EDIT</span>
        </Link>

        {/* Tombol Hapus */}
        <button
          onClick={onDelete}
          className="bg-gradient-to-r from-red-600 to-red-700 
          hover:from-red-700 hover:to-red-800 
          text-white font-bold py-3 px-4 rounded-xl 
          transition-all duration-200 shadow-lg hover:shadow-xl 
          flex items-center justify-center space-x-2 transform hover:-translate-y-1 
          focus:outline-none focus:ring-0 focus:text-white hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
          <span>HAPUS</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
