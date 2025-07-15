// src/components/Sidebar.jsx
import { Shield, Home, QrCode, Calendar, User, LogOut } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import baseUrl from "../utils/api";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    navigate("/login");
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${baseUrl}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch");

        if (data.data && data.data.profile) {
          setProfile({
            name: data.data.name,
            role: data.data.role || "Employee",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-grow">
              <h1 className="text-lg font-semibold text-gray-900">Security</h1>
              <p className="text-sm text-blue-600">Management</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 ml-auto text-gray-500 hover:text-black"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Main Menu
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>

              {profile?.role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/absensi/scan-qr"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <QrCode className="w-5 h-5" />
                      <span className="font-medium">Absensi QR</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/data-absensi"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Data Absensi</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/data-karyawan"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Data Karyawan</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Bottom Profile */}
          <div className="p-4 border-t border-gray-200 relative">
            {profileDropdownOpen && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button
                  onClick={() => navigate("/profil")}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Profil</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign out</span>
                </button>
              </div>
            )}

            <button
              onClick={toggleProfileDropdown}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {profile?.name
                    ? profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.name || "Loading..."}
                </p>
                <p className="text-xs text-gray-500">{profile?.role || ""}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay untuk mobile */}
{isOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    onClick={onClose}
  ></div>
)}
    </>
  );
};

export default Sidebar;
