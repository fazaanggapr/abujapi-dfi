// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataAbsensi from "./pages/DataAbsensi";
import DataKaryawan from "./pages/DataKaryawan";
import Laporan from "./pages/Laporan";
import LihatAkunProfil from "./features/profil/LihatAkunProfil";
import TambahProfilKaryawan from "./features/profil/TambahProfilKaryawan";
import BuatLaporan from "./features/profil/laporan/BuatLaporan";
import EditProfilKaryawan from "./features/profil/EditProfilKaryawan";
import LihatLaporan from "./features/profil/laporan/LihatLaporan";
import LihatProfilKaryawan from "./features/profil/LihatProfilKaryawan";
import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";
import ScanQR from "./pages/ScanQRAbsensi";
import { useState } from "react";
function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Routes yang butuh login */}
        <Route
          path="/data-absensi"
          element={
            <PrivateRoute>
              <DataAbsensi />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-karyawan"
          element={
            <PrivateRoute>
              <DataKaryawan />
            </PrivateRoute>
          }
        />
        <Route
          path="/laporan"
          element={
            <PrivateRoute>
              <Laporan />
            </PrivateRoute>
          }
        />
        <Route
          path="/lihat-akun-profil"
          element={
            <PrivateRoute>
              <LihatAkunProfil />
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
        <Route
          path="/tambah-profil-karyawan"
          element={
            <PrivateRoute>
              <TambahProfilKaryawan />
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
          path="/absensi/scan-qr"
          element={
            <PrivateRoute>
              <ScanQR />
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
          path="/lihat-laporan"
          element={
            <PrivateRoute>
              <LihatLaporan />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
