import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_API_URL;   

const ScanQR = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      async (decodedText, decodedResult) => {
        scanner.clear();
        submitAttendance(decodedText);
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

  const submitAttendance = async (token) => {
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
        setMessage(`✅ ${result.message}`);
        setStatus("success");
      } else {
        setMessage(`❌ ${result.message}`);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("❌ Gagal mengirim data.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR Absensi</h1>
      <div id="reader" className="w-full max-w-md mx-auto mb-4" />

      {message && (
        <div
          className={`p-3 rounded-lg text-white font-medium ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ScanQR;
