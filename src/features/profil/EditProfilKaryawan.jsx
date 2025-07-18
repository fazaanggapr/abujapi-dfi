import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import komponen
import Header from "../../components/edit_profil_karyawan/Header";
import PageTitle from "../../components/edit_profil_karyawan/PageTitle";
import ProfilePhoto from "../../components/edit_profil_karyawan/ProfilePhoto";
import BasicInfo from "../../components/edit_profil_karyawan/BasicInfo";
import DetailedInfo from "../../components/edit_profil_karyawan/DetailedInfo";
import WorkHistory from "../../components/edit_profil_karyawan/WorkHistory";
import Skills from "../../components/edit_profil_karyawan/Skills";
import Certifications from "../../components/edit_profil_karyawan/Certifications";
import WorkData from "../../components/edit_profil_karyawan/WorkData";
import PortfolioLink from "../../components/edit_profil_karyawan/PortfolioLink";
import ActionButtons from "../../components/edit_profil_karyawan/ActionButtons";
import StatusCard from "../../components/edit_profil_karyawan/StatusCard";

const baseUrl = import.meta.env.VITE_API_URL;

const EditEmployeeDataForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [workHistory, setWorkHistory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Fetch profile data saat komponen dimount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(`${baseUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await res.json();
        if (res.ok && result.data?.profile) {
          const profile = result.data.profile;
          setFormData({
            name: profile.name || "",
            phone_number: profile.phone_number || "",
            address: profile.address || "",
            gender: profile.gender || "",
            age: profile.age || "",
            bank_account: profile.bank_account || "",
            education: profile.education || "",
            employee_status: profile.employee_status || "",
            portfolio_link: profile.portfolio_link || "",
            placement_location: profile.placement_location || "",
            position: profile.position || "",
            status: profile.status || "",
            work_duration: profile.work_duration || "",
            work_location: profile.work_location || "",
            weight: profile.weight || "",
            height: profile.height || "",
            nik: profile.nik || "",
            grade: profile.grade || "",
            email: profile.email || "",
          });

          if (profile.profile_photo) {
            setProfilePhoto(profile.profile_photo);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = () => {
  // Misalnya pakai file input manual (trigger click input)
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setProfilePhoto(photoURL);     // untuk ditampilkan di img
      setPhotoFile(file);            // untuk nanti dikirim ke backend kalau perlu
      console.log("File foto dipilih:", file);
    }
  };

  fileInput.click();
};

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

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (photoFile) {
      formDataToSend.append("profile_photo", photoFile);
    }

    try {
      const res = await fetch(`${baseUrl}/profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Profil berhasil diperbarui!");
        navigate("/lihat-profil");
      } else {
        alert("Gagal menyimpan: " + (result.message || "Terjadi kesalahan"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan jaringan");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Yakin ingin membatalkan perubahan?")) {
      navigate("/lihat-profil");
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Header />
        <PageTitle />

        <BasicInfo
          formData={formData}
          profilePhoto={profilePhoto}
          onUploadPhoto={handleUploadPhoto}
          onChange={handleInputChange}
        />

        <DetailedInfo
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WorkHistory workHistory={workHistory} />
          <Skills skills={skills} />
        </div>

        <Certifications certifications={certifications} />

        <div className="space-y-8 mt-10">
          <WorkData formData={formData} handleInputChange={handleInputChange} />

          <PortfolioLink
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <ActionButtons onSave={handleSave} onCancel={handleCancel} />

          <StatusCard />
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeDataForm;
