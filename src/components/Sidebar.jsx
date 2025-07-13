import React, { useState } from 'react';
import { Shield, Home, FileText, QrCode, Calendar, User, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

 const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');
  navigate('/login');
};

  return (
    <>
      {/* Sidebar */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Security</h1>
                <p className="text-sm text-blue-600">Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="mb-6">
              <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                Main Menu
              </h2>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Dashboard</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Reports</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="font-medium">QR Scanner</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Attendance</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 relative">
            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign out</span>
                </button>
              </div>
            )}

            {/* User Profile */}
            <button 
              onClick={toggleProfileDropdown}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">CP</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500">employee</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default Sidebar;