import React from 'react';
import SidebarHeader from '../components/sidebar/SidebarHeader';
import SidebarNavigation from '../components/sidebar/SidebarNavigation';
import SidebarProfileSection from '../components/sidebar/SidebarProfileSection';
import SidebarOverlay from '../components/sidebar/SidebarOverlay';
import { useProfile } from '../hooks/useProfile';

const Sidebar = ({ isOpen, onClose }) => {
  const {
    profile,
    profileDropdownOpen,
    toggleProfileDropdown,
    handleLogout,
    handleViewProfile
  } = useProfile();

  return (
    <>
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          <SidebarHeader onClose={onClose} />
          
          <SidebarNavigation userRole={profile?.role || 'employee'} />
          
          <SidebarProfileSection
            profile={profile}
            isDropdownOpen={profileDropdownOpen}
            onToggleDropdown={toggleProfileDropdown}
            onViewProfile={handleViewProfile}
            onLogout={handleLogout}
          />
        </div>
      </div>

      <SidebarOverlay isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;