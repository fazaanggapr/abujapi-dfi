// components/AttendanceTable.js
import React from "react";
import { FaUser, FaClock, FaCalendarAlt } from "react-icons/fa";
import baseUrl from "../../utils/api"; 

const AttendanceTable = ({ employees, getInitials }) => {
  const renderTable = () => {
    if (employees.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="text-center py-6 text-gray-500">
            Tidak ada data absensi pada tanggal ini.
          </td>
        </tr>
      );
    }

    return employees.map((emp) => (
      <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-5">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
              {getInitials(emp.name)}
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

  return (
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
  );
};

export default AttendanceTable;