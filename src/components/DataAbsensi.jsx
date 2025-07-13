import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaClock,
  FaFileAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaQrcode,
  FaBars,
  FaTimes,
  FaCheck,
  FaTimes as FaX,
  FaExclamationTriangle,
  FaEye,
  FaDownload,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";


const baseUrl = import.meta.env.VITE_API_URL;
  const QRModal = ({ isOpen, onClose }) => {
    const [token, setToken] = useState(null);
    const [expiresAt, setExpiresAt] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      if (!isOpen) return;

      const fetchQRToken = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem("access_token");

        try {
          const response = await fetch(`${baseUrl}/generate-attendance-token`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          });

          const result = await response.json();

          if (response.ok && result.token) {
            setToken(result.token);
            setExpiresAt(result.expires_at);
          } else {
            console.error("Gagal mengambil token QR:", result);
          }
        } catch (err) {
          console.error("Error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchQRToken();
    }, [isOpen]);
    

    const downloadQR = () => {
      const canvas = document.getElementById("qr-code");
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code.png";
      a.click();
    };

    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">QR Code Absensi</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>

          <div className="text-center">
            {loading ? (
              <p className="text-gray-500">Mengambil token QR...</p>
            ) : token ? (
              <>
                <div className="w-48 h-48 mx-auto mb-4">
                  <QRCode value={token} size={192} includeMargin={true} />
                  <canvas id="qr-code" style={{ display: 'none' }}></canvas>

                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Berlaku sampai: <strong>{expiresAt}</strong>
                </p>
                <button
                  onClick={downloadQR}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Download QR Code
                </button>
              </>
            ) : (
              <p className="text-red-500">Gagal memuat QR code.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

const AttendanceStatus = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "present":
        return {
          icon: FaCheck,
          color: "text-green-600",
          bg: "bg-green-50",
          text: "Hadir",
        };
      case "absent":
        return {
          icon: FaX,
          color: "text-red-600",
          bg: "bg-red-50",
          text: "Tidak Hadir",
        };
      case "late":
        return {
          icon: FaExclamationTriangle,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          text: "Terlambat",
        };
      default:
        return {
          icon: FaExclamationTriangle,
          color: "text-gray-600",
          bg: "bg-gray-50",
          text: "Tidak Ada Data",
        };
    }
  };


  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.bg}`}
    >
      <Icon className="mr-1 text-xs" />
      {config.text}
    </div>
  );
};

const ResponsiveAttendanceTable = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const itemsPerPage = 3;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : parts[0][0].toUpperCase();
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          `${baseUrl}/admin/attendance`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.data) {
          const transformed = result.data.map((item) => ({
            id: item.id,
            name: item.user.name,
            email: item.user.email,
            attendance: item.kehadiran.toLowerCase(), // sesuaikan ke 'present', 'absent', 'late'
            report: "Belum Dicek", // placeholder jika belum ada di API
            avatar: getInitials(item.user.name),
            attended_at: item.attended_at,
          }));
          setEmployees(transformed);
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

  const monthInfo = {
    month: selectedDate.toLocaleDateString("id-ID", { month: "long" }),
    year: selectedDate.getFullYear(),
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const getDaysOfWeek = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  const renderCalendar = () => {
    const days = getDaysOfWeek();
    const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

    return days.map((date, index) => {
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();

      return (
        <div
          key={index}
          onClick={() => setSelectedDate(date)}
          className={`
            flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 min-w-[60px]
            ${
              isSelected
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-gray-100"
            }
            ${isToday && !isSelected ? "bg-blue-50 text-blue-600" : ""}
          `}
        >
          <span className="text-xs font-medium mb-1">{dayNames[index]}</span>
          <span className="text-lg font-semibold">{date.getDate()}</span>
        </div>
      );
    });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`
            px-3 py-2 text-sm rounded-lg border transition-colors duration-200
            ${
              currentPage === i
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-500 border-gray-300 hover:bg-gray-50"
            }
          `}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const renderTable = () => {
    if (currentEmployees.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <FaUser className="text-4xl mb-2 text-gray-300" />
              <p>Tidak ada data karyawan yang ditemukan</p>
            </div>
          </td>
        </tr>
      );
    }

    return currentEmployees.map((emp) => (
      <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-5">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
              {emp.avatar}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{emp.name}</div>
              <div className="text-sm text-gray-500">{emp.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-5 text-center">
          <span className="text-gray-700 font-medium">{emp.attendance}</span>
        </td>
        <td className="px-6 py-5 text-center">
          <span className="text-gray-500 text-sm">{emp.attended_at}</span>
        </td>
      </tr>
    ));
  };
  
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-800"><button
    onClick={toggleSidebar}
    className="lg:hidden p-2 text-gray-800 bg-white rounded-md shadow"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
   DATA ABSENSI</h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>
                {monthInfo.month} {monthInfo.year}
              </span>{" "}
              &gt;
            </p>
          </div>

          {/* Calendar & Search */}
          <div className="p-4 lg:p-6">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-center mb-6 lg:mb-8">
              <button
                onClick={() => navigateWeek(-1)}
                className="p-2 lg:p-3 hover:bg-gray-100 rounded-full"
              >
                <FaChevronLeft className="text-gray-500 text-sm lg:text-lg" />
              </button>
              <div className="flex space-x-1 lg:space-x-4 mx-4 lg:mx-8 overflow-x-auto">
                {renderCalendar()}
              </div>
              <button
                onClick={() => navigateWeek(1)}
                className="p-2 lg:p-3 hover:bg-gray-100 rounded-full"
              >
                <FaChevronRight className="text-gray-500 text-sm lg:text-lg" />
              </button>
            </div>

            {/* Search and QR Button */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Mencari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaSearch className="text-gray-400" />
                </button>
              </div>
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
              >
                <FaQrcode className="mr-2" />
                <span className="hidden sm:inline">GENERATE CODE QR</span>
                <span className="sm:hidden">QR CODE</span>
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
                        <FaUser className="mr-2 inline" />
                        Nama
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
                        <FaClock className="mr-2 inline" />
                        Absensi
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
                        <FaCalendarAlt className="mr-2 inline" />
                        Tanggal dan Waktu Absensi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {renderTable()}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden">
                <div className="bg-gradient-to-r from-cyan-200 to-blue-200 px-4 py-3">
                  <h3 className="font-semibold text-gray-700">Data Karyawan</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {currentEmployees.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <FaUser className="text-4xl mb-2 text-gray-300 mx-auto" />
                      <p>Tidak ada data karyawan yang ditemukan</p>
                    </div>
                  ) : (
                    currentEmployees.map((employee) => (
                      <div key={employee.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {employee.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900 truncate">
                                {employee.name}
                              </h4>
                              <span className="text-sm text-gray-500">
                                ID: {employee.id.toString().padStart(3, "0")}
                              </span>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                  Absensi:
                                </span>
                                <AttendanceStatus
                                  status={employee.attendance}
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <Link
                                to="/lihat-laporan"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
                              >
                                <FaEye className="mr-1" /> LIHAT LAPORAN
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-sm text-gray-600 text-center lg:text-left">
                Menampilkan{" "}
                {filteredEmployees.length === 0 ? 0 : startIndex + 1}-
                {Math.min(endIndex, filteredEmployees.length)} dari{" "}
                {filteredEmployees.length} data
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <FaChevronLeft />
                </button>
                <div className="flex space-x-1 overflow-x-auto">
                  {renderPagination()}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QRModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />
    </div>
  );
};

export default ResponsiveAttendanceTable;
