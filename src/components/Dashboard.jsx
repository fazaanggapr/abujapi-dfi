import React, { useState } from 'react';
import {
  User,
  FileText,
  Calendar,
  QrCode,
  Clock,
  Menu,
} from 'lucide-react';
import Sidebar from './Sidebar'; // pastikan ini path-nya benar

const SecurityDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Selamat malam, Cipher!
              </h1>
              <p className="text-gray-600 mt-1">
                Selamat datang di security management dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">User</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Reports */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Laporan</h3>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
            <p className="text-sm text-gray-500">0 pending review</p>
          </div>

          {/* Kehadiran */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Kehadiran</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
            <p className="text-sm text-gray-500">Check-ins today</p>
          </div>

          {/* QR Codes */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Active QR Codes</h3>
              <QrCode className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
            <p className="text-sm text-gray-500">Currently valid</p>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Status Anda</h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">Aktif</div>
            <p className="text-sm text-gray-500">Employee</p>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aktivitas Terbaru */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aktivitas Terbaru</h3>
            <p className="text-gray-600 mb-6">Aktivitas keamanan terbaru anda</p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Profil diperbarui</p>
                  <p className="text-sm text-gray-500">2 jam lalu</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Akses ke dashboard</p>
                  <p className="text-sm text-gray-500">Hari ini</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-gray-600 mb-6">Fitur yang paling sering digunakan</p>

            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Buat Laporan</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <QrCode className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Scan QR Code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
