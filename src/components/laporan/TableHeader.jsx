// components/TableHeader.js
import React from 'react';
import { FaUser, FaRegFileAlt, FaCog, FaIdBadge } from 'react-icons/fa';

function TableHeader() {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaRegFileAlt className="mr-2 inline" /> Lihat Laporan
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/4">
          <FaCog className="mr-2 inline" /> Aksi
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;