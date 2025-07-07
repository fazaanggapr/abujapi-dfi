import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./input.css";
import DataKaryawan from "./components/DataKaryawan";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/data-karyawan" element={<DataKaryawan />} />
        {/* Rute tambahan jika kamu ingin buka /laporan.html secara React */}
        {/* <Route path="/laporan.html" element={<Laporan />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
