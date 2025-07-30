import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

function LocationRow({ location }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-5 text-sm font-semibold text-gray-800">{location.name}</td>
      <td className="px-6 py-5 text-sm text-gray-700 text-center">{location.code}</td>
      <td className="px-6 py-5 text-sm text-gray-500 text-center">
        {new Date(location.created_at).toLocaleDateString("id-ID")}
      </td>
      <td className="px-6 py-5 text-center">
        <div className="flex justify-center gap-2">
          <Link
            to={`/edit-location/${location.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
          >
            <FaPen className="mr-1" />
          </Link>
          <button
            onClick={() => {/* Handle delete action here */}}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
          >
            <FaTrashAlt className="mr-1" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default LocationRow;
