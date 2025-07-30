import React from "react";

const LocationTable = ({ employees }) => {
  return (
    <table className="min-w-full table-auto text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">#</th>
          <th className="px-4 py-2 text-left">Nama Lokasi</th>
          <th className="px-4 py-2 text-left">Kode Lokasi</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center py-4">
              Tidak ada lokasi ditemukan.
            </td>
          </tr>
        ) : (
          employees.map((location, index) => (
            <tr key={location.id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{location.name}</td>
              <td className="px-4 py-2">{location.code}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default LocationTable;
