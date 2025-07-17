import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Camera,
  Eye,
  Calendar,
  Building,
  Activity,
} from "lucide-react";

const ReportViewer = () => {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); // state sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // toggle true/false
  };

  const locations = [
    { name: "Toilet Lantai 1", status: "completed", color: "bg-emerald-500" },
    { name: "Toilet Lantai 2", status: "in-progress", color: "bg-amber-500" },
    { name: "Toilet Lantai 3", status: "pending", color: "bg-slate-400" },
  ];

  const handleBackToDashboard = () => {
    console.log("Navigasi ke dashboard");
  };

  const handleViewImage = (time, description) => {
    console.log(`Melihat gambar untuk: ${description} pada ${time}`);
  };

  const nextLocation = () => {
    setCurrentLocation((prev) => (prev + 1) % locations.length);
  };

  const prevLocation = () => {
    setCurrentLocation(
      (prev) => (prev - 1 + locations.length) % locations.length
    );
  };



  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
                <button
          onClick={toggleSidebar}
          className="lg:hidden p-3 text-gray-800 fixed top-4 left-4 z-50 bg-white rounded-md shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/data-karyawan"
                onClick={handleBackToDashboard}
                className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white hover:text-white transition-colors shadow-md"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Security Officer</p>
                <p className="font-semibold text-slate-800">Inukai Atsuhiro</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Report Title */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Laporan Patroli
              </h1>
              <p className="text-slate-600 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Hari ini • 19:00 - 21:00</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Activities */}
          <div className="xl:col-span-2 space-y-8">
            {/* Patrol Activities */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Kegiatan Patroli
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 font-medium">
                      Pemeriksaan Fasilitas Toilet
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Memeriksa kondisi toilet pria, mencatat kerusakan pada
                      keran air dan fasilitas lainnya
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 font-medium">
                      Inspeksi Sistem Pencahayaan
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Memeriksa kondisi lampu di setiap lantai dan melaporkan
                      yang perlu diperbaiki
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Position Report */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Laporan Posisi
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <Building className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Mall Ciputra Japan
                    </p>
                    <p className="text-sm text-slate-600">Area Patroli Utama</p>
                  </div>
                </div>

                {/* Location Timeline */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevLocation}
                      className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>

                    <div className="flex-1 mx-4">
                      <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-full h-2 mb-4">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              ((currentLocation + 1) / locations.length) * 100
                            }%`,
                          }}
                        ></div>
                      </div>

                      <div className="text-center">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 ${locations[currentLocation].color} rounded-2xl mb-3 shadow-lg`}
                        >
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-semibold text-slate-800">
                          {locations[currentLocation].name}
                        </p>
                        <p className="text-sm text-slate-600 capitalize">
                          {locations[currentLocation].status}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={nextLocation}
                      className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>

                  <div className="text-center text-sm text-slate-500">
                    {currentLocation + 1} dari {locations.length} lokasi
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Reports */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <Camera className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Dokumentasi
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Image Report 1 */}
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-5 shadow-md border border-slate-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">19:47</p>
                      <p className="text-sm text-slate-600">
                        Dokumentasi Lapangan
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                    <p className="text-slate-700 font-medium">
                      Periksa keran toilet pria
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Kondisi keran air perlu perhatian khusus
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleViewImage("19:47", "Periksa keran toilet pria")
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Lihat Gambar</span>
                  </button>
                </div>

                {/* Image Report 2 */}
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-5 shadow-md border border-slate-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">20:15</p>
                      <p className="text-sm text-slate-600">
                        Dokumentasi Lapangan
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-4">
                    <p className="text-slate-700 font-medium">
                      Pemeriksaan lampu lantai 2
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Status pencahayaan dalam kondisi baik
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleViewImage("20:15", "Pemeriksaan lampu lantai 2")
                    }
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Lihat Gambar</span>
                  </button>
                </div>

                {/* Summary Card */}
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
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Lokasi</span>
                      <span className="font-medium text-slate-800">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Dokumentasi</span>
                      <span className="font-medium text-slate-800">2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Status</span>
                      <span className="font-medium text-emerald-600">
                        Selesai
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;
