import React from 'react';
import { Shield } from 'lucide-react';

const SidebarHeader = ({ onClose }) => {
  return (
    <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
      <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
        <Shield className="w-5 h-5 text-white" />
      </div>
      <div className="flex-grow">
        <h1 className="text-lg font-semibold text-gray-900">Security</h1>
        <p className="text-sm text-blue-600">Management</p>
      </div>
      <button
        onClick={onClose}
        className="lg:hidden p-2 ml-auto text-gray-500 hover:text-black"
        aria-label="Close sidebar"
      >
        ✕
      </button>
    </div>
  );
};

export default SidebarHeader;