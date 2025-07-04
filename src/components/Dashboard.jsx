import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'font-awesome/css/font-awesome.min.css';

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Pindah ke dalam komponen

  const [currentPage, setCurrentPage] = useState(1);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const itemsPerPage = 3;

  const employees = [
    { id: '019', name: 'Inukai Atsuhiro', status: 'HADIR', statusClass: 'bg-green-100 text-green-800 border-green-200' },
    { id: '022', name: 'Yamada Akiko', status: 'IZIN', statusClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: '020', name: 'Sato Yuki', status: 'TIDAK HADIR', statusClass: 'bg-red-100 text-red-800 border-red-200' },
    { id: '022', name: 'Akiko Takeshi', status: 'IZIN', statusClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: '023', name: 'Yuki Kato', status: 'TIDAK HADIR', statusClass: 'bg-red-100 text-red-800 border-red-200' },
    { id: '021', name: 'Atsuhiro Yamada', status: 'HADIR', statusClass: 'bg-green-100 text-green-800 border-green-200' },
    { id: '024', name: 'Inukai Kamshimida', status: 'HADIR', statusClass: 'bg-green-100 text-green-800 border-green-200' },
    { id: '025', name: 'Yamada Honda', status: 'IZIN', statusClass: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: '026', name: 'Sato Suzuki', status: 'TIDAK HADIR', statusClass: 'bg-red-100 text-red-800 border-red-200' },
  ];

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const today = new Date(2025, 5, 18); // Juni 18, 2025

  useEffect(() => {
    setCurrentWeekStart(getWeekStart(today));
  }, []);

  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const formatDate = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
      isToday: date.toDateString() === today.toDateString()
    };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'HADIR':
        return 'fa-check-circle';
      case 'TIDAK HADIR':
        return 'fa-times-circle';
      case 'IZIN':
        return 'fa-exclamation-circle';
      default:
        return 'fa-question-circle';
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate();
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const navigateWeek = (direction) => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    setCurrentWeekStart(newWeekStart);
  };

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const previousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const renderCalendar = () => {
    return [...Array(7)].map((_, i) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      const dateInfo = formatDate(date);
      const circleColor = dateInfo.isToday ? 'bg-orange-500' : 'bg-blue-600';
      return (
        <div key={i} className="text-center cursor-pointer hover:scale-105 transition-transform">
          <div className={`w-14 h-14 ${circleColor} text-white rounded-full flex items-center justify-center font-bold mb-2 shadow-lg`}>
            {dateInfo.date}
          </div>
          <span className="text-xs text-gray-600 font-medium">{dateInfo.day}</span>
        </div>
      );
    });
  };

  const renderTable = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEmployees = employees.slice(startIndex, endIndex);

    const rows = currentEmployees.map((employee, index) => (
      <tr key={employee.id + index} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-5">
          <div className="font-semibold text-gray-900">{employee.name}</div>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <i className="fas fa-id-badge mr-1"></i>{employee.id}
          </div>
        </td>
        <td className="px-6 py-5 text-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${employee.statusClass} border`}>
            <i className={`fas ${getStatusIcon(employee.status)} mr-1`}></i>{employee.status}
          </span>
        </td>
        <td className="px-6 py-5 text-center">
          <button
            onClick={() => navigate('/laporan.html')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-md flex items-center mx-auto"
          >
            <i className="fas fa-eye mr-1"></i>LIHAT LAPORAN
          </button>
        </td>
      </tr>
    ));

    return rows;
  };

  const renderPagination = () => {
    return [...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`px-3 py-2 rounded-lg text-sm font-medium ${
          i + 1 === currentPage
            ? 'bg-blue-500 text-white'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        {i + 1}
      </button>
    ));
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, employees.length);
  const monthInfo = formatDate(currentWeekStart);

  return (
    <div className="bg-gray-50 font-sans h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
         <Sidebar />
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Hi, Bapak Aditama</h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center">
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>{monthInfo.month} {monthInfo.year}</span> &gt;
            </p>
          </div>

          {/* Calendar Week View */}
          <div className="p-6">
            <div className="flex items-center justify-center mb-8">
              <button onClick={() => navigateWeek(-1)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <i className="fas fa-chevron-left text-gray-500 text-lg"></i>
              </button>

              <div className="flex space-x-4 mx-8">{renderCalendar()}</div>

              <button onClick={() => navigateWeek(1)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <i className="fas fa-chevron-right text-gray-500 text-lg"></i>
              </button>
            </div>

            {/* Search and QR Code */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Mencari..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded">
                  <i className="fas fa-search text-gray-400"></i>
                </button>
              </div>
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md flex items-center"
              >
                <i className="fas fa-qrcode mr-2"></i>GENERATE CODE QR
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      <i className="fas fa-user mr-2"></i>Nama
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      <i className="fas fa-clock mr-2"></i>Absensi
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      <i className="fas fa-file-alt mr-2"></i>Hasil laporan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {renderTable()}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Menampilkan {startIndex}-{endIndex} dari {employees.length} data
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={previousPage} disabled={currentPage === 1} className="bg-white border border-gray-300 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="flex space-x-1">{renderPagination()}</div>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-white border border-gray-300 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl relative max-w-sm w-11/12 mx-5 text-center">
            <button onClick={() => setIsQRModalOpen(false)} className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white border-none w-8 h-8 rounded-full flex items-center justify-center text-base transition-all duration-200 shadow-md hover:scale-105">
              <i className="fas fa-times"></i>
            </button>
            <div className="my-5 p-5 bg-gray-50 rounded-xl inline-block">
              <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto">
                <div className="w-40 h-40 bg-contain bg-center bg-no-repeat" style={{
                  backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com')`
                }}></div>
              </div>
            </div>
            <div className="mt-6 text-gray-700 text-sm font-medium">
              Tanggal : {getCurrentDate()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
