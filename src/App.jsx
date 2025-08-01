import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Auth pages
import Register from "./pages/Register";
import Login from "./pages/Login";

// Main pages
import Dashboard from "./pages/Dashboard";
import DataAbsensi from "./pages/DataAbsensi";
import DataKaryawan from "./pages/DataKaryawan";
import Laporan from "./pages/Laporan";

// Location management
import ListLocation from "./pages/ListLocation";
import RegisterLocation from "./pages/RegisterLocation";

// Absensi
import ScanQR from "./pages/ScanQRAbsensi";

// Profil
import LihatProfilSaya from "./features/profil/LihatProfilSaya";
import TambahProfilKaryawan from "./features/profil/TambahProfilKaryawan";
import EditProfilKaryawan from "./features/profil/EditProfilKaryawan";
import LihatProfilKaryawan from "./features/profil/LihatProfilKaryawan";

// Laporan (by Karyawan)
import BuatLaporan from "./features/profil/laporan/BuatLaporan";
import LihatLaporan from "./features/profil/laporan/LihatLaporan";

// Middleware
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ABSENSI */}
        <Route
          path="/data-absensi"
          element={
            <PrivateRoute>
              <DataAbsensi />
            </PrivateRoute>
          }
        />
        <Route
          path="/absensi/scan-qr"
          element={
            <PrivateRoute>
              <ScanQR />
            </PrivateRoute>
          }
        />

        {/* KARYAWAN / PROFIL */}
        <Route
          path="/data-karyawan"
          element={
            <PrivateRoute>
              <DataKaryawan />
            </PrivateRoute>
          }
        />
        <Route
          path="/lihat-profil-saya"
          element={
            <PrivateRoute>
              <LihatProfilSaya />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-profil-karyawan"
          element={
            <PrivateRoute>
              <TambahProfilKaryawan />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profil-karyawan"
          element={
            <PrivateRoute>
              <EditProfilKaryawan />
            </PrivateRoute>
          }
        />
        <Route
          path="/lihat-profil-karyawan"
          element={
            <PrivateRoute>
              <LihatProfilKaryawan />
            </PrivateRoute>
          }
        />

        {/* LAPORAN */}
        <Route
          path="/laporan"
          element={
            <PrivateRoute>
              <Laporan />
            </PrivateRoute>
          }
        />
        <Route
          path="/buat-laporan"
          element={
            <PrivateRoute>
              <BuatLaporan />
            </PrivateRoute>
          }
        />
        <Route
          path="/lihat-laporan"
          element={
            <PrivateRoute>
              <LihatLaporan />
            </PrivateRoute>
          }
        />

        {/* LOCATION */}
        <Route
          path="/list-location"
          element={
            <PrivateRoute>
              <ListLocation />
            </PrivateRoute>
          }
        />
        <Route
          path="/location/register"
          element={
            <PrivateRoute>
              <RegisterLocation />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
