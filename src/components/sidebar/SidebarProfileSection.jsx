import React from 'react';
import UserAvatar from './UserAvatar';
import ProfileDropdown from './ProfileDropdown';

const SidebarProfileSection = ({ 
  profile, 
  isDropdownOpen, 
  onToggleDropdown, 
  onViewProfile, 
  onLogout 
}) => {
  return (
    <div className="p-4 border-t border-gray-200 relative">
      <ProfileDropdown
        isOpen={isDropdownOpen}
        onViewProfile={onViewProfile}
        onLogout={onLogout}
      />

      <button
        onClick={onToggleDropdown}
        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        ><UserAvatar
              name={profile?.name}
              photoUrl={profile?.profile_photo_url}
            />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">
                {profile?.name || 'Loading...'}
              </p>
              <p className="text-xs text-gray-500">
                {profile?.role || ''}
              </p>
            </div>

      </button>
    </div>
  );
};

export default SidebarProfileSection;