import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import komponen
import Header from "../../components/edit_profil_karyawan/Header";
import PageTitle from "../../components/edit_profil_karyawan/PageTitle";
import ProfilePhoto from "../../components/edit_profil_karyawan/ProfilePhoto";
import PersonalInfo from "../../components/edit_profil_karyawan/PersonalInfo";
import AdditionalInfo from "../../components/edit_profil_karyawan/AdditionalInfo";
import WorkHistoryAndSkills from "../../components/edit_profil_karyawan/WorkHistoryAndSkills";
import Certifications from "../../components/edit_profil_karyawan/Certifications";
import WorkData from "../../components/edit_profil_karyawan/WorkData";
import PortfolioLink from "../../components/edit_profil_karyawan/PortfolioLink";
import ActionButtons from "../../components/edit_profil_karyawan/ActionButtons";
import StatusCard from "../../components/edit_profil_karyawan/StatusCard";

const baseUrl = import.meta.env.VITE_API_URL;

const EditEmployeeDataForm = () => {
  const navigate = useNavigate();

    // Dummy data
  const workHistoryDummy = [
    {
      company: "PT. Terbang kesatas",
      position: "Junior Security",
      period: "2018 - 2019",
    },
    {
      company: "PT. Terbang kesatas",
      position: "Senior Security",
      period: "2019 - 2022",
    },
    {
      company: "PT. Terbang kesatas",
      position: "Security Supervisor",
      period: "2022 - Sekarang",
    },
  ];

  const skillsDummy = [
    {
      title: "Keahlian Teknis",
      description: "Berdiskusi tentang masalah perkembangan zaman terkait cyber, keamanan, hacker dll.",
    },
    {
      title: "Analisis Keamanan",
      description: "Menganalisis resiko keamanan pada area kantor dan gedung",
    },
    {
      title: "Operasional",
      description: "Mengoperasikan alat komunikasi, bela diri, surveillance.",
    },
  ];

  const certificationsDummy = [
    { name: "Garda Madya", year: "2015" },
    { name: "Security Basic", year: "2018" },
    { name: "First Aid", year: "2020" },
    { name: "Cyber Security", year: "2023" },
  ];

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
const [workHistory, setWorkHistory] = useState(workHistoryDummy);
const [skills, setSkills] = useState(skillsDummy);
const [certifications, setCertifications] = useState(certificationsDummy);

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

  const handlePhotoUpload = () => {
    // Misalnya pakai file input manual (trigger click input)
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const photoURL = URL.createObjectURL(file);
        setProfilePhoto(photoURL); // untuk ditampilkan di img
        setPhotoFile(file); // untuk nanti dikirim ke backend kalau perlu
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value);
      }
    });

    if (profilePhoto instanceof File) {
      formDataToSend.append("profile_photo", profilePhoto);
    }

    try {
      const res = await fetch(`${baseUrl}/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      const result = await res.json();
      console.log("Hasil PATCH:", JSON.stringify(result, null, 2));

      if (res.ok) {
        alert("Profil berhasil diperbarui!");

        // Fetch ulang data profil
        const profileRes = await fetch(`${baseUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const profileData = await profileRes.json();

        if (profileRes.ok && profileData.data?.profile) {
          const profile = profileData.data.profile;

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
          console.log(profile);
          if (profile.profile_photo) {
            setProfilePhoto(profile.profile_photo);
          }
        }
      } else {
        alert("Gagal menyimpan perubahan.");
      }
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleCancel = () => {
    if (window.confirm("Yakin ingin membatalkan perubahan?")) {
      window.location.reload(); // Reload halaman untuk reset form
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
            <StatusCard formData={formData} onChange={handleInputChange} />
            <ActionButtons onSave={handleSave} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeDataForm;
