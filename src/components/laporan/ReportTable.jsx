import React from 'react';
import TableHeader from './TableHeader';
import ReportRow from './ReportRow';

function ReportTable({ reports }) {
  // Pastikan reports adalah array dan sudah terdefinisi
  if (!Array.isArray(reports)) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full">
          <TableHeader />
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td colSpan="100%" className="text-center text-gray-500 py-4">
                Invalid data
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <table className="w-full">
        <TableHeader />
        <tbody className="divide-y divide-gray-100">
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <ReportRow key={index} report={report} />
            ))
          ) : (
            <tr>
              <td colSpan="100%" className="text-center text-gray-500 py-4">
                No reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
