import React from 'react';
import { User, Menu } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <div className="bg-white mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Selamat malam, Cipher!
            </h1>
            <p className="text-gray-600 mt-1">
              Selamat datang di security management dashboard
            </p>
          </div>
        </div>
        {/* <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
          <User className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div> */}
      </div>
    </div>
  );
};

export default Header;