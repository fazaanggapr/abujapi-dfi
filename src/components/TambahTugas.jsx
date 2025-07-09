import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AddTask = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [location, setLocation] = useState("");
  const [positionDescription, setPositionDescription] = useState("");

  const handleBackToData = () => {
    // Dalam implementasi sesungguhnya, gunakan routing (React Router, Next.js, dll.)
    console.log("Navigasi ke lihat data");
  };

  const handleAddPatrol = () => {
    console.log("Menambah kegiatan patroli");
  };

  const handleAddImage = () => {
    console.log("Menambah laporan gambar");
  };

  const handleAddPosition = () => {
    console.log("Menambah posisi");
  };

  const handleCancel = () => {
    console.log("Membatalkan tugas");
  };

  const handleUploadTask = () => {
    console.log("Mengupload tugas");
  };

  const handleButtonClick = (e) => {
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 100);
  };

  return (
    <div
      className="bg-gray-100 min-h-screen"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="mb-3">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            {/* Kiri: tombol kembali + judul */}
            <div className="flex items-center">
              <Link
                to="/lihat-profil"
                className="mr-4 text-white bg-blue-700 p-2 rounded-full transition transform hover:-translate-y-1"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>

              <h1 className="text-xl font-bold">TAMBAH TUGAS</h1>
            </div>

            {/* Kanan: input tanggal */}
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white bg-opacity-20 text-gray-100 px-6 py-2 rounded-lg placeholder-gray-200 focus:bg-opacity-30 focus:outline-none"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-4">
          {" "}
          {/* <--- ganti py-8 jadi pt-4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Kegiatan Patroli */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="bg-blue-900 text-white px-6 py-4 rounded-lg">
                  <h2 className="font-bold text-lg">KEGIATAN PATROLI</h2>
                </div>

                <div className="bg-blue-900 p-6 rounded-lg min-h-[400px]">
                  {/* Tombol plus kecil di pojok kiri atas */}
                  <div className="flex items-start mb-4">
                    <button
                      onClick={handleAddPatrol}
                      className="bg-white bg-opacity-30 p-2 rounded mr-4 hover:bg-opacity-40 transition-all"
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </button>
                    {/* Area putih besar dengan tombol plus */}
                    <div className="flex-1 bg-white bg-opacity-20 rounded-lg p-6 min-h-[120px] flex items-center justify-center">
                      <button
                        onClick={handleAddPatrol}
                        className="bg-white bg-opacity-30 p-4 rounded hover:bg-opacity-40 transition-all"
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Laporan Gambar Section */}
              <div className="space-y-4">
                <div className="bg-blue-900 text-white px-6 py-4 rounded-lg">
                  <h2 className="font-bold text-lg">LAPORAN GAMBAR</h2>
                </div>
                <div className="bg-blue-900 p-6 rounded-lg">
                  {/* Area input keterangan */}
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="w-8 h-6 bg-white bg-opacity-40 rounded mr-3 flex items-center justify-center text-xs">
                          <span className="text-white">...</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium mb-1">
                            Keterangan:
                          </p>
                          <input
                            type="text"
                            value={imageDescription}
                            onChange={(e) =>
                              setImageDescription(e.target.value)
                            }
                            className="bg-transparent text-white text-sm placeholder-white placeholder-opacity-60 focus:outline-none w-full"
                            placeholder="Masukan keterangan..."
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleAddImage}
                        className="w-12 h-6 bg-orange-500 rounded flex items-center justify-center hover:bg-orange-600 transition-all ml-4"
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laporan Posisi Section */}
              <div className="space-y-4">
                <div className="bg-blue-900 text-white px-6 py-4 rounded-lg">
                  <h2 className="font-bold text-lg">LAPORAN POSISI</h2>
                </div>
                <div className="bg-blue-900 p-6 rounded-lg">
                  <div className="mb-4">
                    <p className="text-white text-sm mb-2">
                      Lokasi:
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none border-b border-white border-opacity-30 ml-2"
                        placeholder="Masukan lokasi..."
                      />
                    </p>
                  </div>

                  {/* Area audio player */}
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4">
                    <div className="flex items-center mb-3">
                      <button
                        onClick={handleAddPosition}
                        className="bg-white bg-opacity-40 p-2 rounded mr-3 hover:bg-opacity-50 transition-all"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </button>
                      <div className="flex-1 bg-white bg-opacity-20 h-1 rounded-full">
                        <div className="w-1/4 bg-white h-1 rounded-full"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={positionDescription}
                      onChange={(e) => setPositionDescription(e.target.value)}
                      className="bg-transparent text-white text-sm placeholder-white placeholder-opacity-60 focus:outline-none w-full"
                      placeholder="Masukan keterangan..."
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons - Sejajar dengan laporan */}
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    handleCancel();
                  }}
                  className="flex-1 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md transform hover:-translate-y-1 text-center"
                >
                  BATAL
                </button>
                <button
                  onClick={(e) => {
                    handleButtonClick(e);
                    handleUploadTask();
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md transform hover:-translate-y-1"
                >
                  UPLOAD TUGAS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
