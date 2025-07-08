// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import DataKaryawan from "./components/DataKaryawan";
import LihatProfil from "./components/LihatProfil";
import TambahProfil from "./components/TambahProfil";
import EditProfil from "./components/EditProfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-karyawan" element={<DataKaryawan />} />
        <Route path="/lihat-profil" element={<LihatProfil />} />
        <Route path="/tambah-profil" element={<TambahProfil />} />
        <Route path="/edit-profil" element={<EditProfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
