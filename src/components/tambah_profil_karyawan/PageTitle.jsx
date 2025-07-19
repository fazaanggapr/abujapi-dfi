// components/PageTitle.jsx
import React from 'react';
import { User, CheckCircle } from 'lucide-react';

const PageTitle = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tambah Profil Karyawan</h1>
          <p className="text-slate-600 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Tambah Profil Karyawan</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;