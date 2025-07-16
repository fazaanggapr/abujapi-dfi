// components/EmptyState.js
import React from 'react';

function EmptyState() {
  return (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">
        Tidak ada karyawan ditemukan.
      </td>
    </tr>
  );
}

export default EmptyState;