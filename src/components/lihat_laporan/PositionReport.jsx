// components/PositionReport.jsx
import React from "react";
import { ChevronLeft, ChevronRight, MapPin, Building } from "lucide-react";

const PositionReport = ({
  currentLocation,
  locations,
  onNextLocation,
  onPrevLocation,
  buildingName = "Mall Ciputra Japan",
  areaName = "Area Patroli Utama"
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Laporan Posisi</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <Building className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-semibold text-slate-800">{buildingName}</p>
            <p className="text-sm text-slate-600">{areaName}</p>
          </div>
        </div>

        {/* Location Timeline */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onPrevLocation}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex-1 mx-4">
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentLocation + 1) / locations.length) * 100}%`,
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
              onClick={onNextLocation}
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
  );
};

export default PositionReport;