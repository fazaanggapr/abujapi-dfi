// components/Documentation.jsx
import React from "react";
import { Camera, Clock, Eye, CheckCircle } from "lucide-react";

const ImageReportCard = ({ report, onViewImage }) => {
  const gradientColors = {
    blue: "from-blue-500 to-indigo-600",
    orange: "from-amber-500 to-orange-600"
  };

  const buttonColors = {
    blue: "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
    orange: "from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-5 shadow-md border border-slate-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradientColors[report.color]} rounded-lg flex items-center justify-center`}>
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-slate-800">{report.time}</p>
          <p className="text-sm text-slate-600">{report.type}</p>
        </div>
      </div>

      <div className={`bg-gradient-to-r ${report.bgColor} rounded-lg p-4 mb-4`}>
        <p className="text-slate-700 font-medium">{report.title}</p>
        <p className="text-sm text-slate-600 mt-1">{report.description}</p>
      </div>

      <button
        onClick={() => onViewImage(report.time, report.title)}
        className={`w-full bg-gradient-to-r ${buttonColors[report.color]} text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
      >
        <Eye className="w-5 h-5" />
        <span>Lihat Gambar</span>
      </button>
    </div>
  );
};

const SummaryCard = ({ summary }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-slate-800">Ringkasan</p>
          <p className="text-sm text-slate-600">Status Patroli</p>
        </div>
      </div>
      <div className="space-y-2">
        {summary.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-slate-600">{item.label}</span>
            <span className={`font-medium ${item.color || 'text-slate-800'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Documentation = ({ imageReports, summary, onViewImage }) => {
  const defaultImageReports = [
    {
      id: 1,
      time: "19:47",
      type: "Dokumentasi Lapangan",
      title: "Periksa keran toilet pria",
      description: "Kondisi keran air perlu perhatian khusus",
      color: "blue",
      bgColor: "from-blue-50 to-indigo-50"
    },
    {
      id: 2,
      time: "20:15",
      type: "Dokumentasi Lapangan",
      title: "Pemeriksaan lampu lantai 2",
      description: "Status pencahayaan dalam kondisi baik",
      color: "orange",
      bgColor: "from-amber-50 to-orange-50"
    }
  ];

  const defaultSummary = [
    { label: "Total Lokasi", value: "3" },
    { label: "Dokumentasi", value: "2" },
    { label: "Status", value: "Selesai", color: "text-emerald-600" }
  ];

  const reportsToRender = imageReports || defaultImageReports;
  const summaryToRender = summary || defaultSummary;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <Camera className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Dokumentasi</h2>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {reportsToRender.map((report) => (
          <ImageReportCard
            key={report.id}
            report={report}
            onViewImage={onViewImage}
          />
        ))}
        
        <SummaryCard summary={summaryToRender} />
      </div>
    </div>
  );
};

export default Documentation;