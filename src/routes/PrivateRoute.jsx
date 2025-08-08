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
  }
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasProfile, setHasProfile] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setIsAuthenticated(false);
      toast.error('Silakan login terlebih dahulu untuk melanjutkan.');
      return;
    }

    setIsAuthenticated(true);

    fetch(`${baseUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (data.message === 'Profil belum dibuat.') {
            setHasProfile(false);
          } else {
            throw new Error('Gagal memuat profil');
          }
        } else {
          setHasProfile(true);
          setUserRole(data.role);
        }
      })
      .catch(() => {
        toast.error('Terjadi kesalahan saat memeriksa profil.');
        setHasProfile(false);
      });
  }, []);

  // Loader
  if (isAuthenticated === null || hasProfile === null) {
    return (
      <div className="text-center py-10 text-gray-600">
        Memeriksa akses... 🔐
      </div>
    );
  }

  // Belum login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Belum punya profil
  if (!hasProfile && location.pathname !== '/tambah-profil-karyawan') {
    return <Navigate to="/tambah-profil-karyawan" replace />;
  }

  // Role tidak cocok → tampilkan halaman 403 inline
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
