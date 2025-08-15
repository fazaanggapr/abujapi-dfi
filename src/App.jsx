// App.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataAbsensi from "./pages/DataAbsensi";
import DataKaryawan from "./pages/DataKaryawan";
import Laporan from "./pages/Laporan";
import ListLocation from "./pages/ListLocation";
import TambahLokasi from "./features/location/TambahLokasi";
import EditLokasi from "./features/location/EditLokasi";

import ErrorPage from "./components/ErrorPage";

// Absensi
import ScanQR from "./pages/ScanQRAbsensi";

// Profil
import LihatProfil from "./features/profil/LihatProfil";
import TambahProfilKaryawan from "./features/profil/TambahProfilKaryawan";
import EditProfilKaryawan from "./features/profil/EditProfilKaryawan";
import LihatProfilKaryawan from "./features/profil/LihatProfilKaryawan";

// Laporan (by Karyawan)
import BuatLaporan from "./features/laporan/BuatLaporan";
// import LihatLaporan from "./features/laporan/LihatLaporan";
import EditLaporan from "./features/laporan/EditLaporan";

import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Routes yang butuh login */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-absensi"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DataAbsensi />
            </PrivateRoute>
          }
        />
        <Route
          path="/data-karyawan"
          element={
            <PrivateRoute allowedRoles={['admin']}> 
              <DataKaryawan />
            </PrivateRoute>
          }
        />
        <Route
          path="/laporan"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Laporan />
            </PrivateRoute>
          }
        />
        <Route
          path="/list-location"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <ListLocation />
            </PrivateRoute>
          }
        />
        <Route
          path="/lihat-profil/:id"
          element={
            <PrivateRoute>
              
              <LihatProfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/lihat-profil-karyawan/"
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
        {/* <Route
          path="/lihat-laporan"
          element={
            <PrivateRoute>
              <LihatLaporan />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/edit-laporan"
          element={
            <PrivateRoute>
              <EditLaporan />
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
          path="/tambah-lokasi"
          element={
            <PrivateRoute>
              <TambahLokasi />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-lokasi"
          element={
            <PrivateRoute>
              <EditLokasi />
            </PrivateRoute>
          }
        />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

