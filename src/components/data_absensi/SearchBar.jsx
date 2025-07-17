// components/SearchBar.js
import React from "react";
import { FaSearch, FaQrcode } from "react-icons/fa";

const SearchBar = ({ searchTerm, onSearchChange, onQRClick }) => {
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Mencari..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="text-gray-400" />
        </button>
      </div>
      <button
        onClick={onQRClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
      >
        <FaQrcode className="mr-2" />
        <span className="hidden sm:inline">GENERATE CODE QR</span>
        <span className="sm:hidden">QR CODE</span>
      </button>
    </div>
  );
};

export default SearchBar;