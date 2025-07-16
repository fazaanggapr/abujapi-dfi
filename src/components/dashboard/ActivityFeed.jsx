import React from 'react';

const ActivityFeed = () => {
  const activities = [
    {
      title: "Profil diperbarui",
      time: "2 jam lalu",
      color: "bg-green-500"
    },
    {
      title: "Akses ke dashboard",
      time: "Hari ini",
      color: "bg-blue-500"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Aktivitas Terbaru</h3>
      <p className="text-gray-600 mb-6">Aktivitas keamanan terbaru anda</p>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`}></div>
            <div>
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;