import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Rute tambahan jika kamu ingin buka /laporan.html secara React */}
        {/* <Route path="/laporan.html" element={<Laporan />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
