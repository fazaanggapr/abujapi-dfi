// ResponsiveAttendanceTable.js
import React, { useState, useEffect } from "react";
import LoadingAnimation from "../components/data_absensi/LoadingAnimation";
import Sidebar from "../components/Sidebar";
import QRModal from "../components/data_absensi/QRModal";
import AttendanceTable from "../components/data_absensi/AttendanceTable";
import MobileCards from "../components/data_absensi/MobileCards";
import Pagination from "../components/data_absensi/Pagination";
import Calendar from "../components/data_absensi/Calendar";
import SearchBar from "../components/data_absensi/SearchBar";
import PageHeader from "../components/data_absensi/PageHeader";
import baseUrl from "../utils/api";

const AttendanceDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
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

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${baseUrl}/admin/attendance`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok && result.data) {
          const transformed = result.data.map((item) => {
            return {
              id: item.id,
              name: item.user.name,
              email: item.user.email,
              role: item.user.role,
              attendance: item.kehadiran.toLowerCase(),
              report: "Belum Dicek",
              avatar: getInitials(item.user.name),
              attended_at: item.attended_at,
              profile_photo_url: item.user.profile?.profile_photo_url || null, // <-- tambahkan ini
            };
          });


          console.log("Transformed data:", transformed);

          const sorted = transformed.sort(
            (a, b) => new Date(b.attended_at) - new Date(a.attended_at)
          );
          setEmployees(sorted);
        } else {
          console.error("Gagal ambil data:", result);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // Filter employees by name and selected date
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

  if (loading) return <LoadingAnimation />;

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 overflow-auto px-6 py-4">
          {/* Header */}
          <PageHeader 
            selectedDate={selectedDate}
            onToggleSidebar={toggleSidebar}
          />

          {/* Main Content */}
          <div className="p-4 lg:p-6">
            {/* Calendar Navigation */}
            <Calendar 
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />

            {/* Search and QR Button */}
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onQRClick={() => setIsQRModalOpen(true)}
            />

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <AttendanceTable 
                employees={currentEmployees}
                getInitials={getInitials}
              />

              {/* Mobile Cards */}
              <MobileCards 
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
      
      {/* QR Modal */}
      <QRModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
      />
    </div>
  );
};

export default AttendanceDataTable;