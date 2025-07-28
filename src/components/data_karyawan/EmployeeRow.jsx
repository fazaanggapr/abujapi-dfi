// components/EmployeeRow.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaIdBadge, FaEye } from 'react-icons/fa';

function EmployeeRow({ employee }) {
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return nameParts[0][0];
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-5">
        <div className="flex items-center">
          
          <div>
            <div className="font-semibold text-gray-900">
              {employee.name}
            </div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <FaIdBadge className="mr-1" /> NIK: {employee.nik}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-center">
        <span className="text-gray-700 font-medium">
          {employee.role}
        </span>
      </td>

      <td className="px-6 py-5 text-center">
        <div className="flex justify-center">
          <Link
            to="/lihat-profil-karyawan"
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
  );
}

export default EmployeeRow;