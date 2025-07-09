import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCogs,
  FaIdBadge,
  FaEye,
  FaPlus,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Sidebar from "./Sidebar";

function DataKaryawan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch(
          "http://localhost:8000/api/admin/dashboard",
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
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return nameParts[0][0];
  };

  if (loading) return <p className="p-4">Loading...</p>; // Handle loading state

  if (!employees || employees.length === 0) {
    return <p className="p-4">Tidak ada data karyawan ditemukan.</p>;
  }
  return (
    <div className="bg-gray-50 font-sans min-h-screen flex">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white p-6 border-b border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800">DATA KARYAWAN</h1>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search and Add Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium hidden md:block">
                Sortir berdasarkan:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Cari karyawan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                <button
                  onClick={() => setSearchTerm(searchTerm)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
            <Link
              to="/tambah-profil"
              className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
            >
              <FaPlus className="mr-2" /> TAMBAH PROFIL
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
                    <FaUser className="mr-2 inline" /> Nama
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
                    <FaMapMarkerAlt className="mr-2 inline" /> Peran
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
                    <FaCogs className="mr-2 inline" /> Profil Lengkap
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
                    <FaCogs className="mr-2 inline" /> Lihat Laporan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          {/* Avatar / Inisial Nama */}
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {getInitials(emp.name)}
                          </div>
                          {/* Nama dan NIK */}
                          <div>
                            <div className="font-semibold text-gray-900">
                              {emp.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <FaIdBadge className="mr-1" /> NIK: {emp.nik}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span className="text-gray-700 font-medium">
                          {emp.role}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center">
                          <Link
                            to="/lihat-profil"
                            className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
                          >
                            <FaEye className="mr-1" /> LIHAT PROFIL
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center">
                          <Link
                            to="/lihat-laporan"
                            className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
                          >
                            <FaEye className="mr-1" /> LIHAT LAPORAN
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-6 text-gray-500">
                      Tidak ada karyawan ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between px-6 pb-4">
            <div className="text-sm text-gray-600">
              Menampilkan <span>1</span>-<span>{filteredEmployees.length}</span>{" "}
              dari <span>{employees.length}</span> data
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-white border border-gray-300 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50">
                <FaChevronLeft />
              </button>
              <button className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">
                1
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50">
                3
              </button>
              <button className="bg-white border border-gray-300 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50">
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataKaryawan;
