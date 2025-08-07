import React from 'react';
import TableHeader from './TableHeader'; // Impor komponen TableHeader
import LocationRow from './LocationRow'; // Impor komponen LocationRow

function LocationTable({ employees }) {
  return (
    <>
      {/* DESKTOP VERSION - Table Layout */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full table-auto table-layout-fixed">
          <TableHeader />
          <tbody className="divide-y divide-gray-100">
            {employees.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-8">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>Tidak ada lokasi ditemukan.</p>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((location, index) => (
                <LocationRow key={location.id} location={location} index={index} onDeleteSuccess={employees.onDeleteSuccess} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE VERSION - Card List Layout */}
      <div className="block md:hidden">
        {employees.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada lokasi ditemukan</h3>
            <p className="text-gray-500">Belum ada lokasi yang terdaftar dalam sistem.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {employees.map((location, index) => (
              <LocationRow key={location.id} location={location} index={index} onDeleteSuccess={employees.onDeleteSuccess} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LocationTable;