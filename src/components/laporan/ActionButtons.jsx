// components/ActionButtons.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function ActionButtons() {
  return (
    <>
         <Link
        to="/buat-laporan"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center"
      >
        <FaPlus className="mr-2" /> BUAT LAPORAN
      </Link>
    </>
  );
}

export default ActionButtons;