// components/ControlSection.js
import React from 'react';
import SearchBar from './SearchBar';

function ControlSection({ searchTerm, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium hidden md:block">
          Sortir berdasarkan:
        </label>
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
    </div>
  );
}

export default ControlSection;