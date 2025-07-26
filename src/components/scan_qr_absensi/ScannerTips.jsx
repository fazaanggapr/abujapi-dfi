import React from "react";

const ScannerTips = () => {
  const tips = [
    "Pastikan pencahayaan cukup terang",
    "Jaga jarak sekitar 10-30 cm dari QR code",
    "Pastikan QR code tidak terlalu kecil atau buram",
    "Hindari pantulan cahaya pada QR code"
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl p-6">
      <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
        💡 Tips untuk Hasil Terbaik
      </h4>
      <ul className="space-y-2 text-yellow-700 text-sm">
        {tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScannerTips;
