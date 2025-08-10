// routes/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import baseUrl from '../utils/api';

const errorConfig = {
  403: {
    image: "/assets/access-denied.svg",
    title: "Akses Ditolak",
    message: "Kamu tidak memiliki izin untuk mengakses halaman ini.",
    action: { label: "Kembali ke Dashboard", to: "/dashboard" }
  },
  500: {
    image: "/assets/server-error.svg",
    title: "Kesalahan Server",
    message: "Terjadi masalah pada server. Silakan coba lagi nanti.",
    action: { label: "Muat Ulang", to: window.location.pathname }
  }
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const location = useLocation();

  useEffect(() => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    setIsAuthenticated(false);
    toast.error('Silakan login terlebih dahulu untuk melanjutkan.');
    setLoading(false);
    return;
  }

  // Step 1: Ambil role dari /me
  fetch(`${baseUrl}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem('access_token');
        toast.error('Sesi telah berakhir. Silakan login kembali.');
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setErrorCode(res.status);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUserRole(data.role);

      // Step 2: Cek profil dari /profile
      return fetch(`${baseUrl}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    })
    .then(async (res) => {
      if (!res) return; // kalau sudah stop di atas

      if (res.status === 404) {
        // Profil belum ada
        setHasProfile(false);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setErrorCode(res.status);
        setLoading(false);
        return;
      }

      // Profil ada
      setHasProfile(true);
      setLoading(false);
    })
    .catch(() => {
      setErrorCode(500);
      setLoading(false);
    });
}, [location.pathname]);


  // Loader
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Memeriksa akses... 🔐
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasProfile && location.pathname !== '/edit-profil-karyawan') {
    return <Navigate to="/edit-profil-karyawan" state={{ from: location }} replace />;
  }

  if (errorCode) {
    const err = errorConfig[errorCode] || errorConfig[500];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <img src={err.image} alt={err.title} className="w-64 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800">{err.title}</h1>
        <p className="text-gray-600 mb-4">{err.message}</p>
        <a
          href={err.action.to}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {err.action.label}
        </a>
      </div>
    );
  }

  // Jika role tidak sesuai
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    const err = errorConfig[403];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <img src={err.image} alt={err.title} className="w-64 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800">{err.title}</h1>
        <p className="text-gray-600 mb-4">{err.message}</p>
        <a
          href={err.action.to}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {err.action.label}
        </a>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
