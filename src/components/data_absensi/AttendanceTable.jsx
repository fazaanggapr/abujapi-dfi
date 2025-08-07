import React from "react";
import {
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaClock,
  FaUserCircle,
} from "react-icons/fa";

const AttendanceTable = ({ employees }) => {
  // Fungsi untuk mendapatkan status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      Hadir: {
        color: "bg-green-100 text-green-700 border-green-200", // Hijau
        icon: <FaCheckCircle className="text-xs" />,
      },
      "Tidak Hadir": {
        color: "bg-red-100 text-red-700 border-red-200", // Merah
        icon: <FaTimesCircle className="text-xs" />,
      },
      Terlambat: {
        color: "bg-yellow-100 text-yellow-700 border-yellow-200", // Kuning
        icon: <FaClock className="text-xs" />,
      },
    };

    const config = statusConfig[status] || statusConfig["Tidak Hadir"];

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${config.color}`}
      >
        {config.icon}
        {status}
      </span>
    );
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const [date, time] = dateString.split(" ");
    return { date, time };
  };

  return (
    <div className="overflow-x-auto">
      {/* DESKTOP VERSION - Table Layout */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
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
          <tbody className="divide-y divide-gray-100">
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={employee.id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          employee.profile_photo_url
                            ? `${employee.profile_photo_url}?t=${new Date().getTime()}`
                            : "profile-photo-default.png"
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{employee.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-700 font-medium">
                      {employee.attendance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-500 text-sm">
                      {employee.attended_at}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Tidak ada data absensi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE VERSION - Card List Layout */}
      <div className="block md:hidden">
        {employees.length > 0 ? (
          <div className="space-y-3">
            {employees.map((employee, index) => {
              const { date, time } = formatDate(employee.attended_at);
              return (
                <div
                  key={employee.id || index}
                  className="bg-white shadow-sm overflow-hidden mb-4 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {employee.profile_photo_url ? (
                        <img
                          src={`${employee.profile_photo_url}?t=${new Date().getTime()}`}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUserCircle className="text-gray-400 text-lg" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {employee.name}
                        </h3>
                        <p className="text-xs text-gray-500">Karyawan</p>
                      </div>
                    </div>
                    <div>{getStatusBadge(employee.attendance)}</div>
                  </div>

                  <div className="pt-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Tanggal:</span>
                      <span>{date || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span>Waktu:</span>
                      <span>{time || "-"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data karyawan</h3>
            <p className="text-gray-500">Belum ada karyawan yang terdaftar dalam sistem.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTable;
