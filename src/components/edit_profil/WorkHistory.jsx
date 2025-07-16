// components/WorkHistory.jsx
import React from 'react';
import { Briefcase } from 'lucide-react';

const WorkHistory = ({ workHistory }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center space-x-3">
          <Briefcase className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">
            Riwayat Kerja
          </h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {workHistory.map((work, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
          >
            <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="text-slate-800 font-medium text-sm">
                {work.company}
              </p>
              <p className="text-slate-600 text-sm">
                {work.position}
              </p>
              <p className="text-slate-500 text-xs">{work.period}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;