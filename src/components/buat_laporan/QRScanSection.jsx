import React from "react";
import { QrCode } from "lucide-react";

const QRScanSection = ({ onStartScan }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <QrCode className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Scan QR</h2>
        </div>
      </div>
      <div className="p-6">
        <button
          type="button"
          onClick={onStartScan}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <QrCode className="w-5 h-5" />
          <span>Scan Barcode QR</span>
        </button>
      </div>
    </div>
  );
};

export default QRScanSection;