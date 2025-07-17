// components/Skills.jsx - EDITABLE VERSION
import React from 'react';
import { Award, Plus, Trash2, Edit3 } from 'lucide-react';

const Skills = ({ skills, onChange, onAdd, onRemove }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Keahlian</h3>
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
        {skills.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Award className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p>Belum ada keahlian yang ditambahkan</p>
            <p className="text-sm">Klik tombol "Tambah" untuk menambah keahlian</p>
          </div>
        ) : (
          skills.map((skill, index) => (
            <div
              key={index}
              className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
            >
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  {/* Skill Title */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      <Edit3 className="w-3 h-3 inline mr-1" />
                      Nama Keahlian
                    </label>
                    <input
                      type="text"
                      value={skill.title}
                      onChange={(e) => onChange(index, 'title', e.target.value)}
                      className="w-full px-2 py-1 text-sm rounded border border-slate-300 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Contoh: React.js Development"
                    />
                  </div>
                  
                  {/* Skill Description */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      value={skill.description}
                      onChange={(e) => onChange(index, 'description', e.target.value)}
                      className="w-full px-2 py-1 text-sm rounded border border-slate-300 text-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Contoh: Frontend framework expertise"
                    />
                  </div>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                  title="Hapus keahlian"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-4 pb-4 text-sm text-slate-500">
        <p>💡 Tips: Tambahkan keahlian yang relevan dengan pekerjaan Anda</p>
      </div>
    </div>
  );
};

export default Skills;