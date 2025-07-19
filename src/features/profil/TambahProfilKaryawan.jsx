import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import komponen
import Header from "../../components/tambah_profil_karyawan/ProfileHeader";
import PageTitle from "../../components/tambah_profil_karyawan/PageTitle";
import ProfilePhoto from "../../components/tambah_profil_karyawan/ProfilePhoto";
import PersonalInfo from "../../components/tambah_profil_karyawan/PersonalInfo";
import AdditionalInfo from "../../components/tambah_profil_karyawan/AdditionalInfo";
import WorkHistoryAndSkills from "../../components/tambah_profil_karyawan/WorkHistoryAndSkills";
import Certifications from "../../components/tambah_profil_karyawan/Certifications";
import WorkData from "../../components/tambah_profil_karyawan/WorkData";
import PortfolioLink from "../../components/tambah_profil_karyawan/PortfolioLink";
import ActionButtons from "../../components/tambah_profil_karyawan/ActionButtons";

const baseUrl = import.meta.env.VITE_API_URL;

const AddEmployeeDataForm = () => {
  const navigate = useNavigate();

  // State untuk form data - dimulai dengan nilai kosong untuk tambah data baru
  const [formData, setFormData] = useState({
    profile_photo_url: "",
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
    status: "",
    work_duration: "",
    work_location: "",
    weight: "",
    height: "",
    nik: "",
    grade: "",
    email: "",
    religion: "",
    place_date_of_birth: "",
  });

  // State untuk foto profil
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  // State untuk data dinamis - dimulai dengan array kosong untuk tambah data baru
  const [workHistory, setWorkHistory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Handler untuk upload foto
  const handleUploadPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePhoto(e.target.result);
          setPhotoFile(file);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Handler untuk perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler untuk menyimpan data baru
  const handleSave = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    // Validasi data wajib (sesuaikan dengan requirement Anda)
    if (!formData.name || !formData.email || !formData.phone_number) {
      alert("Nama, email, dan nomor telepon harus diisi!");
      return;
    }

    // Siapkan FormData untuk dikirim
    const formDataToSend = new FormData();
    
    // Append semua field form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formDataToSend.append(key, value);
      }
    });

    // Append foto jika ada
    if (photoFile) {
      formDataToSend.append("profile_photo", photoFile);
    }

    // Append work history, skills, dan certifications sebagai JSON
    if (workHistory.length > 0) {
      formDataToSend.append("work_history", JSON.stringify(workHistory));
    }
    if (skills.length > 0) {
      formDataToSend.append("skills", JSON.stringify(skills));
    }
    if (certifications.length > 0) {
      formDataToSend.append("certifications", JSON.stringify(certifications));
    }

    try {
      // Kirim data untuk membuat profil baru
      const res = await fetch(`${baseUrl}/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      const result = await res.json();
      console.log("Hasil POST:", JSON.stringify(result, null, 2));

      if (res.ok) {
        alert("Data karyawan berhasil ditambahkan!");
        
        // Reset form atau redirect ke halaman lain
        navigate("/employees"); // Sesuaikan dengan route yang Anda inginkan
      } else {
        alert(`Gagal menambahkan data karyawan: ${result.message || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // Handler untuk membatalkan dan reset form
  const handleCancel = () => {
    if (window.confirm("Yakin ingin membatalkan? Semua data yang diisi akan hilang.")) {
      // Reset semua state ke nilai awal
      setFormData({
        profile_photo_url: "",
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
        status: "",
        work_duration: "",
        work_location: "",
        weight: "",
        height: "",
        nik: "",
        grade: "",
        email: "",
        religion: "",
        place_date_of_birth: "",
      });
      setProfilePhoto(null);
      setPhotoFile(null);
      setWorkHistory([]);
      setSkills([]);
      setCertifications([]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Header />
        <PageTitle />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Photo & Basic Info */}
          <div className="lg:col-span-1">
            <ProfilePhoto
              profilePhoto={profilePhoto}
              onUploadPhoto={handleUploadPhoto}
            />
          </div>

          {/* Middle Column - Personal & Work Information */}
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfo formData={formData} onChange={handleInputChange} />
            <AdditionalInfo formData={formData} onChange={handleInputChange} />
            <WorkHistoryAndSkills
              workHistory={workHistory}
              setWorkHistory={setWorkHistory}
              skills={skills}
              setSkills={setSkills}
            />
            <Certifications
              certifications={certifications}
              setCertifications={setCertifications}
            />
          </div>

          {/* Right Column - Work Data & Actions */}
          <div className="lg:col-span-1 space-y-8">
            <WorkData formData={formData} onChange={handleInputChange} />
            <PortfolioLink formData={formData} onChange={handleInputChange} />
            <ActionButtons onSave={handleSave} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeDataForm;