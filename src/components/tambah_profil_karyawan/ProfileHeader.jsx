// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
      <div className="flex items-center justify-start p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm text-slate-600">Profil Karyawan</p>
            <p className="font-semibold text-slate-800">Ciphera</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
