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
            name: profile.name || 'John Doe',
            phone_number: profile.phone_number || '+62 812-3456-7890',
            address: profile.address || 'Jl. Sudirman No. 123, Jakarta',
            gender: profile.gender || 'Laki-laki',
            age: profile.age || '28 tahun',
            bank_account: profile.bank_account || 'BCA - 1234567890',
            education: profile.education || 'S1 Teknik Informatika',
            employee_status: profile.employee_status || 'Karyawan Tetap',
            portfolio_link: profile.portfolio_link || 'https://johndoe.dev',
            placement_location: profile.placement_location || 'Jakarta Pusat',
            position: profile.position || 'Senior Frontend Developer',
            status: profile.status || 'Aktif',
            work_duration: profile.work_duration || '3 tahun 2 bulan',
            work_location: profile.work_location || 'Jakarta',
            weight: profile.weight || '70 kg',
            height: profile.height || '175 cm',
            nik: profile.nik || '3171234567890123',
            grade: profile.grade || 'A',
            email: profile.email || 'john.doe@company.com'
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        // Set default values if API fails
        setFormData({
          name: 'John Doe',
          phone_number: '+62 812-3456-7890',
          address: 'Jl. Sudirman No. 123, Jakarta',
          gender: 'Laki-laki',
          age: '28 tahun',
          bank_account: 'BCA - 1234567890',
          education: 'S1 Teknik Informatika',
          employee_status: 'Karyawan Tetap',
          portfolio_link: 'https://johndoe.dev',
          placement_location: 'Jakarta Pusat',
          position: 'Senior Frontend Developer',
          status: 'Aktif',
          work_duration: '3 tahun 2 bulan',
          work_location: 'Jakarta',
          weight: '70 kg',
          height: '175 cm',
          nik: '3171234567890123',
          grade: 'A',
          email: 'john.doe@company.com'
        });
      }
    };

    fetchProfile();
  }, [baseUrl]);

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
          alert("Foto profil berhasil diunggah!");
        };
        reader.readAsDataURL(file);
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
      const res = await fetch(`${baseUrl}/profile`, {
        method: "PATCH",
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