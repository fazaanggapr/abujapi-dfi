import React from "react";
import { User, Calendar, GraduationCap, Users, Activity, CreditCard } from "lucide-react";

const PersonalInfo = ({ formData, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Informasi Pribadi</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NIK */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1">NIK</label>
            <input
              type="text"
              name="nik"
              value={formData.nik || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Nama Lengkap */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Umur */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> Umur
            </label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Pendidikan */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <GraduationCap className="w-4 h-4 mr-1" /> Pendidikan
            </label>
            <input
              type="text"
              name="education"
              value={formData.education || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Status */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
            <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Users className="w-4 h-4 mr-1" /> Jenis Kelamin
            </label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Tinggi / Berat */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Activity className="w-4 h-4 mr-1" /> Tinggi / Berat
            </label>
            <input
              type="text"
              name="height"
              placeholder="Tinggi"
              value={formData.height || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              name="weight"
              placeholder="Berat"
              value={formData.weight || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Akun Bank */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <CreditCard className="w-4 h-4 mr-1" /> Akun Bank
            </label>
            <input
              type="text"
              name="bankAccount"
              value={formData.bankAccount || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
