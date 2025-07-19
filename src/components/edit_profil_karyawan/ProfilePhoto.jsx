import React from "react";
import { Camera, User, Fingerprint, Star } from "lucide-react";

const ProfilePhoto = ({ employee, uploadPhoto }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden sticky top-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-white" />
          <h2 className="text-lg font-semibold text-white">
            Foto Profil
          </h2>
        </div>
      </div>
      <div className="p-6">
        {/* Profile Photo */}
        <div className="text-center mb-6">
          <div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-lg mx-auto">
            <img
              src={
                employee?.profile_photo_url ||
                "assets/profile-photo-default.png"
              }
              className="w-full h-full object-cover"
              alt="Profile Photo"
            />
            <button
              onClick={uploadPhoto}
              className="absolute bottom-2 right-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grade Badge */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200">
            <Star className="w-4 h-4 mr-1" />
            Grade: {employee?.grade || "-"}
          </span>
        </div>

        {/* Fingerprint */}
        <div className="flex justify-center mt-6">
          <div className="w-16 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
            <Fingerprint className="w-8 h-8 text-cyan-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;