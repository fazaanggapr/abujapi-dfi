// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import DataKaryawan from "./components/DataKaryawan";
import LihatProfil from "./components/LihatProfil";
import TambahProfil from "./components/TambahProfil";
import TambahLaporan from "./components/TambahLaporan";
import EditProfil from "./components/EditProfil";
import LihatLaporan from "./components/LihatLaporan";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import ScanQR from "./components/ScanQR";
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
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/scan-qr"
          element={
            <PrivateRoute>
              <ScanQR />
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
          path="/lihat-profil"
          element={
            <PrivateRoute>
              <LihatProfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-profil"
          element={
            <PrivateRoute>
              <TambahProfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/tambah-laporan"
          element={
            <PrivateRoute>
              <TambahLaporan />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profil"
          element={
            <PrivateRoute>
              <EditProfil />
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
