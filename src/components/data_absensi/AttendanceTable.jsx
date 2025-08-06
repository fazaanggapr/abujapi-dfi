// components/AttendanceTable.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUserShield, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaEye } from "react-icons/fa";

const AttendanceTable = ({ employees }) => {
  const renderTable = () => {
    console.log(employees);

    if (employees.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-500">
            Tidak ada data absensi pada tanggal ini.
          </td>
        </tr>
      );
    }

    return employees.map((emp) => (
      <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src={
                    emp.profile_photo_url
                      ? `${emp.profile_photo_url}?t=${new Date().getTime()}`
                      : "profile-photo-default.png"
                  }

              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900">{emp.name}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <span className="text-gray-700 font-medium">
            {emp.attendance}
          </span>
        </td>
        <td className="px-6 py-4 text-center">
          <span className="text-gray-500 text-sm">{emp.attended_at}</span>
        </td>

      </tr>
    ));
  };

  return (
<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/5">
          <FaUser className="mr-2 inline" />
          Nama
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/5">
          <FaCheckCircle className="mr-2 inline" />
          Absensi
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/5">
          <FaCalendarAlt className="mr-2 inline" />
          Tanggal dan Waktu Absensi
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">{renderTable()}</tbody>
  </table>
</div>

  );
};

export default AttendanceTable;