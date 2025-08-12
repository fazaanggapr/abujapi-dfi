import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/api"; // Pastikan path ini sesuai dengan struktur proyekmu
import { toast } from "react-toastify";
function LocationRow({ location, index, onDeleteSuccess, isMobile }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`Yakin ingin menghapus lokasi "${location.name}"?`))
      return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${baseUrl}/location/${location.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Gagal menghapus lokasi");

      if (onDeleteSuccess) onDeleteSuccess(location.id);
      toast.success("Laporan berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus laporan");
    }
  };

  if (isMobile) {
    // MOBILE CARD
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {location.name}
          </h3>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Kode:</span>
            <span className="ml-2">{location.code}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            <FaTrashAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // DESKTOP TABLE ROW
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">{location.name}</td>
      <td className="px-6 py-4">{location.code}</td>
      <td className="px-6 py-4 flex justify-center space-x-2">
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
export default LocationRow;