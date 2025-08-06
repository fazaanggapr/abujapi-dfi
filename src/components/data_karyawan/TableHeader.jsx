// components/TableHeader.js
import React from 'react';
import { FaUser, FaRegFileAlt, FaFileAlt, FaList  } from 'react-icons/fa';
import { UserCog } from "lucide-react";


function TableHeader() {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/3">
          <FaUser className="mr-2 inline" /> Nama Karyawan
        </th>
        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-1/3">
          <UserCog className="mr-2 inline" /> Role
        </th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-1/3">
          <FaFileAlt className="mr-2 inline" /> Aksi
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;