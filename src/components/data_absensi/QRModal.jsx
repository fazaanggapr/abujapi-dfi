// components/QRModal.js
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import QRCode from "react-qr-code";
import baseUrl from "../../utils/api"; 

const QRModal = ({ isOpen, onClose }) => {
  const [token, setToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchQRToken = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem("access_token");

      try {
        const response = await fetch(`${baseUrl}/generate-attendance-token`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();
        if (response.ok && result.token) {
          setToken(result.token);
          setExpiresAt(result.expires_at);
        } else {
          console.error("Gagal mengambil token QR:", result);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQRToken();
  }, [isOpen]);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">QR Code Absensi</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <div className="text-center">
          {loading ? (
            <p className="text-gray-500">Mengambil token QR...</p>
          ) : token ? (
            <>
              <div className="w-48 h-48 mx-auto mb-4">
                <QRCode value={token} size={192} includeMargin={true} />
                <canvas id="qr-code" style={{ display: "none" }}></canvas>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Berlaku sampai: <strong>{expiresAt}</strong>
              </p>
              <button
                onClick={downloadQR}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download QR Code
              </button>
            </>
          ) : (
            <p className="text-red-500">Gagal memuat QR code.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRModal;