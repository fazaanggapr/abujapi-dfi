// components/TableHeader.js
import React from 'react';
import { FaUser, FaRegFileAlt, FaFileAlt, FaIdBadge } from 'react-icons/fa';

function TableHeader() {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/4">
          <FaUser className="mr-2 inline" /> Nama
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaIdBadge className="mr-2 inline" /> Peran
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaFileAlt className="mr-2 inline" /> Profil Lengkap
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaRegFileAlt className="mr-2 inline" /> Lihat Laporan
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;