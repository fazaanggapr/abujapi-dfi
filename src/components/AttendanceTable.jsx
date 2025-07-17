// src/components/AttendanceTable.jsx
import React, { useEffect, useState } from 'react';

import { baseUrl } from "../utils/api"; 
const AttendanceTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : parts[0][0].toUpperCase();
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem('access_token');

      try {
        const response = await fetch(`${baseUrl}/admin/attendances`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok && result.data) {
          const transformed = result.data.map((item) => ({
            id: item.id,
            name: item.user.name,
            email: item.user.email,
            attendance: item.kehadiran,
            attended_at: item.attended_at,
            avatar: getInitials(item.user.name),
          }));
          setEmployees(transformed);
        } else {
          console.error('Failed to fetch data', result);
        }
      } catch (err) {
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data Kehadiran</h2>
      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Avatar</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Kehadiran</th>
            <th className="px-4 py-2">Waktu Hadir</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {emp.avatar}
                </div>
              </td>
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.email}</td>
              <td className="px-4 py-2">{emp.attendance}</td>
              <td className="px-4 py-2">{emp.attended_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
