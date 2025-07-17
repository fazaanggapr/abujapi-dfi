import React, { useState, useEffect } from "react";
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
  X,
  Save,
  Star,
} from "lucide-react";

const baseUrl = import.meta.env.VITE_API_URL;

const EditEmployeeDataForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    address: '',
    gender: '',
    age: '',
    bank_account: '',
    education: '',
    employee_status: '',
    portfolio_link: '',
    placement_location: '',
    position: '',
    status: '',
    work_duration: '',
    work_location: '',
    weight: '',
    height: '',
    nik: '',
    grade: ''
  });

 const [profilePhoto, setProfilePhoto] = useState(null);
const [photoFile, setPhotoFile] = useState(null); // buat dikirim ke backend

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
        setPhotoFile(file); // <-- ini penting buat backend
        showMessage("Foto profil berhasil diunggah!");
      };
      reader.readAsDataURL(file);
    }

  const [workHistory, setWorkHistory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const res = await fetch(`${baseUrl}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await res.json();
        if (res.ok && result.data?.profile) {
          const profile = result.data.profile;
          setFormData({
            name: formData.name,
            phone_number: formData.phone_number,
            address: formData.address,
            gender: formData.gender,
            age: formData.age,
            bank_account: formData.bank_account,
            education: formData.education,
            employee_status: formData.employee_status,
            portfolio_link: formData.portfolio_link,
            placement_location: formData.placement_location,
            position: formData.position,
            status: formData.status,
            work_duration: formData.work_duration,
            work_location: formData.work_location,
            weight: formData.weight,
            height: formData.height,
            nik: formData.nik,
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const [profilePhoto, setProfilePhoto] = useState(null);

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
          showMessage("Foto profil berhasil diunggah!");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();

  };
  input.click();
};


  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};



 const handleSave = async () => {
  const token = localStorage.getItem("token"); // ambil token dari localStorage

  if (!token) {
    alert("Token tidak ditemukan. Silakan login ulang.");
    return;
  }

  const form = new FormData();

  // Tambah profile_photo kalau ada
  if (photoFile) {
    form.append("profile_photo", photoFile);
  }

  // Isi semua field dari formData
  form.append("nik", formData.nik);
  form.append("phone_number", formData.phoneNumber);
  form.append("status", formData.status);
  form.append("address", formData.address);
  form.append("gender", formData.gender);
  form.append("age", parseInt(formData.age));
  form.append("height", parseInt(formData.height));
  form.append("weight", parseInt(formData.weight));
  form.append("education", formData.education);
  form.append("bank_account", formData.bankAccount);
  form.append("employee_status", formData.employeeStatus);
  form.append("position", formData.position);
  form.append("work_duration", formData.workDuration);
  form.append("placement_location", formData.workLocation);
  form.append("portfolio_link", `https://${formData.portfolioLink}`);
  form.append("work_experience", "PT. Terbang kesatas"); // sementara hardcode
  form.append("skills", "Keahlian fisik, bela diri, analisis keamanan"); // sementara hardcode
  form.append("grade", "-");

  try {
    const response = await fetch("https://abujapi-proto.ihsanwd10.my.id/api/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Profil berhasil disimpan!");
      console.log("✅ Respon backend:", result);
    } else if (response.status === 422) {
      alert("⚠️ Validasi gagal, cek kembali data yang kamu isi.");
      console.log("❌ Detail error:", result.errors);
    } else {
      alert("❌ Gagal menyimpan profil.");
      console.error(result);
    }
  } catch (err) {
    console.error("❌ Error jaringan:", err);
    alert("❌ Tidak bisa terhubung ke server.");
  }
};

  const handleSave = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    alert("Token tidak ditemukan. Silakan login ulang.");
    return;
  }

  const formDataToSend = new FormData();
  
  // Append semua field
  Object.entries(formData).forEach(([key, value]) => {
    formDataToSend.append(key, value);
  });

  if (photoFile) {
    formDataToSend.append("profile_photo", photoFile);
  }

  try {
    const res = await fetch(`${baseUrl}/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    const result = await res.json();
    if (res.ok) {
      alert("Profil berhasil diperbarui!");
    } else {
      alert("Gagal menyimpan: " + (result.message || "Terjadi kesalahan"));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Terjadi kesalahan jaringan");
  }
};

  const handleCancel = () => {
    if (window.confirm("Yakin ingin membatalkan perubahan?")) {
      window.location.reload();
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/lihat-profil"
                className="flex items-center px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white hover:text-white transition-colors shadow-md"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Profil Karyawan</p>
                <p className="font-semibold text-slate-800">Edit Profile</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Title */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Edit Profil Karyawan</h1>
              <p className="text-slate-600 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Perbarui informasi profil Anda</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Profile & Personal Info */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Profile Photo & Basic Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-semibold text-white">Informasi Dasar</h2>
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
                        Grade: {formData.grade  || "-"}
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
                          {formData.name}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          NIK
                        </label>
                        <p className="text-slate-800 font-semibold">
                          {formData.nik}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                        <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          No HP
                        </label>
                        <p className="text-slate-800 font-semibold">
                          {formData.phone_number}
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          Status
                        </label>
                        <p className="text-emerald-800 font-semibold">
                          {formData.status}
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
                        <p className="text-slate-800">{formData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Jenis Kelamin
                        </p>
                        <p className="text-slate-800">{formData.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Umur
                        </p>
                        <p className="text-slate-800">{formData.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Tinggi / Berat
                        </p>
                        <p className="text-slate-800">
                          {formData.height} / {formData.weight}
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
                        <p className="text-slate-800">{formData.education}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Akun Bank
                        </p>
                        <p className="text-slate-800">
                          {formData.bank_account}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-600">
                          Email
                        </p>
                        <p className="text-slate-800">{formData.email}</p>
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
                    {formData.employee_status}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Jabatan
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {formData.position}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Lama Bekerja
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {formData.work_duration}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <label className="block text-sm font-medium text-slate-600 mb-1 items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Lokasi Penempatan
                  </label>
                  <p className="text-slate-800 font-semibold">
                    {formData.location}
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
                    href={formData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>
                      {formData.portfolio
                        ? formData.portfolio.replace("https://", "")
                        : "-"}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Simpan Perubahan</span>
              </button>
              
              <button
                onClick={handleCancel}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Batal Edit</span>
              </button>
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Status Profil</p>
                  <p className="text-sm text-slate-600">Informasi Terkini</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Kelengkapan</span>
                  <span className="font-medium text-slate-800">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Terakhir Update</span>
                  <span className="font-medium text-slate-800">Hari ini</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Status</span>
                  <span className="font-medium text-emerald-600">Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeDataForm;