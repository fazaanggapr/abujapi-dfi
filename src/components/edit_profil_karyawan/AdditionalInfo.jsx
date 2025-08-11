import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const AdditionalInfo = ({ formData, onChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Informasi Tambahan</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 gap-4">
          {/* Alamat */}
          <div className="col-span-2 w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Alamat
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* No HP */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              No HP
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone_number || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Email */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <label className="block text-sm font-medium text-slate-600 mb-1 flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
