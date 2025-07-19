import React from "react";
import { Briefcase, Award, Trash2, Plus } from "lucide-react";

const WorkHistoryAndSkills = ({
  workHistory,
  setWorkHistory,
  skills,
  setSkills,
}) => {
  const handleWorkChange = (index, field, value) => {
    const updated = [...workHistory];
    updated[index][field] = value;
    setWorkHistory(updated);
  };

  const addWorkHistory = () => {
    const newWork = {
      company: "",
      position: "",
      period: "",
    };
    setWorkHistory([...workHistory, newWork]);
  };

  const removeWorkHistory = (index) => {
    const updated = [...workHistory];
    updated.splice(index, 1);
    setWorkHistory(updated);
  };

  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const addSkill = () => {
    const newSkill = {
      title: "",
      description: "",
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Work History */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Riwayat Kerja</h3>
          </div>
          <button
            onClick={addWorkHistory}
            className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-lg flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" /> Tambah
          </button>
        </div>
        <div className="p-4 space-y-3">
          {workHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Belum ada riwayat kerja</p>
              <p className="text-sm">
                Klik "Tambah" untuk menambahkan riwayat kerja
              </p>
            </div>
          ) : (
            workHistory.map((work, index) => (
              <div
                key={index}
                className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 space-y-2 relative"
              >
                <button
                  onClick={() => removeWorkHistory(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <input
                  name="company"
                  placeholder="Nama Perusahaan"
                  value={work.company}
                  onChange={(e) =>
                    handleWorkChange(index, "company", e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  name="position"
                  placeholder="Jabatan"
                  value={work.position}
                  onChange={(e) =>
                    handleWorkChange(index, "position", e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  name="period"
                  placeholder="Periode (misal: Jan 2020 - Des 2022)"
                  value={work.period}
                  onChange={(e) =>
                    handleWorkChange(index, "period", e.target.value)
                  }
                  className="w-full text-xs border border-gray-300 px-3 py-2 rounded-md text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Keahlian</h3>
          </div>
          <button
            onClick={addSkill}
            className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-lg flex items-center transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" /> Tambah
          </button>
        </div>
        <div className="p-4 space-y-3">
          {skills.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Belum ada keahlian</p>
              <p className="text-sm">
                Klik "Tambah" untuk menambahkan keahlian
              </p>
            </div>
          ) : (
            skills.map((skill, index) => (
              <div
                key={index}
                className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 space-y-2 relative"
              >
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <input
                  name="title"
                  placeholder="Nama Keahlian"
                  value={skill.title}
                  onChange={(e) =>
                    handleSkillChange(index, "title", e.target.value)
                  }
                  className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <input
                  name="description"
                  placeholder="Deskripsi keahlian (opsional)"
                  value={skill.description}
                  onChange={(e) =>
                    handleSkillChange(index, "description", e.target.value)
                  }
                  className="w-full text-xs border border-gray-300 px-3 py-2 rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryAndSkills;
