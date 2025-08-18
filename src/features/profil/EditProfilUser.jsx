import React, { useState, useEffect } from "react";

import Header from "../../components/edit_profil_user/Header";
import PageTitle from "../../components/edit_profil_user/PageTitle";
import ProfilePhoto from "../../components/edit_profil_user/ProfilePhoto";
import PersonalInfo from "../../components/edit_profil_user/PersonalInfo";
import ActionButtons from "../../components/edit_profil_user/ActionButtons";
import toast from "react-hot-toast";
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
      const response = await fetch(`${baseUrl}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        // kalau API return { data: {...} } → ambil result.data
        // kalau API return langsung {...} → ambil result
        const user = result.data ? result.data : result;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          password: "",
          role: user.role || "",
        });

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

  let dataToSend = { ...formData };

  if (dataToSend.old_password && dataToSend.new_password) {
    dataToSend = {
      email: dataToSend.email,
      old_password: dataToSend.old_password,
      new_password: dataToSend.new_password,
      new_password_confirmation: dataToSend.new_password_confirmation,
    };
  } else {
    // Kalau cuma update profil (tanpa password)
    delete dataToSend.password;
    delete dataToSend.old_password;
    delete dataToSend.new_password;
    delete dataToSend.new_password_confirmation;
  }

  try {
    const response = await fetch(`${baseUrl}/update-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Profil berhasil diperbarui!", {
        position: "top-right",
        style: {
          borderRadius: "10px",
          background: "#fff6f6ff",
          color: "#000000ff",
        },
      });
    } else {
      toast.error(result.message || "Gagal update profil.", {
        position: "top-right",
      });
    }
  } catch (error) {
    toast.error("Terjadi kesalahan saat update profil.", {
      position: "top-right",
    });
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
