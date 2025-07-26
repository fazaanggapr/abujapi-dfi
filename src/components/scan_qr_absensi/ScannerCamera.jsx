import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { FaCamera, FaSpinner } from "react-icons/fa";

const ScannerCamera = ({ 
  onScanSuccess, 
  scannerActive, 
  setScannerActive, 
  isLoading, 
  onRestartScanner 
}) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    initializeScanner();
    return () => {
      cleanupScanner();
    };
  }, []);

  const initializeScanner = () => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 280, height: 280 },
      aspectRatio: 1.0,
      disableFlip: false,
      rememberLastUsedCamera: true,
      supportedScanTypes: [
        Html5QrcodeScanType.SCAN_TYPE_CAMERA,
        Html5QrcodeScanType.SCAN_TYPE_FILE,
      ],
    });

    scanner.render(
      async (decodedText, decodedResult) => {
        setScannerActive(false);
        scanner.clear();
        await onScanSuccess(decodedText);
      },
      (error) => {
        // Suppress frequent scanning errors
        if (!error.includes("NotFoundException")) {
          console.warn("QR Scan Error:", error);
        }
      }
    );

    scannerRef.current = scanner;
    setScannerActive(true);
  };

  const cleanupScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
    }
  };

  const handleRestartScanner = () => {
    cleanupScanner();
    setTimeout(() => {
      initializeScanner();
    }, 100);
    onRestartScanner();
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaCamera className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              Kamera Scanner
            </span>
          </div>
          <div className="flex items-center space-x-2 max-w-[150px]">
            <div
              className={`w-2 h-2 rounded-full ${
                scannerActive
                  ? "bg-green-400 animate-pulse"
                  : "bg-gray-400"
              }`}
            ></div>
            <span className="text-white/80 text-sm">
              {scannerActive ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div
          id="reader"
          className="w-full mx-auto rounded-2xl overflow-hidden shadow-lg"
          style={{ minHeight: "300px" }}
        />

        {/* Scanner Controls */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleRestartScanner}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <FaSpinner className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <FaCamera className="w-4 h-4" />
                <span>Restart Scanner</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerCamera;