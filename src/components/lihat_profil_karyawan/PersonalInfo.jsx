import React from "react";
import { User, Calendar, GraduationCap, Users, Activity, CreditCard } from "lucide-react";

const PersonalInfo = ({ employee }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            Informasi Pribadi
          </h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              NIK
            </label>
            <p className="text-slate-800 font-semibold text-sm">
              {employee?.nik}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Nama Lengkap
            </label>
            <p className="text-slate-800 font-semibold">
              {employee?.name}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Umur
            </label>
            <p className="text-slate-800 font-semibold">
              {employee?.age}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" />
              Pendidikan
            </label>
            <p className="text-slate-800 font-semibold">
              {employee?.education}
            </p>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              Status
            </label>
            <p className="text-emerald-800 font-semibold text-sm">
              {employee?.status}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Jenis Kelamin
            </label>
            <p className="text-slate-800 font-semibold">
              {employee?.gender}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Tinggi / Berat
            </label>
            <p className="text-slate-800 font-semibold">
              {employee?.height} / {employee?.weight}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              Akun Bank
            </label>
            <p className="text-slate-800 font-semibold">
              {employee?.bankAccount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;