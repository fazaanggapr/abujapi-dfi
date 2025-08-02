import React from 'react';

function TableHeader() {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-cyan-200 to-blue-200 text-sm font-semibold text-gray-700">
        <th className="px-6 py-4  w-2/6">Deskripsi</th>
        <th className="px-6 py-4  w-1/6">Lokasi</th>
        <th className="px-6 py-4  w-1/6">Tanggal</th>
        <th className="px-6 py-4 w-1/6">Pengirim</th>
        <th className="px-6 py-4 w-1/6">Aksi</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
