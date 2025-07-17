import React from 'react';
import { User, LogOut } from 'lucide-react';

const ProfileDropdown = ({ 
  isOpen, 
  onViewProfile, 
  onLogout 
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
      <button
        onClick={onViewProfile}
        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <User className="w-4 h-4" />
        <span className="text-sm font-medium">Profil</span>
      </button>
      <button
        onClick={onLogout}
        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium">Sign out</span>
      </button>
    </div>
  );
};

export default ProfileDropdown;