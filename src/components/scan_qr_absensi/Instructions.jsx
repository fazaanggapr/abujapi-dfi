import React from "react";

const Instructions = () => {
  const steps = [
    {
      number: 1,
      title: "Izinkan Akses Kamera",
      description: "Berikan izin akses kamera ketika diminta oleh browser"
    },
    {
      number: 2,
      title: "Arahkan ke QR Code",
      description: "Posisikan QR code di tengah frame scanner"
    },
    {
      number: 3,
      title: "Tunggu Proses",
      description: "Scanner akan otomatis memproses QR code yang terdeteksi"
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-6">
        <h3 className="text-white font-semibold text-lg">
          Cara Penggunaan
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">
                  {step.number}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructions;