// components/EmployeeTable.js
import React from 'react';
import TableHeader from './TableHeader';
import EmployeeRow from './EmployeeRow';

function EmployeeTable({ employees }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <table className="w-full">
        <TableHeader />
        <tbody className="divide-y divide-gray-100">
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <EmployeeRow key={index} employee={employee} />
            ))
          ) : (
            <tr>
              <td colSpan="100%" className="text-center text-gray-500 py-4">
                No employees available
              </td>
            </tr>  
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
