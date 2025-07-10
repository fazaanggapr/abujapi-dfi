import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  User,
  ArrowLeft,
  Fingerprint,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  Activity,
  Award,
  Briefcase,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  GraduationCap,
  CreditCard,
  Users,
  Clock,
  Star,
} from "lucide-react";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);

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

  const handleDeleteData = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      console.log("Delete employee data");
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/data-karyawan" // Ganti sesuai rute tujuan kamu
                className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white hover:text-white transition-colors shadow-md"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Profil Karyawan</p>
                <p className="font-semibold text-slate-800">{employee?.name}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Profile Title */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Profil Karyawan
              </h1>
              <p className="text-slate-600 flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>
                  ID: {employee?.user_id} • {employee?.position}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Personal Information */}
          <div className="xl:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Informasi Pribadi
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Photo */}
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
                        onClick={uploadPhoto}
                        className="absolute bottom-2 right-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full p-2 shadow-lg transition-all duration-200"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-center mt-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200">
                        <Star className="w-4 h-4 mr-1" />
                        Grade: {employee?.grade || "-"}
                      </span>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          Nama Lengkap
                        </label>
                        <p className="text-slate-800 font-semibold">
                          {employee?.name}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          NIK
                        </label>
                        <p className="text-slate-800 font-semibold">
                          {employee?.nik}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          No HP
                        </label>
                        <p className="text-slate-800 font-semibold">
                          {employee?.phone}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          Status
                        </label>
                        <p className="text-emerald-800 font-semibold">
                          {employee?.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Detail Informasi
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Alamat
                        </p>
                        <p className="text-slate-800">{employee?.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Jenis Kelamin
                        </p>
                        <p className="text-slate-800">{employee?.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Umur
                        </p>
                        <p className="text-slate-800">{employee?.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Tinggi / Berat
                        </p>
                        <p className="text-slate-800">
                          {employee?.height} / {employee?.weight}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Pendidikan
                        </p>
                        <p className="text-slate-800">{employee?.education}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Akun Bank
                        </p>
                        <p className="text-slate-800">
                          {employee?.bankAccount}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Email
                        </p>
                        <p className="text-slate-800">{employee?.email}</p>
                      </div>
                    </div>

                    {/* Fingerprint Visualization */}
                    <div className="flex justify-center mt-6">
                      <div className="w-20 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
                        <Fingerprint className="w-10 h-10 text-cyan-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work History and Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Work History */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">
                      Riwayat Kerja
                    </h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {workHistory.map((work, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
                    >
                      <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="text-slate-800 font-medium text-sm">
                          {work.company}
                        </p>
                        <p className="text-slate-600 text-sm">
                          {work.position}
                        </p>
                        <p className="text-slate-500 text-xs">{work.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">
                      Keahlian
                    </h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200"
                    >
                      <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div>
                        <p className="text-slate-800 font-medium text-sm">
                          {skill.title}
                        </p>
                        <p className="text-slate-600 text-xs">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Sertifikasi
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        {cert.name}
                      </p>
                      <p className="text-xs text-slate-600">{cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Work Data */}
          <div className="space-y-8">
            {/* Work Data */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">
                    Data Pekerjaan
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Status Karyawan
                  </label>
                  <p className="text-emerald-800 font-semibold flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {employee?.employeeStatus}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Jabatan
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {employee?.position}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Lama Bekerja
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {employee?.workDuration}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Lokasi Penempatan
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {employee?.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-6 h-6 text-white" />
                  <h3 className="text-lg font-semibold text-white">
                    Link Portofolio
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <a
                    href={employee?.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>
                      {employee?.portfolio
                        ? employee.portfolio.replace("https://", "")
                        : "-"}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Tombol Tambah Tugas */}
              <Link
                to="/tambah-tugas"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 
      hover:from-green-700 hover:to-emerald-700 
      text-white font-bold py-4 px-6 rounded-xl 
      transition-all duration-200 shadow-lg hover:shadow-xl 
      flex items-center justify-center space-x-2 transform hover:-translate-y-1 
      focus:outline-none focus:ring-0 focus:text-white hover:text-white"
              >
                <Plus className="w-5 h-5" />
                <span>TAMBAH TUGAS</span>
              </Link>

              {/* Tombol Edit & Hapus */}
              <div className="grid grid-cols-2 gap-4">
                {/* Tombol Edit */}
                <Link
                  to="/edit-profil"
                  className="bg-gradient-to-r from-orange-600 to-red-600 
        hover:from-orange-700 hover:to-red-700 
        text-white font-bold py-3 px-4 rounded-xl 
        transition-all duration-200 shadow-lg hover:shadow-xl 
        flex items-center justify-center space-x-2 transform hover:-translate-y-1 
        focus:outline-none focus:ring-0 focus:text-white hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                  <span>EDIT</span>
                </Link>

                {/* Tombol Hapus */}
                <button
                  onClick={handleDeleteData}
                  className="bg-gradient-to-r from-red-600 to-red-700 
        hover:from-red-700 hover:to-red-800 
        text-white font-bold py-3 px-4 rounded-xl 
        transition-all duration-200 shadow-lg hover:shadow-xl 
        flex items-center justify-center space-x-2 transform hover:-translate-y-1 
        focus:outline-none focus:ring-0 focus:text-white hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>HAPUS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
