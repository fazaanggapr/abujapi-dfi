import React from 'react';
import { Menu } from 'lucide-react';

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Selamat pagi";
  if (hour >= 12 && hour < 15) return "Selamat siang";
  if (hour >= 15 && hour < 18) return "Selamat sore";
  return "Selamat malam";
};

const Header = ({ onMenuClick, profile }) => {
  return (
    <div className="bg-white mb-8">
      {/* Tombol Toggle Sidebar di atas */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Teks Greeting dan Nama Profile */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {profile?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Selamat datang di security management dashboard
        </p>
      </div>
    </div>
  );
};

export default Header;
