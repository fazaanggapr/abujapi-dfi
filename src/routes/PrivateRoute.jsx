// routes/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import baseUrl from '../utils/api';
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasProfile, setHasProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setIsAuthenticated(false);
      toast.error('Silakan login terlebih dahulu untuk melanjutkan.', {
        duration: 4000,
        icon: '🔒',
        style: {
          background: '#fff',
          color: '#333',
          border: '1px solid #e5e7eb',
          padding: '12px 16px',
          borderRadius: '8px',
        },
      });
      return;
    }

    setIsAuthenticated(true);

    // Cek profil ke backend
    fetch(`${baseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          if (data.message === 'Profil belum dibuat.') {
            setHasProfile(false);
          } else {
            throw new Error('Gagal memuat profil');
          }
        } else {
          setHasProfile(true);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Terjadi kesalahan saat memeriksa profil.');
        setHasProfile(false);
      });
  }, []);
  console.log('Auth:', isAuthenticated);
console.log('Has Profile:', hasProfile);

  if (isAuthenticated === null || hasProfile === null) {
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
    return <Navigate to="/edit-profil-karyawan" replace />;
  }

  return children;
};

export default PrivateRoute;
