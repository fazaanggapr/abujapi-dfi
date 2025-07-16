// components/WorkData.jsx
import React from 'react';
import { Briefcase, CheckCircle, Clock, MapPin } from 'lucide-react';

const WorkData = ({ formData }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <Briefcase className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            Data Pekerjaan
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Status Karyawan
          </label>
          <p className="text-emerald-800 font-semibold flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            {formData.employee_status}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Jabatan
          </label>
          <p className="text-slate-800 font-semibold">
            {formData.position}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
            <Clock className="w-4 h-4 mr-1" />
            Lama Bekerja
          </label>
          <p className="text-slate-800 font-semibold">
            {formData.work_duration}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Lokasi Penempatan
          </label>
          <p className="text-slate-800 font-semibold">
            {formData.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkData;