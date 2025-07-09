import React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ReportViewer = () => {
  const handleBackToDashboard = () => {
    console.log("Navigasi ke dashboard");
  };

  const handleViewImage = (time, description) => {
    console.log(`Melihat gambar untuk: ${description} pada ${time}`);
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg text-white mb-6 overflow-hidden shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="p-2 rounded-full bg-blue-700 transition-colors hover:bg-blue-600"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </Link>

              <h1 className="text-lg font-semibold">Kembali</h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Inukai Atsuhiro</span>
              <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Report Header */}
          <div className="bg-blue-800 text-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg">
              LAPORAN MILIK : Inukai Atsuhiro
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patrol Activities */}
              <div className="space-y-4">
                <div className="bg-blue-800 text-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold">KEGIATAN PATROLI</h3>
                </div>

                <div className="bg-blue-800 bg-opacity-90 p-4 rounded-lg space-y-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 bg-green-400 rounded-sm mt-1 flex-shrink-0"></div>
                    <div className="bg-white p-3 rounded-lg flex-1 shadow-xs">
                      <p className="text-sm text-gray-700">
                        Memeriksa toilet pria, mencatat setiap kerusakan pada
                        keran air
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-sm mt-1 flex-shrink-0"></div>
                    <div className="bg-white p-3 rounded-lg flex-1 shadow-xs">
                      <p className="text-sm text-gray-700">
                        Memeriksa lampu di setiap lantai
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Position Report */}
              <div className="space-y-4">
                <div className="bg-blue-800 text-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold">LAPORAN POSISI</h3>
                </div>

                <div className="bg-blue-800 bg-opacity-90 p-4 rounded-lg shadow-sm">
                  <div className="text-white text-base mb-4 font-medium">
                    Lokasi: Mall Ciputra Japan
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 sm:gap-0">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-400 rounded-sm mb-2"></div>
                      <span className="text-white text-sm text-center">
                        Toilet lantai 1
                      </span>
                    </div>
                    <div className="hidden sm:block flex-1 h-1 bg-green-400 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-orange-500 rounded-sm mb-2"></div>
                      <span className="text-white text-sm text-center">
                        Toilet lantai 2
                      </span>
                    </div>
                    <div className="hidden sm:block flex-1 h-1 bg-orange-500 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-sm mb-2"></div>
                      <span className="text-white text-sm text-center">
                        Toilet lantai 3
                      </span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button className="p-2 lg:p-3 hover:bg-gray-100 rounded-full">
                      <ChevronLeft className="text-gray-800 w-6 h-6" />
                    </button>
                    <button className="p-2 lg:p-3 hover:bg-gray-100 rounded-full">
                      <ChevronRight className="text-gray-800 w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-blue-800 text-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold">LAPORAN GAMBAR</h3>
              </div>

              <div className="bg-blue-800 bg-opacity-90 p-4 rounded-lg space-y-4 shadow-sm">
                {/* Image Report 1 */}
                <div className="bg-white rounded-lg p-4 shadow-xs">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-800 text-white text-xs font-medium px-2 py-1 rounded">
                        19:47
                      </span>
                      <span className="text-gray-700 text-xs">Keterangan:</span>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm mb-4">
                    Periksa keran toilet pria
                  </p>
                  <button
                    onClick={() =>
                      handleViewImage("19:47", "Periksa keran toilet pria")
                    }
                    className="w-full bg-blue-800 text-white py-2 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    LIHAT GAMBAR
                  </button>
                </div>

                {/* Image Report 2 */}
                <div className="bg-white rounded-lg p-4 shadow-xs">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-800 text-white text-xs font-medium px-2 py-1 rounded">
                        20:15
                      </span>
                      <span className="text-gray-700 text-xs">Keterangan:</span>
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm mb-4">
                    Pemeriksaan lampu lantai 2
                  </p>
                  <button
                    onClick={() =>
                      handleViewImage("20:15", "Pemeriksaan lampu lantai 2")
                    }
                    className="w-full bg-blue-800 text-white py-2 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    LIHAT GAMBAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportViewer;
