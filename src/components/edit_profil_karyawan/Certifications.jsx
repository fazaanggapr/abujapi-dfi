import React, { useState } from "react";
import { Award, Pencil, Trash2 } from "lucide-react";

const Certifications = ({ certifications, setCertifications }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const removeCertificate = (index) => {
    const updated = [...certifications];
    updated.splice(index, 1);
    setCertifications(updated);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Sertifikasi</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:underline text-sm flex items-center"
        >
          <Pencil className="w-4 h-4 mr-1" /> {isEditing ? "Selesai" : "Edit"}
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
            >
              {isEditing && (
                <button
                  onClick={() => removeCertificate(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <input
                type="text"
                placeholder="Nama Sertifikat"
                value={cert.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
                readOnly={!isEditing}
                className={`w-full border px-2 py-1 text-sm text-center rounded-md mb-1 ${
                  isEditing
                    ? "bg-white text-slate-800 border-gray-300"
                    : "bg-transparent text-slate-700 border-transparent"
                }`}
              />
              <input
                type="text"
                placeholder="Tahun"
                value={cert.year}
                onChange={(e) =>
                  handleChange(index, "year", e.target.value)
                }
                readOnly={!isEditing}
                className={`w-full border px-2 py-1 text-xs text-center rounded-md ${
                  isEditing
                    ? "bg-white text-slate-600 border-gray-300"
                    : "bg-transparent text-slate-600 border-transparent"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
