import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { FaCheckCircle, FaTimesCircle, FaQrcode, FaCamera, FaSpinner } from "react-icons/fa";
import baseUrl from "../utils/api";
import Sidebar from "./Sidebar";

const ScanQR = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
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
        await submitAttendance(decodedText);
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

  const submitAttendance = async (token) => {
    setIsLoading(true);
    setMessage("");
    setStatus("");

    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${baseUrl}/submit-attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setStatus("success");
        
        // Auto restart scanner after 3 seconds
        setTimeout(() => {
          setMessage("");
          setStatus("");
          initializeScanner();
        }, 3000);
      } else {
        setMessage(result.message);
        setStatus("error");
        
        // Auto restart scanner after 2 seconds
        setTimeout(() => {
          setMessage("");
          setStatus("");
          initializeScanner();
        }, 2000);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Gagal mengirim data. Periksa koneksi internet Anda.");
      setStatus("error");
      
      // Auto restart scanner after 2 seconds
      setTimeout(() => {
        setMessage("");
        setStatus("");
        initializeScanner();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const restartScanner = () => {
    cleanupScanner();
    setMessage("");
    setStatus("");
    setTimeout(() => {
      initializeScanner();
    }, 100);
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <FaQrcode className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Scan QR Checkpoint Gedung</h1>
              <p className="text-gray-600 text-sm">Arahkan kamera ke QR code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Scanner Section */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaCamera className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">Kamera Scanner</span>
                  </div>
                  <div className="flex items-center space-x-2 max-w-[150px]">
                    <div className={`w-2 h-2 rounded-full ${scannerActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-white/80 text-sm">
                      {scannerActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div 
                  id="reader" 
                  className="w-full mx-auto rounded-2xl overflow-hidden shadow-lg"
                  style={{ minHeight: '300px' }}
                />
                
                {/* Scanner Controls */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={restartScanner}
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
          </div>

          {/* Status & Instructions Section */}
          <div className="space-y-6">
            {/* Status Message */}
            {message && (
              <div className={`bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-300 ${
                status === "success" ? "border-green-200" : "border-red-200"
              }`}>
                <div className={`bg-gradient-to-r p-6 ${
                  status === "success" 
                    ? "from-green-500 to-emerald-600" 
                    : "from-red-500 to-red-600"
                }`}>
                  <div className="flex items-center space-x-3">
                    {status === "success" ? (
                      <FaCheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <FaTimesCircle className="w-6 h-6 text-white" />
                    )}
                    <span className="text-white font-semibold">
                      {status === "success" ? "Berhasil" : "Gagal"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-6">
                <h3 className="text-white font-semibold text-lg">Cara Penggunaan</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Izinkan Akses Kamera</h4>
                      <p className="text-gray-600 text-sm">Berikan izin akses kamera ketika diminta oleh browser</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Arahkan ke QR Code</h4>
                      <p className="text-gray-600 text-sm">Posisikan QR code di tengah frame scanner</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Tunggu Proses</h4>
                      <p className="text-gray-600 text-sm">Scanner akan otomatis memproses QR code yang terdeteksi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl p-6">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                💡 Tips untuk Hasil Terbaik
              </h4>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Pastikan pencahayaan cukup terang</li>
                <li>• Jaga jarak sekitar 10-30 cm dari QR code</li>
                <li>• Pastikan QR code tidak terlalu kecil atau buram</li>
                <li>• Hindari pantulan cahaya pada QR code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <FaSpinner className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Memproses Absensi</h3>
            <p className="text-gray-600">Mohon tunggu sebentar...</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ScanQR;