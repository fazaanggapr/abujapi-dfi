// components/LocationTable.js
import React from 'react';
import TableHeader from './TableHeader'; // Impor komponen TableHeader
import LocationRow from './LocationRow'; // Impor komponen LocationRow

function LocationTable({ employees }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <table className="w-full table-auto table-layout-fixed">
        <TableHeader />
        <tbody className="divide-y divide-gray-100">
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4">
                Tidak ada lokasi ditemukan.
              </td>
            </tr>
          ) : (
            employees.map((location, index) => (
              <LocationRow key={location.id} location={location} index={index} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LocationTable;
