// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/lihat-profil"
            className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white hover:text-white transition-colors shadow-md"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-slate-600">Profil Karyawan</p>
            <p className="font-semibold text-slate-800">Edit Profile</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;