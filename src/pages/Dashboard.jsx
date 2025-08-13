import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import LoadingAnimation from "../components/dashboard/LoadingAnimation";
import Header from "../components/dashboard/Header";
import StatsGrid from "../components/dashboard/StatsGrid";
import MainContent from "../components/dashboard/MainContent";
import baseUrl from '../utils/api';

const SecurityDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Ambil profile user
  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Token tidak ditemukan di localStorage.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (response.ok && data?.data?.profile) {
          const userData = data.data;
          const profileData = userData.profile;

          let workHistory = [];
          if (typeof profileData.work_experience === "string" && profileData.work_experience.trim() !== "") {
            const companyName = profileData.work_experience.split(" (")[0];
            const workPeriod = profileData.work_experience.match(/\((.*)\)/)?.[1] || "";
            workHistory.push({
              company: companyName,
              position: profileData.position || "",
              period: workPeriod,
            });
          }

          let skillsList = [];
          try {
            if (Array.isArray(profileData.skills)) {
              skillsList = profileData.skills;
            } else if (typeof profileData.skills === "string") {
              skillsList = JSON.parse(profileData.skills || "[]");
            }
          } catch (e) {
            console.error("Gagal parsing skills:", e);
          }

          setEmployeeProfile({
            profilePhotoUrl: profileData.profile_photo_url,
            userId: profileData.user_id,
            name: userData.name,
            email: userData.email,
            nik: profileData.nik,
            phoneNumber: profileData.phone_number,
            employeeStatus: profileData.employee_status,
            address: profileData.address,
            gender: profileData.gender,
            age: `${profileData.age} tahun`,
            height: `${profileData.height} cm`,
            weight: `${profileData.weight} kg`,
            education: profileData.education,
            bankAccount: profileData.bank_account,
            position: profileData.position,
            workDuration: profileData.work_duration,
            location: profileData.placement_location,
            portfolio: profileData.portfolio_link,
            grade: profileData.grade,
            religion: profileData.agama,
            birthDate: profileData.tanggal_lahir,
            birthPlace: profileData.tempat_lahir,
            workHistory,
            skills: skillsList,
          });
        } else {
          console.error("Gagal mengambil data karyawan:", data);
        }
      } catch (error) {
        console.error("Error fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeProfile();
  }, []);

  // Ambil statistik dashboard
  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch(`${baseUrl}/dashboard-stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setDashboardStats(data);
        } else {
          console.error("Gagal ambil dashboard stats:", data);
        }
      } catch (error) {
        console.error("Error ambil dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <Header onMenuClick={toggleSidebar} profile={employeeProfile} />
        <StatsGrid profile={employeeProfile} stats={dashboardStats} />
        <MainContent />
      </div>
    </div>
  );
};

export default SecurityDashboard;
