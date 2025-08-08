import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// Import komponen yang sudah dipecah
import Header from "../../components/buat_laporan/Header";
import ReportTitle from "../../components/buat_laporan/ReportTitle";
import QRScannerModal from "../../components/buat_laporan/QRScannerModal";
// import PatrolActivities from "../../components/buat_laporan/PatrolActivities"; 
import RequiredFields from "../../components/buat_laporan/RequiredFields";
import ImageUpload from "../../components/buat_laporan/ImageUpload";
import QRScanSection from "../../components/buat_laporan/QRScanSection";
import ActionButtons from "../../components/buat_laporan/ActionButtons";


import ErrorAlert from "../../components/buat_laporan/ErrorAlert";

import baseUrl from "../../utils/api";



const AddTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    area: "",
    description: "",
    location_code: "",
    image_description: ""
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const handleBack = () => navigate(-1);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (imageData) => {
    setSelectedImage(imageData); // base64
    setError("");
  };

  const handleImageDescriptionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image_description: e.target.value
    }));
  };

  const handleQRScanSuccess = async (decodedText) => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${baseUrl}/locations/by-code?code=${decodedText}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil lokasi dari kode QR");
      }

      const data = await response.json();

      if (!data || !data.name) {
        throw new Error("Data lokasi tidak ditemukan");
      }

      setFormData((prev) => ({
        ...prev,
        location_code: decodedText,
        area: data.name,
      }));

      setShowScanner(false);
      setError("");
    } catch (err) {
      console.error("QR Scan Error:", err);
      setError("Gagal mengambil lokasi berdasarkan kode QR: " + err.message);
      setShowScanner(false);
    }
  };

  const handleStartScan = () => setShowScanner(true);
  const handleStopScan = () => setShowScanner(false);

  // 🔁 Konversi base64 ke Blob File
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.area || !selectedImage) {
      setError("Harap isi semua field yang wajib diisi");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");

      const submitData = new FormData();
      submitData.append("area", formData.area);
      submitData.append("description", formData.description);
      submitData.append("location_code", formData.location_code || "");

      // Convert base64 to Blob
      const imageBlob = dataURLtoBlob(selectedImage);
      submitData.append("image", imageBlob, "laporan.jpg");

      const response = await fetch(`${baseUrl}/reports`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim laporan");
      }

      toast.success("Laporan berhasil dikirim!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } catch (err) {
      console.error("Submit Error:", err);
      setError("Terjadi kesalahan saat mengirim data: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.description && formData.area && selectedImage && formData.location_code;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={showScanner}
        onClose={handleStopScan}
        onScanSuccess={handleQRScanSuccess}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <Header onBack={handleBack} />

        {/* Report Title */}
        <ReportTitle />

        {/* Error Alert */}
        <ErrorAlert error={error} />

        {/* Main Content Area */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Main Content (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">

              {/* <PatrolActivities
                activities={patrolActivities}
                onAddActivity={handleAddPatrolActivity}
                onRemoveActivity={handleRemoveActivity}
              />  */}

              {/* Required Fields Section */}
              <RequiredFields
                formData={formData}
                onChange={handleFormChange}
              />
            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Image Upload Section */}
              <ImageUpload
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
                imageDescription={formData.image_description}
                onDescriptionChange={handleImageDescriptionChange}
                error={error}
              />

              {/* QR Scan Section */}
              <QRScanSection onStartScan={handleStartScan} />
              {formData.location_code && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm text-green-700">
                    <div>Kode Lokasi: <span className="font-semibold">{formData.location_code}</span></div>
                    <div>Area: <span className="font-semibold">{formData.area}</span></div>
                  </div>
                </div>
              )}

              {/* Action Buttons - Sticky at bottom on mobile, normal on desktop */}
              <div className="lg:sticky lg:top-6">
                <ActionButtons
                  onCancel={handleBack}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  isDisabled={!isFormValid}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;