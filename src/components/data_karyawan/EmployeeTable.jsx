// components/EmployeeTable.js
import React from 'react';
import TableHeader from './TableHeader';
import EmployeeRow from './EmployeeRow';
import EmptyState from './EmptyState';

function EmployeeTable({ employees }) {
  return (
    <>
      {/* DESKTOP VERSION - Table Layout */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full">
          <TableHeader />
          <tbody className="divide-y divide-gray-100">
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <EmployeeRow key={employee.id || index} employee={employee} index={index} />
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE VERSION - Card List Layout */}
      <div className="block md:hidden">
        {employees.length > 0 ? (
          <div className="space-y-3">
            {employees.map((employee, index) => (
              <EmployeeRow key={employee.id || index} employee={employee} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data karyawan</h3>
            <p className="text-gray-500">Belum ada karyawan yang terdaftar dalam sistem.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default EmployeeTable;