import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Building } from "lucide-react";
import baseUrl from "../../utils/api";
import ProfileHeader from "../../components/lihat_profil_karyawan/ProfileHeader";
import ProfilePhoto from "../../components/lihat_profil_karyawan/ProfilePhoto";
import PersonalInfo from "../../components/lihat_profil_karyawan/PersonalInfo";
import AdditionalInfo from "../../components/lihat_profil_karyawan/AdditionalInfo";
import WorkHistoryAndSkills from "../../components/lihat_profil_karyawan/WorkHistoryAndSkills";
import Certifications from "../../components/lihat_profil_karyawan/Certifications";
import WorkData from "../../components/lihat_profil_karyawan/WorkData";
import PortfolioLink from "../../components/lihat_profil_karyawan/PortfolioLink";
import ActionButtons from "../../components/lihat_profil_karyawan/ActionButtons";
// import LoadingSpinner from "./components/LoadingSpinner";

const ViewEmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Dummy data
  const workHistory = [
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

  const skills = [
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

  const certifications = [
    { name: "Garda Madya", year: "2015" },
    { name: "Security Basic", year: "2018" },
    { name: "First Aid", year: "2020" },
    { name: "Cyber Security", year: "2023" },
  ];

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
            user_id: profile.user_id,
            name: result.data.name,
            email: result.data.email,
            nik: profile.nik,
            phone: profile.phone_number,
            status: profile.status,
            address: profile.address,
            gender: profile.gender,
            age: profile.age + " tahun",
            height: profile.height + " cm",
            weight: profile.weight + " kg",
            education: profile.education,
            bankAccount: profile.bank_account,
            employeeStatus: profile.employee_status,
            position: profile.position,
            workDuration: profile.work_duration,
            location: profile.placement_location,
            portfolio: profile.portfolio_link,
            grade: profile.grade,
            religion: profile.agama,
            tanggal_lahir: profile.tanggal_lahir,
            tempat_lahir: profile.tempat_lahir,
          });
          console.log("DEBUG PROFILE", profile); // untuk cek isi yang diterima

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

  const handleDeleteData = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      console.log("Delete employee data");
    }
  };

/*  if (loading) {
    return <LoadingSpinner />;
  } */

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen flex">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <ProfileHeader employee={employee} />

        {/* Profile Title */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Profil Karyawan
              </h1>
              <p className="text-slate-600 flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>
                  ID: {employee?.user_id} • {employee?.position}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Photo & Basic Info */}
          <div className="lg:col-span-1">
            <ProfilePhoto 
            employee={employee}
            />
          </div>

          {/* Middle Column - Personal & Work Information */}
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfo employee={employee} />
            <AdditionalInfo employee={employee} />
            <WorkHistoryAndSkills 
              workHistory={workHistory}
              skills={skills}
            />
            <Certifications certifications={certifications} />
          </div>

          {/* Right Column - Work Data & Actions */}
          <div className="lg:col-span-1 space-y-8">
            <WorkData employee={employee} />
            <PortfolioLink employee={employee} />
            <ActionButtons handleDeleteData={handleDeleteData} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeProfile;