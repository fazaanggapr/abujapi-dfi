import React from 'react';
import {
  FileText,
  Calendar,
  QrCode,
  Clock,
} from 'lucide-react';
import StatsCard from './StatsCard';
import ProfileDropdown from '../sidebar/ProfileDropdown';

const StatsGrid = ({ profile,stats }) => {

  const statItems = [
    {
      title: "Total Laporan",
      value: stats?.total_reports ?? "0",
      subtitle: "Semua laporan kamu",
      icon: FileText
    },
    {
      title: "Kehadiran Hari Ini",
      value: stats?.attendance_status ?? "-",
      subtitle: "Status absen hari ini",
      icon: Calendar
    },
    {
      title: "Status Anda",
      value: profile?.employeeStatus ?? "-",
      subtitle: "Status pegawai",
      icon: Clock
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statItems.map((stat, index) => (
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