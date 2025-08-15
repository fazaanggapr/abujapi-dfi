import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Komponen
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

  const appendTimestamp = (url) => (url ? `${url}?t=${Date.now()}` : "");

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
    work_duration: "",
    work_location: "",
    weight: "",
    height: "",
    nik: "",
    grade: "",
    email: "",
    agama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      if (res.ok && result.data) {
        const profile = result.data.profile || {};

        setFormData({
          ...formData,
          name: result.data.name || "",
          email: result.data.email || "",
          role: result.data.role || "",
          ...profile,
        });

        if (profile.profile_photo_url) {
          setProfilePhoto(appendTimestamp(profile.profile_photo_url));
        }
      }
    } catch (err) {
      toast.error("Gagal memuat profil.");
      console.error("Fetch profile error:", err);
    }
  };

  fetchProfile();
}, []);


  const handlePhotoUpload = () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      toast.warning("Ukuran file maksimal 15MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.warning("Hanya file gambar yang diperbolehkan.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const photoURL = URL.createObjectURL(file);
    setProfilePhoto(photoURL);
    setPhotoFile(file);

    const token = localStorage.getItem("access_token");

    try {
      const form = new FormData();

      // HANYA kirim field yang valid DAN BUKAN `profile_photo_url`
      Object.entries(formData).forEach(([key, value]) => {
        if (
          value !== null &&
          value !== undefined &&
          key !== "profile_photo_url"
        ) {
          form.append(key, value);
        }
      });

      form.append("profile_photo", file);

      const res = await fetch(`${baseUrl}/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: form,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const result = await res.json();
      const newUrl = result?.data?.profile_photo_url;

      if (newUrl) {
        const withTimestamp = appendTimestamp(newUrl);
        setProfilePhoto(withTimestamp);
        setFormData((prev) => ({
          ...prev,
          profile_photo_url: newUrl,
        }));
        setPhotoFile(null);
        toast.success("Foto profil berhasil diperbarui!");
      } else {
        toast.info("Foto berhasil diunggah, tapi URL tidak tersedia.");
      }
    } catch (err) {
      toast.error("Upload gagal: " + err.message);
      setPhotoFile(null);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  fileInput.click();
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
const handleSave = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    toast.warning("Token tidak ditemukan. Silakan login ulang.");
    return;
  }

  const formToSend = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      key !== "profile_photo_url"
    ) {
      formToSend.append(key, value);
    }
  });

  if (photoFile) {
    formToSend.append("profile_photo", photoFile);
  }

  try {
    const res = await fetch(`${baseUrl}/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formToSend,
    });


    const result = await res.json();

    if (res.ok) {
      toast.success("Profil berhasil diperbarui!");

      const photoUrl = result?.data?.profile_photo_url;
      if (photoUrl) {
        const withTimestamp = appendTimestamp(photoUrl);
        setProfilePhoto(withTimestamp);
        setFormData((prev) => ({
          ...prev,
          profile_photo_url: photoUrl,
        }));
        setPhotoFile(null);
      }
    } else {
      toast.error(result.message || "Gagal menyimpan perubahan.");
    }
  } catch (err) {
    toast.error("Terjadi kesalahan saat menyimpan data.");
  }
};

  const handleCancel = () => {
    if (window.confirm("Yakin ingin membatalkan perubahan?")) {
      window.location.reload();
    }
  };

  const PhotoProfileComponent = ({
    profilePhoto,
    onUploadPhoto,
    isLoading,
    uploadProgress,
  }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Foto Profil
        </h2>
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">Tidak Ada Foto</span>
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <span className="text-xs block">{uploadProgress}%</span>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onUploadPhoto}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isLoading ? "Mengunggah..." : "Ubah Foto Profil"}
          </button>
          <p className="mt-2 text-xs text-gray-500 text-center">
            Format: JPG/PNG (Maks. 15MB)
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Header />
        <PageTitle />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PhotoProfileComponent
              profilePhoto={profilePhoto}
              onUploadPhoto={handlePhotoUpload}
              isLoading={isUploading}
              uploadProgress={uploadProgress}
            />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfo formData={formData}  onChange={handleInputChange} />
            <AdditionalInfo formData={formData} onChange={handleInputChange} />
            <WorkHistoryAndSkills
              workHistory={[]} // bisa diganti sesuai kebutuhan
              setWorkHistory={() => {}}
              skills={[]}
              setSkills={() => {}}
            />
            <Certifications
              certifications={[]}
              setCertifications={() => {}}
            />
          </div>
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
