import React from "react";
import { Award, Plus, Trash2 } from "lucide-react";

const Certifications = ({ certifications, setCertifications }) => {
  const handleChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const addCertificate = () => {
    const newCertificate = {
      name: "",
      year: "",
    };
    setCertifications([...certifications, newCertificate]);
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
        <div className="flex items-center space-x-2">
          <button
            onClick={addCertificate}
            className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-lg flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" /> Tambah
          </button>
        </div>
      </div>

      <div className="p-6">
        {certifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Belum ada sertifikasi</p>
            <p className="text-sm">
              Klik "Tambah" untuk menambahkan sertifikasi
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="relative text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <button
                  onClick={() => removeCertificate(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Nama Sertifikat"
                  value={cert.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 text-sm text-center rounded-md mb-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Tahun"
                    value={cert.year}
                    onChange={(e) =>
                      handleChange(index, "year", e.target.value)
                    }
                    className="w-full border border-gray-300 px-3 py-2 text-sm text-center rounded-md mb-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
