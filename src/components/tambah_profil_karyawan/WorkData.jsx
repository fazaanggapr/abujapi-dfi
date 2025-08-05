// components/WorkData.jsx - EDITABLE VERSION
import React from 'react';
import { Briefcase, CheckCircle, Clock, MapPin } from "lucide-react";

const WorkData = ({ formData, onChange }) => {
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
        
        {/* Jabatan */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            <Briefcase className="w-4 h-4 inline mr-1" />
            Jabatan
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan jabatan..."
          />
        </div>

        {/* Lama Bekerja */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Lama Bekerja
          </label>
          <input
            type="text"
            name="work_duration"
            value={formData.work_duration}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contoh: 2 Tahun 3 Bulan"
          />
        </div>

        {/* Lokasi Penempatan */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Lokasi Penempatan
          </label>
          <input
            type="text"
            name="placement_location"
            value={formData.placement_location}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-md border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan lokasi penempatan..."
          />
        </div>
      </div>
    </div>
  );
};

export default WorkData;