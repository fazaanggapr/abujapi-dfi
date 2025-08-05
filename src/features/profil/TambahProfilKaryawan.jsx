import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import Header from "../../components/tambah_profil_karyawan/ProfileHeader";
import PageTitle from "../../components/tambah_profil_karyawan/PageTitle";
import PersonalInfo from "../../components/tambah_profil_karyawan/PersonalInfo";
import AdditionalInfo from "../../components/tambah_profil_karyawan/AdditionalInfo";
import WorkHistoryAndSkills from "../../components/tambah_profil_karyawan/WorkHistoryAndSkills";
import Certifications from "../../components/tambah_profil_karyawan/Certifications";
import WorkData from "../../components/tambah_profil_karyawan/WorkData";
import PortfolioLink from "../../components/tambah_profil_karyawan/PortfolioLink";
import ActionButtons from "../../components/tambah_profil_karyawan/ActionButtons";

const baseUrl = import.meta.env.VITE_API_URL;

// Constants
const PHOTO_MAX_SIZE = 2 * 1024 * 1024; // 2MB
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png"];

// Initial form state
const initialFormData = {
  name: "",
  phone_number: "",
  address: "",
  gender: "",
  age: "",
  bank_account: "",
  education: "",
  employee_status: "",
  portfolio_link: "",
  placement_location: "",
  position: "",
  work_duration: "",
  work_location: "",
  weight: "",
  height: "",
  nik: "",
  grade: "",
  email: "",
  religion: "",
  place_date_of_birth: "",
};

const ProfilePhoto = ({ profilePhoto, onUploadPhoto, onRemovePhoto, isUploading }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile Preview"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Photo</span>
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        
        <button
          onClick={onUploadPhoto}
          disabled={isUploading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg mb-2 transition-colors"
        >
          {profilePhoto ? "Ganti Foto" : "Upload Foto"}
        </button>
        
        {profilePhoto && (
          <button
            onClick={onRemovePhoto}
            disabled={isUploading}
            className="text-red-500 hover:text-red-700 disabled:text-red-300 text-sm transition-colors"
          >
            Hapus Foto
          </button>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Format: JPG/PNG (Maks. 2MB)
        </p>
      </div>
    </div>
  );
};

const AddEmployeeDataForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState(initialFormData);

  // Photo and dynamic data states
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [workHistory, setWorkHistory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Validate photo file
  const validatePhotoFile = (file) => {
    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      throw new Error("Hanya file gambar (JPEG, PNG) yang diperbolehkan");
    }

    if (file.size > PHOTO_MAX_SIZE) {
      throw new Error("Ukuran file terlalu besar. Maksimal 2MB");
    }
  };

  // Handle photo upload with validation
  const handleUploadPhoto = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsPhotoUploading(true);

    try {
      validatePhotoFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
        setPhotoFile(file);
        setIsPhotoUploading(false);
      };
      reader.onerror = () => {
        alert("Gagal membaca file gambar");
        setIsPhotoUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert(error.message);
      setIsPhotoUploading(false);
    }
  }, []);

  // Handle input changes with validation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Validate numeric fields
    const numericFields = ['age', 'weight', 'height', 'work_duration'];
    if (numericFields.includes(name)) {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    // Validate NIK (only numbers, max 16 digits)
    if (name === 'nik') {
      const nikValue = value.replace(/[^0-9]/g, '').slice(0, 16);
      setFormData(prev => ({ ...prev, [name]: nikValue }));
      return;
    }

    // Validate phone number (only numbers and + at start)
    if (name === 'phone_number') {
      const phoneValue = value.replace(/[^0-9+]/g, '');
      setFormData(prev => ({ ...prev, [name]: phoneValue }));
      return;
    }

    // For other fields, use value as is
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Add new work history entry
  const addWorkHistory = useCallback(() => {
    setWorkHistory(prev => [...prev, {
      company: "",
      position: "",
      period: ""
    }]);
  }, []);

  // Add new skill entry
  const addSkill = useCallback(() => {
    setSkills(prev => [...prev, {
      title: "",
      description: ""
    }]);
  }, []);

  // Add new certification entry
  const addCertification = useCallback(() => {
    setCertifications(prev => [...prev, {
      name: "",
      year: ""
    }]);
  }, []);

  // Validate form data
  const validateFormData = () => {
    const requiredFields = ['name', 'email', 'nik'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      throw new Error(`Field berikut harus diisi: ${missingFields.join(', ')}`);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error("Format email tidak valid");
    }

    // Validate NIK (should be 16 digits)
    if (formData.nik && !/^\d{16}$/.test(formData.nik)) {
      throw new Error("NIK harus terdiri dari 16 digit angka");
    }

    // Validate numeric fields
    const numericFields = {
      age: 'Umur',
      weight: 'Berat badan',
      height: 'Tinggi badan',
      work_duration: 'Durasi kerja'
    };

    Object.entries(numericFields).forEach(([field, label]) => {
      if (formData[field] && (isNaN(formData[field]) || formData[field] <= 0)) {
        throw new Error(`${label} harus berupa angka positif`);
      }
    });

    // Validate specific ranges
    if (formData.age && (parseInt(formData.age) < 17 || parseInt(formData.age) > 65)) {
      throw new Error("Umur harus antara 17-65 tahun");
    }

    if (formData.height && (parseInt(formData.height) < 100 || parseInt(formData.height) > 250)) {
      throw new Error("Tinggi badan harus antara 100-250 cm");
    }

    if (formData.weight && (parseInt(formData.weight) < 30 || parseInt(formData.weight) > 200)) {
      throw new Error("Berat badan harus antara 30-200 kg");
    }
  };

  // Build form data for submission
  const buildFormDataForSubmission = () => {
    const formDataToSend = new FormData();

    // Add form fields with proper type conversion
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        // Convert numeric fields to integers
        const numericFields = ['age', 'weight', 'height', 'work_duration'];
        if (numericFields.includes(key) && value) {
          formDataToSend.append(key, parseInt(value).toString());
        } else {
          formDataToSend.append(key, value.toString().trim());
        }
      }
    });

    // Add photo if exists
    if (photoFile) {
      formDataToSend.append("profile_photo", photoFile);
    }

    // Add dynamic data as JSON
    if (workHistory.length > 0) {
      // Filter out empty work history entries
      const validWorkHistory = workHistory.filter(item => 
        item.company?.trim() || item.position?.trim() || item.period?.trim()
      );
      if (validWorkHistory.length > 0) {
        formDataToSend.append("work_history", JSON.stringify(validWorkHistory));
      }
    }
    
    if (skills.length > 0) {
      // Filter out empty skills entries
      const validSkills = skills.filter(item => 
        item.title?.trim() || item.description?.trim()
      );
      if (validSkills.length > 0) {
        formDataToSend.append("skills", JSON.stringify(validSkills));
      }
    }
    
    if (certifications.length > 0) {
      // Filter out empty certification entries
      const validCertifications = certifications.filter(item => 
        item.name?.trim() || item.year?.trim()
      );
      if (validCertifications.length > 0) {
        formDataToSend.append("certifications", JSON.stringify(validCertifications));
      }
    }

    return formDataToSend;
  };

  // Handle form submission
  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Sesi telah berakhir. Silakan login kembali.");
      navigate("/login");
      return;
    }

    try {
      // Validate form data
      validateFormData();
      
      setIsSubmitting(true);

      const formDataToSend = buildFormDataForSubmission();

      const res = await fetch(`${baseUrl}/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Server tidak mengembalikan JSON:\n\n${text}`);
      }

      const result = await res.json();

      if (!res.ok) {
        // Handle different error status codes
        if (res.status === 422) {
          // Validation errors
          const errorMessages = Object.entries(result.errors || {})
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          throw new Error(`Validasi gagal:\n${errorMessages}`);
        } else if (res.status === 401) {
          throw new Error("Tidak diotorisasi. Silakan login kembali.");
        } else {
          throw new Error(result.message || `Server error: ${res.status}`);
        }
      }

      alert("Data karyawan berhasil ditambahkan!");
      navigate("/data-karyawan");

    } catch (error) {
      console.error("Error adding employee:", error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert("Gagal terhubung ke server. Periksa koneksi internet Anda.");
      } else {
        alert(`Gagal menambahkan karyawan: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleCancel = useCallback(() => {
    if (window.confirm("Yakin ingin membatalkan? Semua perubahan akan hilang.")) {
      setFormData(initialFormData);
      setProfilePhoto(null);
      setPhotoFile(null);
      setWorkHistory([]);
      setSkills([]);
      setCertifications([]);
    }
  }, []);

  // Remove photo
  const handleRemovePhoto = useCallback(() => {
    setProfilePhoto(null);
    setPhotoFile(null);
  }, []);

  // Trigger file input click
  const triggerFileInput = useCallback(() => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png";
    fileInput.onchange = handleUploadPhoto;
    fileInput.click();
  }, [handleUploadPhoto]);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Header />
        <PageTitle title="Tambah Data Karyawan Baru" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Photo */}
          <div className="lg:col-span-1">
            <ProfilePhoto
              profilePhoto={profilePhoto}
              onUploadPhoto={triggerFileInput}
              onRemovePhoto={handleRemovePhoto}
              isUploading={isPhotoUploading}
            />
          </div>

          {/* Middle Column - Personal & Work Information */}
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfo 
              formData={formData} 
              onChange={handleInputChange} 
            />
            <AdditionalInfo 
              formData={formData} 
              onChange={handleInputChange} 
            />
            <WorkHistoryAndSkills
              workHistory={workHistory}
              setWorkHistory={setWorkHistory}
              skills={skills}
              setSkills={setSkills}
              onAddWorkHistory={addWorkHistory}
              onAddSkill={addSkill}
            />
            <Certifications
              certifications={certifications}
              setCertifications={setCertifications}
              onAddCertification={addCertification}
            />
          </div>

          {/* Right Column - Work Data & Actions */}
          <div className="lg:col-span-1 space-y-8">
            <WorkData 
              formData={formData} 
              onChange={handleInputChange} 
            />
            <PortfolioLink 
              formData={formData} 
              onChange={handleInputChange} 
            />
            <ActionButtons 
              onSave={handleSave} 
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeDataForm;