import React, { useState, useEffect } from 'react';
import { FaUser, FaMapMarkerAlt, FaCogs, FaIdBadge, FaEye } from "react-icons/fa";
import Sidebar from './Sidebar';



function DataKaryawan() {
  const [sideOpen, setSideOpen] = React.useState(false);
  const toggleSidebar = () => setSideOpen(!sideOpen);

return (
    <div className="bg-gray-50 font-sans min-h-screen flex">
        
         <Sidebar />
    <div className="flex-1 overflow-auto">
            <div className="bg-white p-4 md:p-6 border-b border-gray-200 shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">DATA KARYAWAN</h1>
            </div>

            <div className="p-4 md:p-6">


                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                        <label className="text-gray-700 font-medium hidden md:block">Sortir:</label>
                        <div className="flex items-center w-full">
                            <input 
                                type="text" 
                                placeholder="Cari karyawan..." 
                                className="px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                                id="sortInput"
                            ></input>
                            <button className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors" id="searchBtn">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    
                    <a href="tambahtugas.html" classNameName="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center w-full md:w-auto justify-center">
                        <i className="fas fa-plus mr-2"></i>
                        TAMBAH TUGAS
                    </a>
                </div>
<div className="desktop-view">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <table className="w-full">
            

                <thead>
                <tr className="bg-gradient-to-r from-cyan-200 to-blue-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    <FaUser className="mr-2 inline" />
                    Nama Karyawan
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    <FaMapMarkerAlt className="mr-2 inline" />
                    Lokasi
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    <FaCogs className="mr-2 inline" />
                    Aksi
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100" id="employeeTableBody">
                <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                    <div>
                        <div className="font-semibold text-gray-900">Inukai Atsuhiro</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FaIdBadge className="mr-1" />
                        ID: 019
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <span className="text-gray-700 font-medium">Bekasi</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => (window.location.href = "lihatdata.html?id=019")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
                    >
                        <FaEye className="mr-1" />
                        LIHAT DATA
                    </button>
                    </td>
                </tr>

                <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                    <div>
                        <div className="font-semibold text-gray-900">Tanaka Hiroshi</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FaIdBadge className="mr-1" />
                        ID: 020
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <span className="text-gray-700 font-medium">Jakarta</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => (window.location.href = "lihatdata.html?id=020")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
                    >
                        <FaEye className="mr-1" />
                        LIHAT DATA
                    </button>
                    </td>
                </tr>

                <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                    <div>
                        <div className="font-semibold text-gray-900">Sato Kenji</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FaIdBadge className="mr-1" />
                        ID: 021
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <span className="text-gray-700 font-medium">Bandung</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => (window.location.href = "lihatdata.html?id=021")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
                    >
                        <FaEye className="mr-1" />
                        LIHAT DATA
                    </button>
                    </td>
                </tr>
                </tbody>

            </table>
        </div>
    </div>

                
                </div>
            </div>
        </div>
    );
}
export default DataKaryawan;