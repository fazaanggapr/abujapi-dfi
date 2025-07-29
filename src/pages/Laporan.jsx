import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/laporan/PageHeader";
import Calendar from "../components/laporan/Calendar";
import ActionButtons from "../components/laporan/ActionButtons";
import EmployeeTable from "../components/laporan/EmployeeTable";
import ControlSection from "../components/laporan/ControlSection";
import SearchBar from "../components/laporan/SearchBar";
import Pagination from "../components/laporan/Pagination";

const ReportTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const itemsPerPage = 3;

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const attendanceDate = new Date(employee.attended_at);
    const selectedDateOnly = new Date(selectedDate);

    attendanceDate.setHours(0, 0, 0, 0);
    selectedDateOnly.setHours(0, 0, 0, 0);

    const dateMatch = attendanceDate.getTime() === selectedDateOnly.getTime();

    return nameMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <PageHeader
            selectedDate={selectedDate}
            onToggleSidebar={toggleSidebar}
          />
          {/* Calendar Navigation */}
          <div className="p-4 lg:p-6">
            <Calendar
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />

            {/* Content */}
            <div className="p-6">
              <ControlSection
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              {/* Table */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <EmployeeTable
                  employees={currentEmployees}
                  getInitials={getInitials}
                />
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                filteredEmployees={filteredEmployees}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;
