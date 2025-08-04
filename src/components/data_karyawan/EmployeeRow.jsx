// components/EmployeeRow.js
import React from "react";
import { FaIdBadge, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeRow({ employee, index, onDeleteSuccess }) {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk navigasi ke halaman profil
  const handleViewProfile = () => {
    navigate(`/lihat-profil-karyawan`); // Menggunakan ID karyawan
  };

  // Fungsi untuk navigasi ke halaman edit
  const handleEditProfile = () => {
    navigate(`/edit-profil-karyawan`); // Menggunakan ID karyawan
  };

  const handleDelete = async () => {
    // Menampilkan konfirmasi menggunakan toast
    const confirmDelete = await toast.promise(
      new Promise((resolve, reject) => {
        if (window.confirm(`Yakin ingin menghapus karyawan "${employee.name}"?`)) {
          resolve(true); // Jika pengguna memilih Ya
        } else {
          reject(false); // Jika pengguna memilih Tidak
        }
      }),
      {
        pending: "Menunggu konfirmasi...",
        success: "Karyawan berhasil dihapus!",
        error: "Penghapusan karyawan dibatalkan.",
      }
    );

    if (confirmDelete) {
      try {
        // Proses penghapusan karyawan
        if (onDeleteSuccess) onDeleteSuccess(employee.id);
      } catch (error) {
        console.error("Error saat menghapus:", error);
        toast.error("Terjadi kesalahan saat menghapus karyawan");
      }
    } else {
      toast.info("Penghapusan karyawan dibatalkan.");
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
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default EmployeeRow;
