import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/api"; 
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
      toast.success("Lokasi berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat menghapus lokasi");
    }
  };

  if (isMobile) {
    // MOBILE CARD - Layout seperti gambar Laporan
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 p-4">
        {/* Nama Lokasi */}
        <div className="mb-2">
          <h3 className="text-base font-semibold text-gray-900">
            {location.name}
          </h3>
        </div>

        {/* Info Kode */}
        <div className="mb-4 text-sm text-gray-600">
          <div className="flex">
            <span className="font-medium text-gray-700">Kode:</span>
            <span className="ml-2">{location.code}</span>
          </div>
        </div>

        {/* Action Buttons - Di bawah seperti gambar laporan */}
        <div className="flex items-center justify-start gap-3">
          <button
            onClick={handleDelete}
            className="flex items-center justify-center w-8 h-8 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors"
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