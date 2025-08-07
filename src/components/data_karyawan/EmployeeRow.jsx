// components/EmployeeRow.js
import React from "react";
import { FaIdBadge, FaEye, FaEdit, FaTrashAlt, FaInfoCircle, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../utils/api";

function EmployeeRow({ employee, index, onDeleteSuccess }) {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke halaman profil
  const handleViewProfile = () => {
    navigate(`/lihat-profil/${employee.id}`, {
      state: { employee }, // Pass the employee data if needed
    });
  };

  const handleDelete = async (id) => {
    // Debug log to check if ID exists
    console.log("Employee object:", employee);
    console.log("Employee ID:", id);
    
    // Validate ID first
    if (!id) {
      toast.error("ID karyawan tidak valid!");
      return;
    }

    const confirmDelete = window.confirm("Yakin ingin menghapus karyawan?");
    if (!confirmDelete) {
      toast.info("Penghapusan karyawan dibatalkan.");
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading("Menghapus karyawan...");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.dismiss(loadingToastId);
        toast.error("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      console.log(`Making DELETE request to: ${baseUrl}/profile/${id}`);

      const response = await fetch(`${baseUrl}/profile/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP Error: ${response.status}`;
        throw new Error(errorMessage);
      }

      // Success toast
      toast.success("Karyawan berhasil dihapus!");

      // Call parent callback if provided
      if (onDeleteSuccess) {
        onDeleteSuccess(id);
      }

      // Refresh page after a short delay to show success message
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      // Dismiss loading toast if still showing
      toast.dismiss(loadingToastId);
      
      console.error("Error saat menghapus:", error);
      
      // Show specific error message
      if (error.message.includes("405")) {
        toast.error("Metode tidak diizinkan. Periksa endpoint API.");
      } else if (error.message.includes("404")) {
        toast.error("Karyawan tidak ditemukan.");
      } else if (error.message.includes("401")) {
        toast.error("Tidak memiliki akses. Silakan login kembali.");
      } else {
        toast.error(`Gagal menghapus karyawan: ${error.message}`);
      }
    }
  };

  // Format tanggal untuk tampilan
  const formatDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('id-ID');
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  return (
    <>
      {/* DESKTOP VERSION - Hidden on mobile (md and up) */}
      <tr className="hidden md:table-row hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="ml-3">
              <div className="font-semibold text-gray-900">{employee.name}</div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="ml-3">
              <div className="font-semibold text-gray-900">{employee.role}</div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 text-center flex justify-center gap-2">
          <button
            onClick={handleViewProfile}
            className="text-teal-500 hover:text-teal-700 flex items-center"
          >
            <FaEye className="mr-1" />
          </button>

          <button
            onClick={() => handleDelete(employee.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>

      {/* MOBILE VERSION - Visible only on mobile (below md) */}
      <div className="block md:hidden bg-white rounded-lg shadow-sm border border-gray-200 mb-3 p-4 relative">
        {/* Status Badge - Tidak Langkap */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {employee.role || 'Role'}
          </span>
        </div>

        {/* Employee Name */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {employee.name || 'Nama Karyawan'}
          </h3>
        </div>


        {/* Action Buttons */}
        <div className="flex items-center justify-start gap-4 pt-3 border-t border-gray-100">
          <button
            onClick={handleViewProfile}
            className="flex items-center gap-1 text-teal-500 hover:text-teal-700 text-sm font-medium transition-colors"
          >
            <FaEye className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleDelete(employee.id)}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeRow;