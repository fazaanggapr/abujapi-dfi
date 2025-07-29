// components/TableHeader.js
import React from 'react';
import { FaUser, FaRegFileAlt, FaFileAlt, FaMapPin, FaCog } from 'react-icons/fa';

function TableHeader() {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
          <FaUser className="mr-2 inline" /> Nama
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaMapPin className="mr-2 inline" /> Lokasi
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaCog className="mr-2 inline" /> Aksi
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;