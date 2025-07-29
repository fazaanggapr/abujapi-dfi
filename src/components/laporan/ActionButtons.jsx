// components/ActionButtons.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function ActionButtons() {
  return (
    <>
      <Link
        to="/buat-laporan"
        className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md flex items-center"
      >
        <FaPlus className="mr-2" /> BUAT LAPORAN
      </Link>
    </>
  );
}

export default ActionButtons;