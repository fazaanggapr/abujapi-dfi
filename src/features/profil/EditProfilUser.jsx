import React, { useState, useEffect } from "react";

import Header from "../../components/edit_profil_user/Header";
import PageTitle from "../../components/edit_profil_user/PageTitle";
import ProfilePhoto from "../../components/edit_profil_user/ProfilePhoto";
import PersonalInfo from "../../components/edit_profil_user/PersonalInfo";
import ActionButtons from "../../components/edit_profil_user/ActionButtons";
import { useParams } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_URL; // atau ganti dengan hardcoded URL jika perlu

const EditProfilUser = () => {
  const [employee, setEmployee] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
        const response = await fetch(`${baseUrl}/admin/user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();
        if (response.ok && result.data) {
          const profile = result.data.profile;

          setEmployee({
            profile_photo_url: result.data.profile_photo_url || "",
            grade: profile?.grade || "",
          
            role: result.data.role || "",
          });

          setFormData({
            profile_photo_url: result.data.profile_photo_url || "",
            name: result.data.name || "",
            email: result.data.email || "",
            password: "",
            role: result.data.role || "",
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

  const handleSave = async () => {
  const token = localStorage.getItem("access_token");

  const dataToSend = { ...formData };
  if (!dataToSend.password) {
    delete dataToSend.password; // jangan kirim kalau kosong
  }

  try {
    const response = await fetch(`${baseUrl}/admin/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Profil berhasil diperbarui!");
    } else {
      alert(result.message || "Gagal update profil.");
    }
  } catch (error) {
    alert("Terjadi kesalahan saat update profil.");
  }
};


  const handleCancel = () => {
    alert("Perubahan dibatalkan.");
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

export default EditProfilUser;
