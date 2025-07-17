import React, { useEffect, useState } from "react";

const EmployeeData = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://abujapi-proto.ihsanwd10.my.id/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setProfile(result.data);
        } else {
          console.error(result.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-8 text-gray-600">Loading...</p>;

  if (!profile) return <p className="text-center mt-8 text-red-500">Profile not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#0d3551]">Employee Profile</h1>
      {profile.profile_photo_url && (
        <img
          src={profile.profile_photo_url}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
        />
      )}
      <ul className="space-y-2">
        <li><strong>Name:</strong> {profile.name || '-'}</li>
        <li><strong>Phone:</strong> {profile.phone_number || '-'}</li>
        <li><strong>Position:</strong> {profile.position || '-'}</li>
        <li><strong>Address:</strong> {profile.address || '-'}</li>
        <li><strong>Status:</strong> {profile.status || '-'}</li>
        <li><strong>Gender:</strong> {profile.gender || '-'}</li>
        <li><strong>Age:</strong> {profile.age || '-'}</li>
        <li><strong>Height:</strong> {profile.height || '-'}</li>
        <li><strong>Weight:</strong> {profile.weight || '-'}</li>
        <li><strong>Education:</strong> {profile.education || '-'}</li>
        <li><strong>Bank Account:</strong> {profile.bank_account || '-'}</li>
        <li><strong>Work Duration:</strong> {profile.work_duration || '-'}</li>
        <li><strong>Placement Location:</strong> {profile.placement_location || '-'}</li>
        <li><strong>Portfolio Link:</strong> <a href={profile.portfolio_link} target="_blank" className="text-blue-600 underline">{profile.portfolio_link}</a></li>
        <li><strong>Skills:</strong> {profile.skills || '-'}</li>
        <li><strong>Work Experience:</strong> {profile.work_experience || '-'}</li>
        <li><strong>Grade:</strong> {profile.grade || '-'}</li>
      </ul>
    </div>
  );
};

export default EmployeeData;
