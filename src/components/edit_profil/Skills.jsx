// components/Skills.jsx
import React from 'react';
import { Award } from 'lucide-react';

const Skills = ({ skills }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center space-x-3">
          <Award className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">
            Keahlian
          </h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
          >
            <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="text-slate-800 font-medium text-sm">
                {skill.title}
              </p>
              <p className="text-slate-600 text-xs">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;