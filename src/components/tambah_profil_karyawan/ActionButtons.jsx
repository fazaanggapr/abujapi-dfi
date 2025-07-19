// components/ActionButtons.jsx
import React from "react";
import { Save, X } from "lucide-react";

const ActionButtons = ({ onSave, onCancel }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onSave}
          className="bg-gradient-to-r from-green-600 to-green-600 
          hover:from-green-700 hover:to-green-700 
          text-white font-bold py-3 px-4 rounded-xl 
          transition-all duration-200 shadow-lg hover:shadow-xl 
          flex items-center justify-center space-x-2 transform hover:-translate-y-1 
          focus:outline-none focus:ring-0 focus:text-white hover:text-white"
        >
          <Save className="w-4 h-4" />
          <span>SIMPAN</span>
        </button>

        <button
          onClick={onCancel}
          className="bg-gradient-to-r from-red-600 to-red-700 
          hover:from-red-700 hover:to-red-800 
          text-white font-bold py-3 px-4 rounded-xl 
          transition-all duration-200 shadow-lg hover:shadow-xl 
          flex items-center justify-center space-x-2 transform hover:-translate-y-1 
          focus:outline-none focus:ring-0 focus:text-white hover:text-white"
        >
          <X className="w-4 h-4" />
          <span>BATAL</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
