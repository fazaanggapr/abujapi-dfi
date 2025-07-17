  // Main EditEmployeeDataForm Component
  import React, { useState, useEffect } from 'react';

  // Import all component pieces
  import Header from '../../components/edit_profil/Header';
  import PageTitle from '../../components/edit_profil/PageTitle';
  import BasicInfo from '../../components/edit_profil/BasicInfo';
  import DetailedInfo from '../../components/edit_profil/DetailedInfo';
  import WorkHistory from '../../components/edit_profil/WorkHistory';
  import Skills from '../../components/edit_profil/Skills';
  import Certifications from '../../components/edit_profil/Certifications';
  import WorkData from '../../components/edit_profil/WorkData';
  import PortfolioLink from '../../components/edit_profil/PortfolioLink';
  import ActionButtons from '../../components/edit_profil/ActionButtons';
  import StatusCard from '../../components/edit_profil/StatusCard';
  import ProfilePhoto from '../../components/edit_profil/ProfilePhoto';

  const EditEmployeeDataForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      phone_number: '',
      address: '',
      gender: '',
      age: '',
      bank_account: '',
      education: '',
      employee_status: '',
      portfolio_link: '',
      placement_location: '',
      position: '',
      status: '',
      work_duration: '',
      work_location: '',
      weight: '',
      height: '',
      nik: '',
      grade: '',
      email: ''

    });

    const [workHistory, setWorkHistory] = useState([
      {
        company: "PT. Teknologi Maju",
        position: "Frontend Developer",
        period: "2022 - Sekarang"
      },
      {
        company: "CV. Digital Solutions",
        position: "Web Developer",
        period: "2020 - 2022"
      }
    ]);

    const [skills, setSkills] = useState([
      {
        title: "React.js Development",
        description: "Frontend framework expertise"
      },
      {
        title: "Node.js Backend",
        description: "Server-side development"
      },
      {
        title: "Database Management",
        description: "MySQL, PostgreSQL"
      }
    ]);

    const [certifications, setCertifications] = useState([
      { name: "AWS Certified", year: "2023" },
      { name: "React Developer", year: "2022" },
      { name: "Node.js Expert", year: "2021" },
      { name: "Database Admin", year: "2020" }
    ]);

    const [profilePhoto, setProfilePhoto] = useState(null);

    const baseUrl = import.meta.env.VITE_API_URL;

   useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Akses ditolak. Anda belum login.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Gagal mengambil data profil:", result);
        alert("Gagal mengambil data profil: " + (result.message || "Silakan coba lagi nanti."));
        return;
      }

      const profile = result.data?.profile;

      if (!profile) {
        alert("Profil tidak ditemukan untuk user yang login.");
        return;
      }

      setFormData({
        name: profile.name || '',
        phone_number: profile.phone_number || '',
        address: profile.address || '',
        gender: profile.gender || '',
        age: profile.age || '',
        bank_account: profile.bank_account || '',
        education: profile.education || '',
        employee_status: profile.employee_status || '',
        portfolio_link: profile.portfolio_link || '',
        placement_location: profile.placement_location || '',
        position: profile.position || '',
        status: profile.status || '',
        work_duration: profile.work_duration || '',
        work_location: profile.work_location || '',
        weight: profile.weight || '',
        height: profile.height || '',
        nik: profile.nik || '',
        grade: profile.grade || '',
        email: profile.email || '',
      });

    } catch (err) {
      console.error("Terjadi kesalahan saat mengambil profil:", err);
      alert("Terjadi kesalahan saat menghubungi server. Silakan cek koneksi atau hubungi admin.");
    }
  };

  fetchProfile();
}, [baseUrl]);

const uploadPhoto = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_photo", file);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${baseUrl}/profile`, {
          method: "POST", // atau "PUT" sesuai kebutuhan
          headers: {
            Authorization: `Bearer ${token}`,

          },
          body: formData,
        });

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("Bukan JSON:", text);
          alert("Terjadi kesalahan pada server. Cek console untuk detail.");
          return;
        }


        if (response.ok) {
          // tampilkan preview
          const reader = new FileReader();
          reader.onload = (e) => {
            setProfilePhoto(e.target.result);
            alert("Foto profil berhasil diunggah!");
          };
          reader.readAsDataURL(file);
        } else {
          alert("Gagal mengunggah foto profil: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat mengunggah foto.");
      }
    }
  };
  input.click();
};

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

 const handleSave = async () => {
  const token = localStorage.getItem("access_token");

  try {
    const res = await fetch(`https://abujapi-proto.ihsanwd10.my.id/api/profile`, {
      method: "POST", // Ganti jadi POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Profil berhasil diperbarui!");
    } else {
      alert("Gagal menyimpan: " + result.message);
    }
  } catch (err) {
    console.error("Error saat menyimpan profil:", err);
    alert("Terjadi kesalahan.");
  }
};


    const handleCancel = () => {
      if (window.confirm("Yakin ingin membatalkan perubahan?")) {
        window.location.reload();
      }
    };

    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <Header />
          <PageTitle />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {/* Using BasicInfo component instead of ProfilePhoto directly */}
              <BasicInfo
                formData={formData}
                profilePhoto={profilePhoto}
                onUploadPhoto={uploadPhoto}
              />
              
              <DetailedInfo formData={formData} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WorkHistory workHistory={workHistory} />
                <Skills skills={skills} />
              </div>

              <Certifications certifications={certifications} />
            </div>

            <div className="space-y-8">
              <WorkData formData={formData} />
              <PortfolioLink formData={formData} />
              <ActionButtons onSave={handleSave} onCancel={handleCancel} />
              <StatusCard />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default EditEmployeeDataForm;