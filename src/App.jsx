import Dashboard from "src/components/Dashboard";
import React from "react";
import Sidebar from "./components/Sidebar";
import DataKaryawan from "./components/DataKaryawan";
import { Route } from "react-router-dom";


function App() {
  return <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/data-karyawan" element={<DataKaryawan />} />
  </Routes>

}

export default App;
