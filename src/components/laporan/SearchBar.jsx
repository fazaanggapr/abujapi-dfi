import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";

const SearchBar = ({ searchTerm, onSearchChange, onAddLocationClick }) => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      {/* Search Bar */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-4 pr-12 py-3 border-2 border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="text-gray-400" />
        </button>
      </div>
      <Link
        to="/buat-laporan"
        className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
      >
        <FaPlus className="mr-2" /> BUAT LAPORAN
      </Link>
    </div>
  );
};

export default SearchBar;
