// components/WorkHistory.jsx - EDITABLE VERSION
import React from 'react';
import { Briefcase, Plus, Trash2, Building, User, Calendar } from 'lucide-react';

const WorkHistory = ({ workHistory, onChange, onAdd, onRemove }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Riwayat Kerja</h3>
          </div>
          <button
            onClick={onAdd}
            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Tambah</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {workHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Briefcase className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p>Belum ada riwayat kerja yang ditambahkan</p>
            <p className="text-sm">Klik tombol "Tambah" untuk menambah riwayat kerja</p>
          </div>
        ) : (
          workHistory.map((work, index) => (
            <div
              key={index}
              className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mt-1 flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      <Building className="w-3 h-3 inline mr-1" />
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      value={work.company}
                      onChange={(e) => onChange(index, 'company', e.target.value)}
                      className="w-full px-2 py-1 text-sm rounded border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: PT. Teknologi Maju"
                    />
                  </div>
                  
                  {/* Position */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      <User className="w-3 h-3 inline mr-1" />
                      Posisi/Jabatan
                    </label>
                    <input
                      type="text"
                      value={work.position}
                      onChange={(e) => onChange(index, 'position', e.target.value)}
                      className="w-full px-2 py-1 text-sm rounded border border-slate-300 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: Frontend Developer"
                    />
                  </div>
                  
                  {/* Period */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Periode Kerja
                    </label>
                    <input
                      type="text"
                      value={work.period}
                      onChange={(e) => onChange(index, 'period', e.target.value)}
                      className="w-full px-2 py-1 text-sm rounded border border-slate-300 text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: 2022 - Sekarang"
                    />
                  </div>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                  title="Hapus riwayat kerja"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-4 pb-4 text-sm text-slate-500">
        <p>💡 Tips: Urutkan dari pekerjaan terbaru ke yang lama</p>
      </div>
    </div>
  );
};

export default WorkHistory;