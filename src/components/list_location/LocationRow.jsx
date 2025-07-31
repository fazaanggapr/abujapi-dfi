// components/LocationRow.js
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function LocationRow({ location, index }) {
  const handleEdit = () => {
    // Tambahkan logika edit di sini
    console.log(`Edit location ${location.id}`);
  };

  const handleDelete = () => {
    // Tambahkan logika delete di sini
    console.log(`Delete location ${location.id}`);
  };

  return (
    <tr className="border-b">
      <td className="px-6 py-4">{index + 1}</td>
      <td className="px-6 py-4">{location.name}</td>
      <td className="px-6 py-4">{location.code}</td>
      <td className="px-6 py-4 flex justify-center space-x-2">
        <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default LocationRow;
