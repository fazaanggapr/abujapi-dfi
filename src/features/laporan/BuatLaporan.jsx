import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const AddTask = () => {
  const navigate = useNavigate();
  
  // State management
    const [formData, setFormData] = useState({
      area: "",
      description: "",
      location_code: "", // awalnya kosong
      image_description: ""
    });

//  const [patrolActivities, setPatrolActivities] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  // Event handlers
  const handleBack = () => navigate(-1);

/*  const handleAddPatrolActivity = (activity) => {
    setPatrolActivities([...patrolActivities, activity]);
  }; */

/*  const handleRemoveActivity = (id) => {
    setPatrolActivities(patrolActivities.filter(activity => activity.id !== id));
  }; */

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (imageData) => {
    setSelectedImage(imageData);
    setError("");
  };

  const handleImageDescriptionChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image_description: e.target.value
    }));
  };

  const handleQRScanSuccess = (decodedText) => {
    setFormData(prev => ({
      ...prev,
      location_code: decodedText
    }));
    setShowScanner(false);
  };

  const handleStartScan = () => {
    setShowScanner(true);
  };

  const handleStopScan = () => {
    setShowScanner(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.description || !formData.area || !selectedImage) {
      setError("Harap isi semua field yang wajib diisi");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      
      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

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

      alert("Laporan berhasil dibuat!");
      navigate("/laporan");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation
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
              <div className="text-sm text-slate-700">
                Lokasi hasil scan: <span className="font-semibold">{formData.location_code}</span>
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

export default AddTask