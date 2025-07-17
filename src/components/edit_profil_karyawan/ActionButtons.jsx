// components/ActionButtons.jsx
import React from 'react';
import { Save, X } from 'lucide-react';

const ActionButtons = ({ onSave, onCancel }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onSave}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <Save className="w-5 h-5" />
        <span>Simpan Perubahan</span>
      </button>
      
      <button
        onClick={onCancel}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <X className="w-5 h-5" />
        <span>Batal Edit</span>
      </button>
    </div>
  );
};

export default ActionButtons;