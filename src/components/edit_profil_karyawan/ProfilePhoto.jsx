const ProfilePhoto = ({ profilePhoto, onPhotoUpload, grade }) => {
  return (
    <div className="text-center">
      <img
        src={profilePhoto || "/default-profile.png"}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto object-cover"
      />
      <p className="mt-2 text-sm text-gray-500">Grade: {grade}</p>
      <button
        onClick={onPhotoUpload}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload Foto
      </button>
    </div>
  );
};

export default ProfilePhoto;
