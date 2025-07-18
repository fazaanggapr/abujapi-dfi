// components/DetailedInfo.jsx - EDITABLE VERSION
import React from 'react';
import {
  Activity,
  MapPin,
  Users,
  Calendar,
  GraduationCap,
  CreditCard,
  Mail,
  Fingerprint
} from 'lucide-react';

const DetailedInfo = ({ formData, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            Detail Informasi
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Alamat */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Alamat
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan alamat lengkap..."
              />
            </div>

            {/* Jenis Kelamin */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Jenis Kelamin
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Umur */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Umur
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={onChange}
                min="17"
                max="65"
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan umur..."
              />
            </div>

            {/* Tinggi & Berat */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                <Activity className="w-4 h-4 inline mr-1" />
                Tinggi & Berat Badan
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tinggi (cm)"
                  />
                  <span className="text-xs text-slate-500">cm</span>
                </div>
                <div>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Berat (kg)"
                  />
                  <span className="text-xs text-slate-500">kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Pendidikan */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                <GraduationCap className="w-4 h-4 inline mr-1" />
                Pendidikan
              </label>
              <select
                name="education"
                value={formData.education}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih pendidikan</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA/SMK">SMA/SMK</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
            </div>

            {/* Akun Bank */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                <CreditCard className="w-4 h-4 inline mr-1" />
                Akun Bank
              </label>
              <input
                type="text"
                name="bank_account"
                value={formData.bank_account}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: BCA - 1234567890"
              />
            </div>

            {/* Email */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="nama@email.com"
              />
            </div>

            {/* Fingerprint Icon */}
            <div className="flex justify-center mt-6">
              <div className="w-20 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                <Fingerprint className="w-10 h-10 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedInfo;