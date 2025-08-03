import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/laporan/PageHeader";
import Calendar from "../components/laporan/Calendar";
import ReportTable from "../components/laporan/ReportTable";
import ControlSection from "../components/laporan/ControlSection";
import Pagination from "../components/laporan/Pagination";

const ReportTables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reports, setReports] = useState([]); // Mengubah 'employees' menjadi 'reports'
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const apiBase = import.meta.env.VITE_API_URL;

        const response = await fetch(`${apiBase}/admin/reports`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data laporan");
        }

        const data = await response.json();
        console.log("DATA LAPORAN:", data);
        setReports(data.data); // Menyimpan data laporan ke state 'reports'
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleDeleteReport = (id) => {
  setReports((prevReports) => prevReports.filter((r) => r.id !== id));
};


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
  
  // FILTER berdasarkan nama & tanggal
  const filteredReports = reports.filter((report) => {
    const name = report?.user?.name ?? ""; // Nama user di laporan
    const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());

    const reportDate = new Date(report.reported_at);
    const selectedDateOnly = new Date(selectedDate);

    reportDate.setHours(0, 0, 0, 0);
    selectedDateOnly.setHours(0, 0, 0, 0);

    const dateMatch = reportDate.getTime() === selectedDateOnly.getTime();

    return nameMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = filteredReports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 overflow-auto px-6 py-4">
          <PageHeader
            selectedDate={selectedDate}
            onToggleSidebar={toggleSidebar}
          />
          <div className="p-4 lg:p-6">
            <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
            <div className="p-6">
              <ControlSection
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <ReportTable
                  reports={currentReports} // Menggunakan 'currentReports' yang sudah difilter
                  getInitials={getInitials}
                   onDelete={handleDeleteReport}
                />
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                filteredReports={filteredReports} // Menggunakan 'filteredReports'
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTables;
