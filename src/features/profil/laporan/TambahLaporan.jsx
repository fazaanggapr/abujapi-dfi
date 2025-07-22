import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Camera,
  Clock,
  User,
  Calendar,
  Activity,
  Save,
  QrCode,
  X,
} from "lucide-react";

const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    area: "",
    location_code: "TL-1",
    image_description: ""
  });
  const [patrolActivities, setPatrolActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

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
    setPatrolActivities(patrolActivities.filter(activity => activity.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setError("");
    } else if (file) {
      setError("Ukuran gambar maksimal 2MB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.area || !selectedImage) {
      setError("Harap isi deskripsi, area, dan unggah gambar");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      
      // Append required fields
      data.append("description", formData.description);
      data.append("area", formData.area);
      data.append("location_code", formData.location_code);
      
      // Append image
      const blob = await fetch(selectedImage).then(res => res.blob());
      data.append("image", blob, "patrol-image.jpg");

      const token = localStorage.getItem("access_token");
      const baseUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseUrl}/reports`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengirim laporan");
      }

      const responseData = await response.json();
      alert("Laporan berhasil dibuat!");
      navigate("/tasks");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white hover:text-white transition-colors shadow-md"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </button>
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
              <h1 className="text-2xl font-bold text-slate-800">Tambah Laporan</h1>
              <p className="text-slate-600 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Patrol Activities */}
            <div className="xl:col-span-2 space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">Kegiatan Patroli</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddPatrol()}
                        placeholder="Masukkan kegiatan patroli..."
                        className="flex-1 bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddPatrol}
                        disabled={!newActivity.trim()}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {patrolActivities.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Activity className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-slate-500 font-medium">Belum ada kegiatan patroli</p>
                        <p className="text-sm text-slate-400 mt-1">Tambahkan kegiatan patroli untuk memulai</p>
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
                              <p className="text-slate-700 font-medium">{activity.activity}</p>
                              <button
                                onClick={() => handleRemoveActivity(activity.id)}
                                className="text-red-500 hover:text-red-700 p-1 rounded"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">Ditambahkan pada {activity.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Required Fields */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Informasi Wajib</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi*</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Masukkan deskripsi laporan..."
                      className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Area*</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="Masukkan area patroli..."
                      className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Kode Lokasi</label>
                    <input
                      type="text"
                      name="location_code"
                      value={formData.location_code}
                      onChange={handleChange}
                      className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image & QR Reports */}
            <div className="space-y-8">
              {/* Image Report Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">Laporan Gambar*</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
                    {selectedImage && (
                      <div className="mb-4 relative">
                        <img 
                          src={selectedImage} 
                          alt="Patrol report" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    <input
                      type="text"
                      name="image_description"
                      value={formData.image_description}
                      onChange={handleChange}
                      placeholder="Masukkan keterangan gambar..."
                      className="w-full bg-white/70 border border-white/50 rounded-lg px-4 py-3 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                    />

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <Camera className="w-5 h-5" />
                      <span>{selectedImage ? "Ganti Gambar" : "Tambah Gambar"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Scan Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <div className="flex items-center space-x-3">
                    <QrCode className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-semibold text-white">Scan QR</h2>
                  </div>
                </div>
                <div className="p-6">
                  <Link
                    to="/scan-qr"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <QrCode className="w-5 h-5 text-white" />
                    <span>Scan Barcode QR</span>
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                  <span>Batal</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.description || !formData.area || !selectedImage}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Mengupload...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Upload Laporan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;