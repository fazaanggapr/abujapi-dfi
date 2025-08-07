import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/api"; // Pastikan path ini sesuai dengan struktur proyekmu
import { toast } from "react-toastify";

function LocationRow({ location, index, onDeleteSuccess }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigasi ke halaman edit dengan path '/edit-lokasi/:id'
    navigate(`/edit-lokasi`); // Ganti URL menuju halaman edit
  };

  const handleDelete = async () => {
    if (!window.confirm(`Yakin ingin menghapus lokasi "${location.name}"?`))
      return;

    try {
      const token = localStorage.getItem("access_token");
      console.log("Token diambil dari localStorage:", token);
      const response = await fetch(`${baseUrl}/location/${location.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus lokasi");
      }

      if (onDeleteSuccess) onDeleteSuccess(location.id);
      toast.success("Laporan berhasil dihapus");

    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus laporan");
    }
  };

  return (
    <>
      {/* DESKTOP VERSION - Hidden on mobile (md and up) */}
      <tr className="hidden md:table-row border-b hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4">{location.name}</td>
        <td className="px-6 py-4">{location.code}</td>
        <td className="px-6 py-4 flex justify-center space-x-2">
          <button
            onClick={handleEdit}
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

      {/* MOBILE VERSION - Visible only on mobile (below md) */}
      <div className="block md:hidden bg-white rounded-lg shadow-sm border border-gray-200 mb-3 p-4">
        {/* Location Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {location.name}
          </h3>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Kode:</span>
            <span className="ml-2">{location.code}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-start gap-4 pt-3 border-t border-gray-100">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            <FaEdit className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

export default LocationRow;