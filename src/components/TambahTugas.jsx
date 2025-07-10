import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Camera,
  MapPin,
  Clock,
  User,
  Calendar,
  Building,
  Activity,
  Image,
  Save,
  X,
} from "lucide-react";

const AddTask = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [location, setLocation] = useState("");
  const [positionDescription, setPositionDescription] = useState("");
  const [patrolActivities, setPatrolActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");

  const handleBackToData = () => {
    console.log("Navigasi ke lihat data");
  };

  const handleAddPatrol = () => {
    if (newActivity.trim()) {
      setPatrolActivities([
        ...patrolActivities,
        {
          id: Date.now(),
          activity: newActivity,
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewActivity("");
    }
  };

  const handleRemoveActivity = (id) => {
    setPatrolActivities(
      patrolActivities.filter((activity) => activity.id !== id)
    );
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

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/lihat-profil" // Ganti path ini sesuai dengan route kamu
                className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white hover:text-white transition-colors shadow-md"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Security Officer</p>
                <p className="font-semibold text-slate-800">Inukai Atsuhiro</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Report Title */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Tambah Tugas
              </h1>
              <p className="text-slate-600 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Hari ini • 19:00 - 21:00</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Patrol Activities */}
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Kegiatan Patroli
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {/* Add Activity Form */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      placeholder="Masukkan kegiatan patroli..."
                      className="flex-1 bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleAddPatrol}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Activity List */}
                <div className="space-y-4">
                  {patrolActivities.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-500 font-medium">
                        Belum ada kegiatan patroli
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        Tambahkan kegiatan patroli untuk memulai
                      </p>
                    </div>
                  ) : (
                    patrolActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
                      >
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-slate-700 font-medium">
                              {activity.activity}
                            </p>
                            <button
                              onClick={() => handleRemoveActivity(activity.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">
                            Ditambahkan pada {activity.time}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Position Reports */}
          <div className="space-y-8">
            {/* Image Report Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <Camera className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Laporan Gambar
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Image className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 font-medium">
                        Keterangan Gambar
                      </p>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    placeholder="Masukkan keterangan gambar..."
                    className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                  />

                  <button
                    onClick={handleAddImage}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Tambah Gambar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Position Report Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Laporan Posisi
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <Building className="w-6 h-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-slate-700 font-medium">Lokasi:</p>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Masukkan lokasi..."
                      className="w-full bg-transparent text-slate-700 placeholder-slate-500 focus:outline-none border-b border-slate-300 focus:border-blue-500 pb-1 mt-1"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <button
                      onClick={handleAddPosition}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <div className="flex-1 bg-white/70 rounded-full h-2">
                      <div className="w-1/4 bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"></div>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={positionDescription}
                    onChange={(e) => setPositionDescription(e.target.value)}
                    placeholder="Masukkan keterangan posisi..."
                    className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleCancel}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Batal</span>
              </button>

              <button
                onClick={handleUploadTask}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Upload Tugas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
