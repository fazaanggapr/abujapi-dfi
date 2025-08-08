import React from 'react';

const UserAvatar = ({ name, photoUrl, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    photoUrl ? (
      <img
        src={photoUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    ) : (
      <div className={`${sizeClasses[size]} bg-gray-600 rounded-full flex items-center justify-center`}>
        <span className="text-white font-medium">
          {getInitials(name)}
        </span>
      </div>
    )
  );
};

export default UserAvatar;
