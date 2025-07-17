import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarMenuItem = ({ 
  icon: Icon, 
  label, 
  path, 
  isVisible = true 
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  if (!isVisible) return null;

  return (
    <li>
      <Link
        to={path}
        className={`
          flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
          ${isActive 
            ? 'bg-blue-100 text-blue-600 font-medium' 
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;