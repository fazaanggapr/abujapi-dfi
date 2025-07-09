
import { Link } from "react-router-dom";
import { Camera, User, ArrowLeft, Fingerprint, Phone, Mail, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null); // ⬅️ dipindah ke atas

  // Fetch data user dari API
  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (response.ok && result.data && result.data.profile) {
          const profile = result.data.profile;
          setEmployee({
            user_id: profile.user_id,
            name: result.data.name,
            email: result.data.email,
            nik: profile.nik,
            phone: profile.phone_number,
            status: profile.status,
            address: profile.address,
            gender: profile.gender,
            age: profile.age + " tahun",
            height: profile.height + " cm",
            weight: profile.weight + " kg",
            education: profile.education,
            bankAccount: profile.bank_account,
            employeeStatus: profile.employee_status,
            position: profile.position,
            workDuration: profile.work_duration,
            location: profile.placement_location,
            portfolio: profile.portfolio_link,
            grade: profile.grade,
          });
        } else {
          console.error("Failed to fetch employee data:", result);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  // Fungsi upload foto profil
  const uploadPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePhoto(e.target.result);
          alert("Foto profil berhasil diunggah!");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Dummy data riwayat kerja, skill, sertifikat
  const workHistory = [
    {
      company: "PT. Terbang kesatas",
      position: "Junior Security",
      period: "2018 - 2019",
    },
    {
      company: "PT. Terbang kesatas",
      position: "Senior Security",
      period: "2019 - 2022",
    },
    {
      company: "PT. Terbang kesatas",
      position: "Security Supervisor",
      period: "2022 - Sekarang",
    },
  ];

  const skills = [
    {
      title: "Keahlian Teknis",
      description:
        "Berdiskusi tentang masalah perkembangan zaman terkait cyber, keamanan, hacker dll.",
    },
    {
      title: "Analisis Keamanan",
      description: "Menganalisis resiko keamanan pada area kantor dan gedung",
    },
    {
      title: "Operasional",
      description: "Mengoperasikan alat komunikasi, bela diri, surveillance.",
    },
  ];

  const certifications = [
    { name: "Garda Madya", year: "2015" },
    { name: "Security Basic", year: "2018" },
    { name: "First Aid", year: "2020" },
    { name: "Cyber Security", year: "2023" },
  ];
  const handleBackClick = () => {
    // Handle navigation back to employee list
    console.log("Navigate back to employee list");
  };

  const handleEditData = () => {
    // Handle edit data navigation
    console.log("Navigate to edit data page");
  };

  const handleAddTask = () => {
    // Handle add task navigation
    console.log("Navigate to add task page");
  };

  const handleDeleteData = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      console.log("Delete employee data");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/data-karyawan" // ganti dengan path tujuan kamu
                className="mr-4 text-white bg-blue-700 p-2 rounded-full transition transform hover:-translate-y-1"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>

              <h1 className="text-xl font-bold">DATA PRIBADI</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Data */}
          <div className="lg:col-span-2">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-40 bg-gray-600 rounded-lg overflow-hidden relative flex items-center justify-center">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        className="w-full h-full object-cover"
                        alt="Profile Photo"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-300" />
                    )}
                    <button
                      onClick={uploadPhoto}
                      className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      Grade : -
                    </span>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      ID
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                      {employee?.user_id}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Nama Lengkap
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                      {employee?.name}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        NIK
                      </label>
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                        {employee?.nik}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        No HP
                      </label>
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                        {employee?.phone}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Status
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                      {employee?.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 text-white mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-24 text-sm font-medium">Alamat</span>
                    <span className="mx-2">:</span>
                    <div className="flex-1 text-sm">{employee?.address}</div>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm font-medium">Kelamin</span>
                    <span className="mx-2">:</span>
                    <span className="text-sm">{employee?.gender}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm font-medium">Umur</span>
                    <span className="mx-2">:</span>
                    <span className="text-sm">{employee?.age}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm font-medium">Tinggi</span>
                    <span className="mx-2">:</span>
                    <span className="text-sm">{employee?.height}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm font-medium">Berat</span>
                    <span className="mx-2">:</span>
                    <span className="text-sm">{employee?.weight}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm font-medium">Pendidikan</span>
                    <span className="mx-2">:</span>
                    <span className="text-sm">{employee?.education}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm font-medium">Akun Bank</span>
                    <span className="mx-2">:</span>
                    <span className="text-sm">{employee?.bankAccount}</span>
                  </div>
                </div>

                {/* Fingerprint Icon */}
                <div className="flex justify-center items-center">
                  <div className="w-28 h-36 bg-cyan-100 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/fingerprint-icon.png" // ganti sesuai path kamu
                      alt="Fingerprint"
                      className="w-20 h-20 object-contain opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Work History and Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Work History */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 text-center">
                  Riwayat Kerja
                </h3>
                <div className="space-y-3">
                  {workHistory.map((work, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-400 rounded-full flex-shrink-0"></div>
                      <div className="text-white text-sm">
                        <div className="font-medium">{work.company}</div>
                        <div className="text-white/80">{work.position}</div>
                        <div className="text-white/60 text-xs">
                          {work.period}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 text-center">
                  Keahlian
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-orange-400 rounded-full flex-shrink-0"></div>
                      <div className="text-white text-sm">
                        <div className="font-medium">{skill.title}</div>
                        <div className="text-white/80 text-xs">
                          {skill.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4 text-center">
                Sertifikasi
              </h3>
              <div className="flex justify-between items-center">
                {certifications.map((cert, index) => (
                  <React.Fragment key={index}>
                    <div className="text-white text-center flex-1">
                      <div className="w-4 h-4 bg-orange-400 rounded-full mx-auto mb-1"></div>
                      <div className="text-xs">
                        {cert.name}
                        <br />
                        {cert.year}
                      </div>
                    </div>
                    {index < certifications.length - 1 && (
                      <div className="flex-1 h-0.5 bg-orange-400 mx-2"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Work Data */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">DATA PEKERJAAN</h2>
            </div>

            <div className="bg-white rounded-b-lg shadow-md p-6 space-y-4 border border-gray-200 border-t-0">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Status Karyawan
                </label>
                <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                  <span className="text-green-800 font-medium">
                    {employee?.employeeStatus}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Jabatan
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                  {employee?.position}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Lama Bekerja
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                  {employee?.workDuration}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Lokasi Penempatan
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800">
                  {employee?.location}
                </div>
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg">
                <h3 className="text-lg font-bold">Link Portofolio</h3>
              </div>
              <div className="bg-white rounded-b-lg shadow-md p-6 border border-gray-200 border-t-0">
                <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-md">
                  <a
                    href={employee?.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {employee?.portfolio.replace("https://", "")}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mb-6 mt-8">
              <button
                onClick={handleAddTask}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md transform hover:-translate-y-1"
              >
                TAMBAH TUGAS
              </button>
            </div>
            <div className="mt-6 flex space-x-4">
              <Link
                to="/edit-profil" // ganti dengan rute tujuanmu
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md transform hover:-translate-y-1 text-center"
              >
                EDIT PROFIL
              </Link>
              <button
                onClick={handleDeleteData}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md transform hover:-translate-y-1"
              >
                HAPUS DATA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
