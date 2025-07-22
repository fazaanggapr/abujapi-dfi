import React, { useState, useEffect } from "react";

import Header from "../../components/lihat_profil_saya/Header";
import PageTitle from "../../components/lihat_profil_saya/PageTitle";
import ProfilePhoto from "../../components/lihat_profil_saya/ProfilePhoto";
import PersonalInfo from "../../components/lihat_profil_saya/PersonalInfo";
import ActionButtons from "../../components/lihat_profil_saya/ActionButtons";

const baseUrl = import.meta.env.VITE_API_URL; // atau ganti dengan hardcoded URL jika perlu

const LihatProfil = () => {
  const [employee, setEmployee] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    profile_photo_url: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${baseUrl}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();
        if (response.ok && result.data && result.data.profile) {
          const profile = result.data.profile;
          setEmployee({
            profile_photo_url: profile.profile_photo_url,
            grade: profile.grade,
          });
          setFormData({
            profile_photo_url: profile.profile_photo_url || "",
            name: profile.name || "",
            email: profile.email || "",
            password: "",
            role: profile.role || "",
          });
          console.log("DEBUG PROFILE", profile);
        } else {
          console.error("Failed to fetch employee data:", result);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  const uploadPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePhoto(e.target.result);
          setFormData((prev) => ({
            ...prev,
            profile_photo_url: e.target.result,
          }));
          alert("Foto profil berhasil diunggah!");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Simpan data profil (simulasi)");
    // Kirim ke API jika sudah siap
  };

  const handleCancel = () => {
    alert("Perubahan dibatalkan.");
    // Reset ke data awal jika perlu
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Memuat profil...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Header />
        <PageTitle />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProfilePhoto employee={employee} uploadPhoto={uploadPhoto} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <PersonalInfo formData={formData} onChange={handleInputChange} />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <ActionButtons onSave={handleSave} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LihatProfil;
