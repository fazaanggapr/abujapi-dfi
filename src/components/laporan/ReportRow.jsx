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

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 text-sm text-gray-700">{description}</td>
        <td className="px-4 py-3 text-sm text-gray-700">{area}</td>
        <td className="px-4 py-3 text-sm text-gray-700">
          {reported_at ? new Date(reported_at).toLocaleDateString() : "-"}
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

      {/* Modal Component */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={image_url}
      />
    </>
  );
}

export default ReportRow;
