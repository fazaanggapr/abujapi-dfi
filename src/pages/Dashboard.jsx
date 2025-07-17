import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from "../components/dashboard/Header";
import StatsGrid from "../components/dashboard/StatsGrid";
import MainContent from "../components/dashboard/MainContent"

const SecurityDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

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