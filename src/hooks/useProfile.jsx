import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../utils/api';

export const useProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    navigate('/login');
  };

  const handleViewProfile = () => {
    navigate('/lihat-profil-saya');
    setProfileDropdownOpen(false);
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const response = await fetch(`${baseUrl}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch');

      if (data.data && data.data.profile) {
        setProfile({
          name: data.data.name,
          role: data.data.role || 'Employee',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    profileDropdownOpen,
    toggleProfileDropdown,
    handleLogout,
    handleViewProfile,
    fetchProfile
  };
};