// components/ReportTitle.jsx
import React from "react";
import { Calendar, Activity } from "lucide-react";

const ReportTitle = ({ 
  title = "Hasil Laporan", 
  timeRange = "Hari ini • 19:00 - 21:00" 
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <p className="text-slate-600 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{timeRange}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportTitle;