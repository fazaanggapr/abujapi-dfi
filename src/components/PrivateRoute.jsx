import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const shownRef = useRef(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token); // convert to boolean

    if (!token && !shownRef.current) {
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
      shownRef.current = true;
    }
  }, []);

  // Menampilkan loading saat sedang mengecek autentikasi
  if (isAuthenticated === null) {
    return (
      <div className="text-center py-10 text-gray-600">
        Memeriksa akses... 🔐
      </div>
    );
  }

  // Redirect jika belum login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika lolos autentikasi
  return children;
};

export default PrivateRoute;
    