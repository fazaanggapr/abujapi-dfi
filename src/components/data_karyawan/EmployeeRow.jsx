// components/EmployeeRow.js
import React from "react";
import { FaIdBadge, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../../utils/api";

function EmployeeRow({ employee, index, onDeleteSuccess }) {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke halaman profil
  const handleViewProfile = () => {
    navigate(`/lihat-profil-karyawan`);
  };

  const handleEditProfile = () => {
    navigate(`/edit-profil-karyawan`); 
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

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="ml-3">
            <div className="font-semibold text-gray-900">{employee.name}</div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <FaIdBadge className="mr-1" /> NIK: {employee.nik}
            </div>
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
          onClick={handleEditProfile} 
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => handleDelete(employee.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default EmployeeRow;