import React from "react";
import { Briefcase, Award } from "lucide-react";

const WorkHistoryAndSkills = ({ workHistory = [], skills = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Work Experience */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Riwayat Kerja</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {workHistory.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Belum ada riwayat kerja</p>
          ) : (
            <ul className="text-slate-700 text-sm space-y-2 list-disc list-inside">
              {workHistory.map((item, index) => (
                <li key={index}>
                  <span className="font-semibold">{item.position}</span> di{" "}
                  <span className="italic">{item.company}</span> ({item.period})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">Keahlian</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {skills.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Belum ada keahlian</p>
          ) : (
            <ul className="text-slate-700 text-sm space-y-2 list-disc list-inside">
            {skills.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">{item.title}</span>
                {item.description && <> — <span className="italic">{item.description}</span></>}
              </li>
            ))}
          </ul>

          )}
        </div>
      </div>
    </div>
  );
};

export default WorkHistoryAndSkills;
