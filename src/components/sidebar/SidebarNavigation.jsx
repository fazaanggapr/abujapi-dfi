import React from 'react';
import { Home, QrCode, Calendar, User, AlertCircle } from 'lucide-react';
import SidebarMenuItem from './SidebarMenuItem';

const SidebarNavigation = ({ userRole }) => {
  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard',
      roles: ['admin', 'employee']
    },
    {
      icon: QrCode,
      label: 'Absensi QR',
      path: '/absensi/scan-qr',
      roles: ['admin']
    },
    {
      icon: Calendar,
      label: 'Data Absensi',
      path: '/data-absensi',
      roles: ['admin']
    },
    {
      icon: User,
      label: 'Data Karyawan',
      path: '/data-karyawan',
      roles: ['admin']
    },
    {
      icon: AlertCircle,
      label: 'Laporan',
      path: '/laporan',
      roles: ['admin']
    }
  ];

  return (
    <nav className="flex-1 px-4 py-6">
      <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
        Main Menu
      </h2>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <SidebarMenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isVisible={item.roles.includes(userRole)}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;