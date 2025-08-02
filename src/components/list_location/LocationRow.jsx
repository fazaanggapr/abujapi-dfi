// components/LocationRow.js
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/api"; // Pastikan path ini sesuai dengan struktur proyekmu

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
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus lokasi.");
    }
  };

  return (
    <tr className="border-b">
      <td className="px-6 py-4">{index + 1}</td>
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
  );
}

export default LocationRow;
