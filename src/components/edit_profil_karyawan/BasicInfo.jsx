import React from 'react';
import { User, Phone } from 'lucide-react';
import ProfilePhoto from './ProfilePhoto';

const BasicInfo = ({ formData, profilePhoto, onUploadPhoto, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <User className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Informasi Dasar</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <ProfilePhoto 
            profilePhoto={profilePhoto}
            formData={formData}
            onUploadPhoto={onUploadPhoto}
          />

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Lengkap */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800"
                />
              </div>

              {/* NIK */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  NIK
                </label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={onChange}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800"
                />
              </div>

              {/* No HP */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
                  <Phone className="w-4 h-4 mr-1 inline" />
                  No HP
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={onChange}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800"
                />
              </div>

              {/* Status */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
