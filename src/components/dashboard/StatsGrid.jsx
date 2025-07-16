import React from 'react';
import {
  FileText,
  Calendar,
  QrCode,
  Clock,
} from 'lucide-react';
import StatsCard from './StatsCard';

const StatsGrid = () => {
  const stats = [
    {
      title: "Total Laporan",
      value: "0",
      subtitle: "0 pending review",
      icon: FileText
    },
    {
      title: "Total Kehadiran",
      value: "0",
      subtitle: "Check-ins today",
      icon: Calendar
    },
    {
      title: "Active QR Codes",
      value: "0",
      subtitle: "Currently valid",
      icon: QrCode
    },
    {
      title: "Status Anda",
      value: "Aktif",
      subtitle: "Employee",
      icon: Clock
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatsGrid;