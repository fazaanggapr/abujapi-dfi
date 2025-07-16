// components/Certifications.jsx
import React from 'react';
import { Award } from 'lucide-react';

const Certifications = ({ certifications }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            Sertifikasi
          </h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-medium text-slate-800">
                {cert.name}
              </p>
              <p className="text-xs text-slate-600">{cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;