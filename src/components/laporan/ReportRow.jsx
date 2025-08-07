import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate here
import ImageModal from "./ImageModal";
import { toast } from "react-toastify";

function ReportRow({ report, onDelete }) {
  const { id, description, area, reported_at, user, image_url } = report;

  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-laporan`);  // Include id in the URL to edit specific report
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Yakin ingin menghapus laporan ini?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access_token");
      const apiBase = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiBase}/reports/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus laporan");
      }

      toast.success("Laporan berhasil dihapus");

      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Error saat menghapus:", error);
      toast.error("Terjadi kesalahan saat menghapus laporan");
    }
  };

  // Format tanggal untuk tampilan
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  return (
    <>
      {/* DESKTOP VERSION - Hidden on mobile (md and up) */}
      <tr className="hidden md:table-row hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 text-sm text-gray-700">{area}</td>
        <td className="px-4 py-3 text-sm text-gray-700">{description}</td>
        <td className="px-4 py-3 text-sm text-gray-700">
          {formatDate(reported_at)}
        </td>
        <td className="px-4 py-3 text-sm text-gray-700">
          {user?.name || "Tidak diketahui"}
        </td>
        <td className="px-6 py-5 text-center">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setModalOpen(true)}
              className="text-green-600 hover:text-green-800 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <FaImage />
            </button>
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <FaTrashAlt />
            </button>
          </div>
        </td>
      </tr>

      {/* MOBILE VERSION - Visible only on mobile (below md) */}
      <div className="block md:hidden bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
        {/* Report Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {area}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {description}
          </p>
        </div>

        {/* Report Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-20">Tanggal:</span>
            <span className="ml-2">{formatDate(reported_at)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-20">Pelapor:</span>
            <span className="ml-2">{user?.name || "Tidak diketahui"}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-start gap-4 pt-3 border-t border-gray-100">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
          >
            <FaImage className="w-4 h-4" />
            
          </button>

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

      {/* Modal Component - Shared between desktop and mobile */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={image_url}
      />
    </>
  );
}

export default ReportRow;