// components/Pagination.js
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  filteredReports, // Mengganti filteredEmployees menjadi filteredReports
  itemsPerPage
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`
            px-3 py-2 text-sm rounded-lg border transition-colors duration-200
            ${currentPage === i ? "bg-blue-600 text-white border-blue-600" : "text-gray-500 border-gray-300 hover:bg-gray-50"}
          `}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  // Pastikan filteredReports bukan undefined dan memiliki panjang
  const displayLength = filteredReports?.length || 0;

  return (
    <div className="mt-6 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
      <div className="text-sm text-gray-600 text-center lg:text-left">
        Menampilkan{" "}
        {displayLength === 0 ? 0 : startIndex + 1}-
        {Math.min(endIndex, displayLength)} dari{" "}
        {displayLength} data
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <div className="flex space-x-1 overflow-x-auto">
          {renderPagination()}
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
