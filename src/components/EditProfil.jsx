import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, ArrowLeft, User, Fingerprint } from "lucide-react";

const EmployeeDataForm = () => {
  const [formData, setFormData] = useState({
    id: "123456789101",
    fullName: "Inukai Atsuhiro",
    nik: "10380801075",
    phoneNumber: "0899-8877-6621",
    status: "Menikah",
    address:
      "Perumahan Isekai, Jl. Mandiri RT 02/RW 05, No. 666, Kab. No.646, Cibinong, Sukahati",
    gender: "Laki-laki",
    age: 30,
    height: "200 cm",
    weight: "71 kg",
    education: "S1",
    bankAccount: "BCA ••••••••••••••••",
    employeeStatus: "Aktif",
    position: "Karyawan",
    workDuration: "5 Tahun",
    workLocation: "Jakarta",
    portfolioLink: "portofolio-inukai-atsuhiro.vercel.app",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    alert("Data akan disimpan!");
  };

  const handleCancel = () => {
    if (window.confirm("Yakin ingin membatalkan perubahan?")) {
      window.location.reload();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
       <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/lihat-profil" // ganti dengan path tujuan kamu
                className="mr-4 text-white bg-blue-700 p-2 rounded-full transition transform hover:-translate-y-1"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>

              <h1 className="text-xl font-bold">EDIT PROFIL</h1>
            </div>
          </div>
        </div>

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

                {/* Personal Info Form */}
                <div className="flex-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIK
                      </label>
                      <input
                        type="text"
                        name="nik"
                        value={formData.nik}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        No HP
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Information Card */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 text-white mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-24 text-sm">Alamat</span>
                    <span className="mx-2">:</span>
                    <div className="flex-1">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-sm"
                        rows="3"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 text-sm">Jenis Kelamin</label>
                    <span className="mx-2">:</span>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="bg-white/20 border border-white/30 rounded px-2 py-1 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-2/3"
                    >
                      <option value="" className="text-gray-500">
                        Pilih Jenis Kelamin
                      </option>
                      <option
                        value="Laki-laki"
                        className="bg-white text-gray-800"
                      >
                        Laki-laki
                      </option>
                      <option
                        value="Perempuan"
                        className="bg-white text-gray-800"
                      >
                        Perempuan
                      </option>
                    </select>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm">Umur</span>
                    <span className="mx-2">:</span>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-20 bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm"
                    />
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm">Tinggi</span>
                    <span className="mx-2">:</span>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-24 bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm"
                    />
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm">Berat</span>
                    <span className="mx-2">:</span>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-24 bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm"
                    />
                  </div>
                 <div className="flex items-center">
                    <label className="w-24 text-sm">
                      Pendidikan 
                    </label>
                    <span className="mx-2">:</span>
                    <select
                      id="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="bg-white/20 border border-white/30 rounded px-2 py-1 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-2/3"
                    >
                      <option value="" className="text-gray-500">
                        Pilih Pendidikan
                      </option>
                      <option value="SD" className="bg-white text-gray-800">
                        SD
                      </option>
                      <option value="SMP" className="bg-white text-gray-800">
                        SMP
                      </option>
                      <option value="SMA" className="bg-white text-gray-800">
                        SMA
                      </option>
                      <option value="D3" className="bg-white text-gray-800">
                        D3
                      </option>
                      <option value="S1" className="bg-white text-gray-800">
                        S1
                      </option>
                      <option value="S2" className="bg-white text-gray-800">
                        S2
                      </option>
                      <option value="S3" className="bg-white text-gray-800">
                        S3
                      </option>
                    </select>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm">Akun Bank</span>
                    <span className="mx-2">:</span>
                    <input
                      type="text"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      className="flex-1 bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm"
                    />
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
                  Riwayat kerja
                </h3>
                <div className="space-y-3">
                  {/* Riwayat kerja item */}
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="text-white text-sm">
                      <div className="font-medium">PT. Terbang kesatas</div>
                      <div className="text-white/80">Junior Security</div>
                      <div className="text-white/60 text-xs">2018 - 2019</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="text-white text-sm">
                      <div className="font-medium">PT. Terbang kesatas</div>
                      <div className="text-white/80">Senior Security</div>
                      <div className="text-white/60 text-xs">2019 - 2022</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="text-white text-sm">
                      <div className="font-medium">PT. Terbang kesatas</div>
                      <div className="text-white/80">Junior Security</div>
                      <div className="text-white/60 text-xs">2018 - 2019</div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 text-white text-2xl bg-blue-800">
                  +
                </button>
              </div>

              {/* Skills */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 text-center">
                  Keahlian
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="text-white text-sm">
                      <div className="font-medium">Keahlian fisik</div>
                      <div className="text-white/80 text-xs">
                        Berdiskusi tentang masalah perkembangan zaman terkait
                        cyber, keamanan, hacker dll.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="text-white text-sm">
                      <div className="font-medium">Keahlian fisik</div>
                      <div className="text-white/80 text-xs">
                        Menganalisis resiko keamanan pada area kantor dan gedung
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="text-white text-sm">
                      <div className="font-medium">Keahlian fisik</div>
                      <div className="text-white/80 text-xs">
                        Mengoperasikan alat komunikasi, bela diri, surveillance.
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 text-white text-2xl bg-blue-800">
                  +
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4 text-center">
                Sertifikasi
              </h3>
              <div className="flex justify-between items-center">
                <div className="text-white text-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs">
                    Garda Madya
                    <br />
                    2015
                  </div>
                </div>
                <div className="flex-1 h-0.5 bg-orange-500 mx-2"></div>
                <div className="text-white text-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs">
                    Garda Madya
                    <br />
                    2015
                  </div>
                </div>
                <div className="flex-1 h-0.5 bg-orange-500 mx-2"></div>
                <div className="text-white text-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs">
                    Garda Madya
                    <br />
                    2015
                  </div>
                </div>
                <div className="flex-1 h-0.5 bg-orange-500 mx-2"></div>
                <div className="text-white text-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs">
                    Garda Madya
                    <br />
                    2015
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-white text-2xl bg-blue-800">
                +
              </button>
            </div>
          </div>

          {/* Right Column - Work Data */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-bold">DATA PEKERJAAN</h2>
            </div>

            <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status karyawan :
                </label>
                <select
                  name="employeeStatus"
                  value={formData.employeeStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jabatan :
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lama bekerja :
                </label>
                <input
                  type="text"
                  name="workDuration"
                  value={formData.workDuration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lokasi penempatan :
                </label>
                <input
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg">
                <h3 className="text-lg font-bold">Link portofolio</h3>
              </div>
              <div className="bg-white rounded-b-lg shadow-lg p-6">
                <input
                  type="url"
                  name="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col space-y-4">
              <button
                onClick={handleSave}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                SIMPAN EDIT
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                BATAL EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDataForm;
