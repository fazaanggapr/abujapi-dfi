import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/list_location/PageHeader";
import EmployeeTable from "../components/list_location/EmployeeTable";
import ControlSection from "../components/list_location/ControlSection";
import Pagination from "../components/list_location/Pagination";

function ListLocation() {
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
  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 overflow-auto px-6 py-4">
          <PageHeader
            onToggleSidebar={toggleSidebar}
          />
          <div className="p-4 lg:p-6">
            <div className="p-6">
              <ControlSection
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <EmployeeTable employees={filteredEmployees} />
              </div>
              <Pagination
                currentPage={1}
                totalPages={1}
                totalItems={employees.length}
                displayedItems={filteredEmployees.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default ListLocation;


