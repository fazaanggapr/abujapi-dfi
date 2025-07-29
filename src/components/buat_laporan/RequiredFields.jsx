import React from "react";

const RequiredFields = ({ formData, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Informasi Wajib</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Masukkan deskripsi laporan..."
            className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Area*</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={onChange}
            placeholder="Masukkan area patroli..."
            className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Kode Lokasi</label>
          <input
            type="text"
            name="location_code"
            value={formData.location_code}
            onChange={onChange}
            className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default RequiredFields;