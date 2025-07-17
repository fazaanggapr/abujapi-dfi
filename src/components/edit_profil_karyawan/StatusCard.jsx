// components/StatusCard.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';

const StatusCard = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-slate-800">Status Profil</p>
          <p className="text-sm text-slate-600">Informasi Terkini</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Kelengkapan</span>
          <span className="font-medium text-slate-800">95%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Terakhir Update</span>
          <span className="font-medium text-slate-800">Hari ini</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Status</span>
          <span className="font-medium text-emerald-600">Aktif</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;