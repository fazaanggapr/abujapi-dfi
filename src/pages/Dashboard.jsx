import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import LoadingAnimation from "../components/dashboard/LoadingAnimation";
import Header from "../components/dashboard/Header";
import StatsGrid from "../components/dashboard/StatsGrid";
import MainContent from "../components/dashboard/MainContent";

const SecurityDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Define loading state
  
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Example of simulating data loading
  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, []);

  if (loading) return <LoadingAnimation />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <Header onMenuClick={toggleSidebar} />
        <StatsGrid />
        <MainContent />
      </div>
    </div>
  );
};

export default SecurityDashboard;
