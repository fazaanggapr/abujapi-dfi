// components/Pagination.js
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Pagination({ currentPage, totalPages, totalItems, displayedItems }) {
  return (
    <div className="mt-6 flex items-center justify-between px-6 pb-4">
      <div className="text-sm text-gray-600">
        Menampilkan <span>1</span>-<span>{displayedItems}</span>{" "}
        dari <span>{totalItems}</span> data
      </div>
      <div className="flex items-center space-x-2">
        <button className="bg-white border border-gray-300 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50">
          <FaChevronLeft />
        </button>
        <button className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium">
          1
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50">
          2
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50">
          3
        </button>
        <button className="bg-white border border-gray-300 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;