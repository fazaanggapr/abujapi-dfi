import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const QRScannerModal = ({ isOpen, onClose, onScanSuccess }) => {
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
          // 🚫 Matikan opsi upload file, aktifkan hanya kamera
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        },
        false
      );

      qrScannerRef.current = scanner;

      const handleScanSuccess = (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear();
      };

      const handleScanFailure = (error) => {
        console.warn(`QR scan error: ${error}`);
      };

      scanner.render(handleScanSuccess, handleScanFailure);

      return () => {
        scanner.clear();
      };
    }
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Scan QR Code</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div id="qr-reader" className="w-full mb-4"></div>
      </div>
    </div>
  );
};

export default QRScannerModal;
