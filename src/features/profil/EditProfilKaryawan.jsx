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
      description:
        "Berdiskusi tentang masalah perkembangan zaman terkait cyber, keamanan, hacker dll.",
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

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [workHistory, setWorkHistory] = useState(workHistoryDummy);
  const [skills, setSkills] = useState(skillsDummy);
  const [certifications, setCertifications] = useState(certificationsDummy);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
            profile_photo_url: profile.profile_photo_url,
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
            religion: profile.religion || "",
            place_date_of_birth: profile.place_date_of_birth || "",
          });

          if (profile.profile_photo_url) {
            setProfilePhoto(profile.profile_photo_url);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handlePhotoUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      
      if (!file) return;
      
      // Validasi ukuran file (maks 2MB)
      if (file.size > 25 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 15MB.');
        return;
      }
      
      // Validasi tipe file
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        alert('Format file tidak didukung. Harus JPG/PNG.');
        return;
      }
      
      setIsUploading(true);
      setUploadProgress(0);
      
      try {
        // Tampilkan preview
        const photoURL = URL.createObjectURL(file);
        setProfilePhoto(photoURL);
        
        // Upload ke server
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        formData.append('profile_photo', file);
        
        const xhr = new XMLHttpRequest();
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(progress);
          }
        };
        
        const uploadPromise = new Promise((resolve, reject) => {
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(new Error('Upload failed'));
            }
          };
          
          xhr.onerror = () => reject(new Error('Upload failed'));
          xhr.open('POST', `${baseUrl}/upload-profile-photo`, true);
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
          xhr.send(formData);
        });
        
        const result = await uploadPromise;
        
        if (result.data?.profile_photo_url) {
          setFormData(prev => ({
            ...prev,
            profile_photo_url: result.data.profile_photo_url
          }));
          alert('Foto profil berhasil diupdate!');
        }
        
      } catch (error) {
        console.error('Upload error:', error);
        alert('Gagal mengunggah foto: ' + error.message);
        // Kembalikan ke foto sebelumnya jika ada
        if (formData.profile_photo_url) {
          setProfilePhoto(formData.profile_photo_url);
        } else {
          setProfilePhoto(null);
        }
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    };
    
    fileInput.click();
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

    if (photoFile) {
      formDataToSend.append("profile_photo", photoFile);
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
            profile_photo_url: profile.profile_photo_url,
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
            religion: profile.religion || "",
            place_date_of_birth: profile.place_date_of_birth || "",
          });
          
          if (profile.profile_photo_url) {
            setProfilePhoto(profile.profile_photo_url);
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

  const ProfilePhoto = ({ profilePhoto, onUploadPhoto, isLoading, uploadProgress }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Foto Profil</h2>
      
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {profilePhoto ? (
            <div className="relative">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <span className="text-xs block">{uploadProgress}%</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Photo</span>
            </div>
          )}
        </div>
        
        <button
          onClick={onUploadPhoto}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
            isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          {isLoading ? 'Mengunggah...' : 'Ubah Foto Profil'}
        </button>
        
        <p className="mt-2 text-xs text-gray-500 text-center">
          Format: JPG/PNG (Maks. 15MB)
        </p>
        
        {isLoading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
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
              profilePhoto={profilePhoto || formData.profile_photo_url}
              onUploadPhoto={handlePhotoUpload}
              isLoading={isUploading}
              uploadProgress={uploadProgress}
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