// pages/ScanQR.jsx - Main Component
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ScannerHeader from "../components/scan_qr_absensi/ScannerHeader";
import ScannerCamera from "../components/scan_qr_absensi/ScannerCamera";
import StatusMessage from "../components/scan_qr_absensi/StatusMessage";
import Instructions from "../components/scan_qr_absensi/Instructions";
import ScannerTips from "../components/scan_qr_absensi/ScannerTips";
import LoadingOverlay from "../components/scan_qr_absensi/LoadingOverlay";
import useAttendanceSubmission from "../hooks/UseAttendanceSubmission";

const ScanQR = () => {
  const [scannerActive, setScannerActive] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { message, status, isLoading, submitAttendance, clearStatus } =
    useAttendanceSubmission();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleScanSuccess = async (decodedText) => {
    await submitAttendance(decodedText, () => {
      // This callback will be called after auto-restart timeout
      // Scanner will be reinitialized by the ScannerCamera component
    });
  };

  const handleRestartScanner = () => {
    clearStatus();
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <ScannerHeader
          toggleSidebar={toggleSidebar}
          onToggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="w-full px-6 py-8 ">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Scanner Section */}
            <div className="space-y-6">
              <ScannerCamera
                onScanSuccess={handleScanSuccess}
                scannerActive={scannerActive}
                setScannerActive={setScannerActive}
                isLoading={isLoading}
                onRestartScanner={handleRestartScanner}
              />
            </div>

            {/* Status & Instructions Section */}
            <div className="space-y-6">
              <StatusMessage message={message} status={status} />
              <Instructions />
              <ScannerTips />
            </div>
          </div>
        </div>

        <LoadingOverlay isVisible={isLoading} />
      </div>
    </div>
  );
};

export default ScanQR;
