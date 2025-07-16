// components/MobileCards.js
import React from "react";
import { FaUser, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import AttendanceStatus from "./AttendanceStatus";

const MobileCards = ({ employees, getInitials }) => {
  return (
    <div className="lg:hidden">
      <div className="bg-gradient-to-r from-cyan-200 to-blue-200 px-4 py-3">
        <h3 className="font-semibold text-gray-700">Data Karyawan</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {employees.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            <FaUser className="text-4xl mb-2 text-gray-300 mx-auto" />
            <p>Tidak ada data karyawan yang ditemukan</p>
          </div>
        ) : (
          employees.map((employee) => (
            <div key={employee.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(employee.name)}
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
                      <AttendanceStatus status={employee.attendance} />
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
  );
};

export default MobileCards;