// components/EmployeeRow.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaIdBadge, FaPen, FaTrashAlt } from 'react-icons/fa';

function EmployeeRow({ employee }) {
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return nameParts[0][0] + nameParts[1][0];
    }
    return nameParts[0][0];
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-5">
        <div className="flex items-center">
          <div>
            <div className="font-semibold text-gray-900">
              {employee.name}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-center">
        <span className="text-gray-700 font-medium">
          {employee.role}
        </span>
      </td>
      
      <td className="px-6 py-5 text-center">
        <div className="flex justify-center gap-3">
          <Link
            to={`/edit-employee/${employee.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
          >
            <FaPen className="mr-1" />
          </Link>
          <button
            onClick={() => {/* Handle delete action */}}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
          >
            <FaTrashAlt className="mr-1" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeRow;
