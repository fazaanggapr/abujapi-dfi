// components/ProfilePhoto.jsx
import React from 'react';
import { Camera, User, Star } from 'lucide-react';

const ProfilePhoto = ({ profilePhoto, formData, onUploadPhoto }) => {
  return (
    <div className="flex-shrink-0">
      <div className="w-32 h-40 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-lg">
        {profilePhoto ? (
          <img
            src={profilePhoto}
            className="w-full h-full object-cover"
            alt="Profile Photo"
          />
        ) : (
          <User className="w-12 h-12 text-slate-500" />
        )}
        <button
          onClick={onUploadPhoto}
          className="absolute bottom-2 right-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full p-2 shadow-lg transition-all duration-200"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>
      <div className="text-center mt-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200">
          <Star className="w-4 h-4 mr-1" />
          Grade: {formData.grade || "-"}
        </span>
      </div>
    </div>
  );
};

export default ProfilePhoto;