// components/EmployeeRow.js
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function EmployeeRow({ employee }) {
  const handleEdit = () => {
    // Tambahkan logika edit di sini
    console.log(`Edit employee ${employee.id}`);
  };

  const handleDelete = () => {
    // Tambahkan logika delete di sini
    console.log(`Delete employee ${employee.id}`);
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
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeRow;
