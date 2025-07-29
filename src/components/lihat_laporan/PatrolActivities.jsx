// components/PatrolActivities.jsx
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const PatrolActivities = ({ activities }) => {
  const defaultActivities = [
    {
      id: 1,
      type: "completed",
      title: "Pemeriksaan Fasilitas Toilet",
      description: "Memeriksa kondisi toilet pria, mencatat kerusakan pada keran air dan fasilitas lainnya",
      icon: CheckCircle,
      bgColor: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200",
      iconBg: "bg-emerald-500"
    },
    {
      id: 2,
      type: "in-progress",
      title: "Inspeksi Sistem Pencahayaan",
      description: "Memeriksa kondisi lampu di setiap lantai dan melaporkan yang perlu diperbaiki",
      icon: AlertCircle,
      bgColor: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      iconBg: "bg-amber-500"
    }
  ];

  const activitiesToRender = activities || defaultActivities;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Kegiatan Patroli</h2>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {activitiesToRender.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div
              key={activity.id}
              className={`flex items-start space-x-4 p-4 bg-gradient-to-r ${activity.bgColor} rounded-xl border ${activity.borderColor}`}
            >
              <div className={`w-8 h-8 ${activity.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-slate-700 font-medium">{activity.title}</p>
                <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatrolActivities;