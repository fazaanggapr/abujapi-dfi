// src/components/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const errorConfig = {
  404: {
    image: "/assets/404-page.svg",
    title: "Halaman Tidak Ditemukan",
    message: "Maaf, halaman yang kamu tuju tidak tersedia.",
    action: { label: "Kembali ke Dashboard", to: "/dashboard" }
  },
  403: {
    image: "/assets/undraw_access-denied_krem.svg",
    title: "Akses Ditolak",
    message: "Kamu tidak memiliki izin untuk mengakses halaman ini.",
    action: { label: "Kembali", to: "/dashboard" }
  },
  500: {
    image: "/assets/undraw_access-denied_krem.svg",
    title: "Kesalahan Server",
    message: "Terjadi kesalahan di server. Silakan coba lagi nanti.",
    action: { label: "Muat Ulang", to: "/dashboard" }
  }
};

export default function ErrorPage({ code = 404 }) {
  const { image, title, message, action } = errorConfig[code] || errorConfig[404];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <img src={image} alt={title} className="w-1/2 max-w-md mb-6" />
      <h3 className="text-6xl font-bold text-gray-800">{code}</h3>
      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-gray-600">{message}</p>
      {action && (
        <Link
          to={action.to}
          className="mt-6 px-4 py-2 bg-zinc-400 text-white rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
