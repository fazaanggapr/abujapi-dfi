// ReportViewer.jsx (Main Component)
import React, { useState } from "react";
import Header from "../../components/lihat_laporan/Header";
import ReportTitle from "../../components/lihat_laporan/ReportTitle";
// import PatrolActivities from "../../components/lihat_laporan/PatrolActivities";
import PositionReport from "../../components/lihat_laporan/PositionReport";
import Documentation from "../../components/lihat_laporan/Documentation";

const ReportViewer = () => {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
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
        {/* Header Component */}
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          onBackToDashboard={handleBackToDashboard}
          userRole="Security Officer"
          userName="Inukai Atsuhiro"
        />

        {/* Report Title Component */}
        <ReportTitle
          title="Hasil Laporan"
          timeRange="Hari ini • 19:00 - 21:00"
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Activities */}
          <div className="xl:col-span-2 space-y-8">
            {/* Patrol Activities Component */}
            {/* <PatrolActivities /> */}

            {/* Position Report Component */}
            <PositionReport
              currentLocation={currentLocation}
              locations={locations}
              onNextLocation={nextLocation}
              onPrevLocation={prevLocation}
              buildingName="Mall Ciputra Japan"
              areaName="Area Patroli Utama"
            />
          </div>

          {/* Right Column - Documentation */}
          <div className="space-y-8">
            <Documentation onViewImage={handleViewImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;
