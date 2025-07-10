import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const shownRef = useRef(false); // untuk mencegah notifikasi dobel

  useEffect(() => {
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
      shownRef.current = true; // set true supaya nggak muncul lagi
    }
  }, [token]);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
