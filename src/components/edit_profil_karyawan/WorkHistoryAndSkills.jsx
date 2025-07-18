import React, { useState } from "react";
import { Briefcase, Award, Trash2, Pencil } from "lucide-react";

const WorkHistoryAndSkills = ({
  workHistory,
  setWorkHistory,
  skills,
  setSkills,
}) => {
  // State tambahan
  const [isEditingWork, setIsEditingWork] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  const handleWorkChange = (index, field, value) => {
    const updated = [...workHistory];
    updated[index][field] = value;
    setWorkHistory(updated);
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
            onClick={() => setIsEditingWork(!isEditingWork)}
            className="text-blue-600 hover:underline text-sm flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" /> {isEditingWork ? "Selesai" : "Edit"}
          </button>
        </div>
        <div className="p-4 space-y-3">
          {workHistory.map((work, index) => (
            <div
              key={index}
              className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 space-y-2 relative"
            >
              {isEditingWork && (
                <button
                  onClick={() => removeWorkHistory(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <input
                readOnly={!isEditingWork}
                name="company"
                placeholder="Perusahaan"
                value={work.company}
                onChange={(e) =>
                  handleWorkChange(index, "company", e.target.value)
                }
                className={`w-full text-sm border px-3 py-1 rounded-md ${
                  isEditingWork
                    ? "text-slate-800 border-gray-300"
                    : "bg-transparent text-slate-700 border-transparent"
                }`}
              />
              <input
                readOnly={!isEditingWork}
                name="position"
                placeholder="Jabatan"
                value={work.position}
                onChange={(e) =>
                  handleWorkChange(index, "position", e.target.value)
                }
                className={`w-full text-sm border px-3 py-1 rounded-md ${
                  isEditingWork
                    ? "text-slate-600 border-gray-300"
                    : "bg-transparent text-slate-600 border-transparent"
                }`}
              />
              <input
                readOnly={!isEditingWork}
                name="period"
                placeholder="Periode"
                value={work.period}
                onChange={(e) =>
                  handleWorkChange(index, "period", e.target.value)
                }
                className={`w-full text-xs border px-3 py-1 rounded-md ${
                  isEditingWork
                    ? "text-slate-500 border-gray-300"
                    : "bg-transparent text-slate-500 border-transparent"
                }`}
              />
            </div>
          ))}
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
            onClick={() => setIsEditingSkills(!isEditingSkills)}
            className="text-blue-600 hover:underline text-sm flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" /> {isEditingSkills ? "Selesai" : "Edit"}
          </button>
        </div>
        <div className="p-4 space-y-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 space-y-2 relative"
            >
              {isEditingSkills && (
                <button
                  onClick={() => removeSkill(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <input
                readOnly={!isEditingSkills}
                name="title"
                placeholder="Keahlian"
                value={skill.title}
                onChange={(e) =>
                  handleSkillChange(index, "title", e.target.value)
                }
                className={`w-full text-sm border px-3 py-1 rounded-md ${
                  isEditingSkills
                    ? "text-slate-800 border-gray-300"
                    : "bg-transparent text-slate-800 border-transparent"
                }`}
              />
              <input
                readOnly={!isEditingSkills}
                name="description"
                placeholder="Deskripsi"
                value={skill.description}
                onChange={(e) =>
                  handleSkillChange(index, "description", e.target.value)
                }
                className={`w-full text-xs border px-3 py-1 rounded-md ${
                  isEditingSkills
                    ? "text-slate-600 border-gray-300"
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

export default WorkHistoryAndSkills;
