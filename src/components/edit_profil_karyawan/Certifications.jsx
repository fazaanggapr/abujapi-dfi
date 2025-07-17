import React, { useState } from 'react';
import { Award, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

const EditableCertifications = ({ initialCertifications = [] }) => {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', year: '' });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({
      name: certifications[index].name,
      year: certifications[index].year
    });
  };

  const handleSave = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...formData };
    setCertifications(updatedCertifications);
    setEditingIndex(null);
    setFormData({ name: '', year: '' });
  };

  const handleDelete = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const handleAdd = () => {
    if (formData.name && formData.year) {
      setCertifications([...certifications, { ...formData }]);
      setFormData({ name: '', year: '' });
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setShowAddForm(false);
    setFormData({ name: '', year: '' });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">
              Sertifikasi
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Tambah</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isEditing 
                  ? 'bg-red-500/20 hover:bg-red-500/30' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">Selesai</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">Edit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Form tambah sertifikat */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Tambah Sertifikat Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nama Sertifikat
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: AWS Cloud Practitioner"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tahun
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2024"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleAdd}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Simpan</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-slate-300 hover:bg-slate-400 text-slate-700 px-4 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Batal</span>
              </button>
            </div>
          </div>
        )}

        {/* Grid sertifikat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 group"
            >
              {/* Tombol edit dan hapus */}
              {isEditing && (
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Form edit inline */}
              {editingIndex === index ? (
                <div className="space-y-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex space-x-1 justify-center">
                    <button
                      onClick={() => handleSave(index)}
                      className="p-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                    >
                      <Save className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 bg-slate-400 hover:bg-slate-500 text-white rounded transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-800">
                    {cert.name}
                  </p>
                  <p className="text-xs text-slate-600">{cert.year}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pesan jika tidak ada sertifikat */}
        {certifications.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">Belum ada sertifikat</p>
            <p className="text-slate-400 text-sm">Klik tombol "Tambah" untuk menambahkan sertifikat pertama</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Contoh penggunaan dengan data awal
const App = () => {
  const initialCertifications = [
    { name: 'AWS Cloud Practitioner', year: '2024' },
    { name: 'Google Cloud Associate', year: '2023' },
    { name: 'Microsoft Azure Fundamentals', year: '2023' },
    { name: 'CompTIA Security+', year: '2022' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <EditableCertifications initialCertifications={initialCertifications} />
      </div>
    </div>
  );
};

export default App;