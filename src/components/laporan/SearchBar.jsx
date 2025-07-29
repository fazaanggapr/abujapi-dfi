// components/SearchBar.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Cari karyawan..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
      />
      <button
        onClick={() => onSearchChange(searchTerm)}
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;