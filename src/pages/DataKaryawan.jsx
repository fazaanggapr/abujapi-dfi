// DataKaryawan.js
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LoadingAnimation from "../components/data_karyawan/LoadingAnimation";
import HeaderSection from "../components/data_karyawan/HeaderSection";
import ControlSection from "../components/data_karyawan/ControlSection";
import EmployeeTable from "../components/data_karyawan/EmployeeTable";
import Pagination from "../components/data_karyawan/Pagination";

function DataKaryawan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(`${baseUrl}/admin/dashboard`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (response.ok && result.data) {
          setEmployees(result.data);
        } else {
          console.error("Failed to fetch dashboard:", result);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [baseUrl]);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingAnimation />;

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <HeaderSection 
        toggleSidebar={toggleSidebar} 
        onToggleSidebar={toggleSidebar}
        />
        

        {/* Content */}
        <div className="p-6">
          <ControlSection 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />

          <EmployeeTable employees={filteredEmployees} />

          <Pagination 
            currentPage={1}
            totalPages={1}
            totalItems={employees.length}
            displayedItems={filteredEmployees.length}
          />
        </div>
      </div>
    </div>
  );
}

export default DataKaryawan;