import React from 'react';
import { FaFileAlt, FaMapPin, FaCalendarDay, FaUser, FaCog } from 'react-icons/fa';

function TableHeader() {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
          <FaFileAlt className="mr-2 inline" /> Deskripsi
        </th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
          <FaMapPin className="mr-2 inline" /> Lokasi
        </th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
          <FaCalendarDay className="mr-2 inline" /> Tanggal
        </th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
          <FaUser className="mr-2 inline" /> Pengirim
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaCog className="mr-2 inline" /> Aksi
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
