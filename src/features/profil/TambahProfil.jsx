import React, { useState } from "react";
import { Camera, ArrowLeft, User, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";
import DataKaryawan from "../../pages/DataKaryawan";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    nik: "",
    phoneNumber: "",
    maritalStatus: "",
    address: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    education: "",
    bankAccount: "",
    employeeStatus: "",
    jobPosition: "",
    workDuration: "",
    workLocation: "",
    portfolioLink: "",
    religion: "",
    nationality: "Indonesia",
    birthPlace: "",
    birthDate: "",
  });

  const [activeModal, setActiveModal] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [workHistory, setWorkHistory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [modalForms, setModalForms] = useState({
    workHistory: { companyName: "", position: "", workPeriod: "" },
    skill: { skillName: "", skillDescription: "" },
    certification: { certificationName: "", certificationYear: "" },
  });
  const [message, setMessage] = useState({
    show: false,
    text: "",
    type: "success",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleModalFormChange = (modalType, field, value) => {
    setModalForms((prev) => ({
      ...prev,
      [modalType]: { ...prev[modalType], [field]: value },
    }));
  };

  const showMessage = (text, type = "success") => {
    setMessage({ show: true, text, type });
    setTimeout(
      () => setMessage({ show: false, text: "", type: "success" }),
      3000
    );
  };

  const openModal = (modalType) => setActiveModal(modalType);
  const closeModal = () => {
    setActiveModal(null);
    setModalForms({
      workHistory: { companyName: "", position: "", workPeriod: "" },
      skill: { skillName: "", skillDescription: "" },
      certification: { certificationName: "", certificationYear: "" },
    });
  };

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

  const addWorkHistory = () => {
    const { companyName, position, workPeriod } = modalForms.workHistory;
    if (!companyName.trim() || !position.trim()) {
      showMessage("Nama perusahaan dan jabatan harus diisi!", "error");
      return;
    }
    setWorkHistory((prev) => [...prev, { companyName, position, workPeriod }]);
    showMessage("Riwayat kerja berhasil ditambahkan!");
    closeModal();
  };

  const addSkill = () => {
    const { skillName, skillDescription } = modalForms.skill;
    if (!skillName.trim()) {
      showMessage("Keahlian harus diisi!", "error");
      return;
    }
    setSkills((prev) => [...prev, { skillName, skillDescription }]);
    showMessage("Keahlian berhasil ditambahkan!");
    closeModal();
  };

  const addCertification = () => {
    const { certificationName, certificationYear } = modalForms.certification;
    if (!certificationName.trim() || !certificationYear) {
      showMessage("Sertifikasi dan tahun diterima harus diisi!", "error");
      return;
    }
    setCertifications((prev) => [
      ...prev,
      { certificationName, certificationYear },
    ]);
    showMessage("Sertifikasi berhasil ditambahkan!");
    closeModal();
  };

  const saveDetailData = () => {
    showMessage("Data detail berhasil disimpan!");
    closeModal();
  };

  const activateFingerprint = () => {
    showMessage("Sistem sidik jari akan diaktifkan");
  };

  const submitForm = () => {
    if (!formData.fullName.trim()) {
      showMessage("Nama karyawan harus diisi!", "error");
      return;
    }
    if (!formData.nik.trim()) {
      showMessage("NIK harus diisi!", "error");
      return;
    }
    console.log("Data karyawan:", formData);
    showMessage("Data karyawan berhasil ditambahkan!");
  };

  const cancelForm = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang."
      )
    ) {
      setFormData({
        employeeId: "",
        fullName: "",
        nik: "",
        phoneNumber: "",
        maritalStatus: "",
        address: "",
        gender: "",
        age: "",
        height: "",
        weight: "",
        education: "",
        bankAccount: "",
        employeeStatus: "",
        jobPosition: "",
        workDuration: "",
        workLocation: "",
        portfolioLink: "",
        religion: "",
        nationality: "Indonesia",
        birthPlace: "",
        birthDate: "",
      });
      setProfilePhoto(null);
      setWorkHistory([]);
      setSkills([]);
      setCertifications([]);
      showMessage("Form dibatalkan");
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
                to="/data-karyawan"
                className="mr-4 text-white hover:bg-blue-700 p-2 rounded-full transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold">TAMBAH PROFIL</h1>
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
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      placeholder="Masukkan ID Karyawan"
                      className="w-full px-3 py-2 border-2 border-blue-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Masukkan Nama Lengkap"
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
                        id="nik"
                        value={formData.nik}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nomor NIK"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        No HP
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Masukkan Nomor HP"
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
                      id="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      placeholder="Masukkan Status"
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
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Masukkan alamat lengkap"
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-sm resize-none"
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
                      id="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Umur"
                      className="w-20 bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-sm"
                    />
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm">Tinggi</span>
                    <span className="mx-2">:</span>
                    <input
                      type="text"
                      id="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Tinggi (cm)"
                      className="w-24 bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-sm"
                    />
                  </div>
                  <div className="flex">
                    <span className="w-24 text-sm">Berat</span>
                    <span className="mx-2">:</span>
                    <input
                      type="text"
                      id="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Berat (kg)"
                      className="w-24 bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-24 text-sm">Pendidikan</label>
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
                      id="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      placeholder="Nama Bank & No. Rekening"
                      className="flex-1 bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 text-sm"
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

              <div className="flex justify-center mt-4">
                <button
                  className="bg-cyan-300 hover:bg-cyan-400 text-blue-900 px-6 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => openModal("detail")}
                >
                  Tambah Data Detail
                </button>
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
                  {workHistory.length === 0 ? (
                    <div className="text-white/70 text-center text-sm">
                      Belum ada riwayat kerja
                    </div>
                  ) : (
                    workHistory.map((work, index) => (
                      <div
                        key={index}
                        className="bg-white/10 rounded p-2 text-white text-sm"
                      >
                        <div className="font-medium">{work.companyName}</div>
                        <div className="text-white/80">{work.position}</div>
                        <div className="text-white/60">{work.workPeriod}</div>
                      </div>
                    ))
                  )}
                </div>
                <button
                  className="w-full mt-4 text-white text-2xl hover:text-cyan-300 transition-colors"
                  onClick={() => openModal("workHistory")}
                >
                  +
                </button>
              </div>

              {/* Skills */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 text-center">
                  Keahlian
                </h3>
                <div className="space-y-3">
                  {skills.length === 0 ? (
                    <div className="text-white/70 text-center text-sm">
                      Belum ada keahlian
                    </div>
                  ) : (
                    skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white/10 rounded p-2 text-white text-sm"
                      >
                        <div className="font-medium">{skill.skillName}</div>
                        <div className="text-white/80">
                          {skill.skillDescription}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button
                  className="w-full mt-4 text-white text-2xl hover:text-cyan-300 transition-colors"
                  onClick={() => openModal("skill")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4 mb-6">
              <h3 className="text-white font-semibold mb-4 text-center">
                Sertifikasi
              </h3>
              <div className="space-y-3">
                {certifications.length === 0 ? (
                  <div className="text-white/70 text-center text-sm">
                    Belum ada sertifikasi
                  </div>
                ) : (
                  certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-white/10 rounded p-2 text-white text-sm"
                    >
                      <div className="font-medium">
                        {cert.certificationName}
                      </div>
                      <div className="text-white/80">
                        Tahun: {cert.certificationYear}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                className="w-full mt-4 text-white text-2xl hover:text-cyan-300 transition-colors"
                onClick={() => openModal("certification")}
              >
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
                  Status Karyawan :
                </label>
                <select
                  id="employeeStatus"
                  value={formData.employeeStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih Status</option>
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
                  id="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleInputChange}
                  placeholder="Masukkan Jabatan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lama Bekerja :
                </label>
                <input
                  type="text"
                  id="workDuration"
                  value={formData.workDuration}
                  onChange={handleInputChange}
                  placeholder="Contoh: 2 Tahun"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lokasi Penempatan :
                </label>
                <input
                  type="text"
                  id="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  placeholder="Masukkan Lokasi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-4 rounded-t-lg">
                <h3 className="text-lg font-bold">Link Portofolio</h3>
              </div>
              <div className="bg-white rounded-b-lg shadow-lg p-6">
                <input
                  type="url"
                  id="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleInputChange}
                  placeholder="https://contoh-portofolio.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-4">
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                onClick={cancelForm}
              >
                BATAL
              </button>
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                onClick={submitForm}
              >
                TAMBAH DATA
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          {/* Work History Modal */}
          {activeModal === "workHistory" && (
            <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Tambah Riwayat Kerja
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Perusahaan :
                  </label>
                  <input
                    type="text"
                    value={modalForms.workHistory.companyName}
                    onChange={(e) =>
                      handleModalFormChange(
                        "workHistory",
                        "companyName",
                        e.target.value
                      )
                    }
                    placeholder="Masukkan nama perusahaan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jabatan :
                  </label>
                  <input
                    type="text"
                    value={modalForms.workHistory.position}
                    onChange={(e) =>
                      handleModalFormChange(
                        "workHistory",
                        "position",
                        e.target.value
                      )
                    }
                    placeholder="Masukkan jabatan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Periode :
                  </label>
                  <input
                    type="text"
                    value={modalForms.workHistory.workPeriod}
                    onChange={(e) =>
                      handleModalFormChange(
                        "workHistory",
                        "workPeriod",
                        e.target.value
                      )
                    }
                    placeholder="Contoh: 2018 - 2022"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
                    onClick={addWorkHistory}
                  >
                    TAMBAH
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium"
                    onClick={closeModal}
                  >
                    BATAL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Skill Modal */}
          {activeModal === "skill" && (
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Tambah Keahlian
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keahlian :
                  </label>
                  <input
                    type="text"
                    value={modalForms.skill.skillName}
                    onChange={(e) =>
                      handleModalFormChange(
                        "skill",
                        "skillName",
                        e.target.value
                      )
                    }
                    placeholder="Masukkan keahlian"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi :
                  </label>
                  <textarea
                    value={modalForms.skill.skillDescription}
                    onChange={(e) =>
                      handleModalFormChange(
                        "skill",
                        "skillDescription",
                        e.target.value
                      )
                    }
                    placeholder="Masukkan deskripsi keahlian"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
                    onClick={addSkill}
                  >
                    TAMBAH
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium"
                    onClick={closeModal}
                  >
                    BATAL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Certification Modal */}
          {activeModal === "certification" && (
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Tambah Sertifikasi
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Sertifikasi :
                  </label>
                  <input
                    type="text"
                    value={modalForms.certification.certificationName}
                    onChange={(e) =>
                      handleModalFormChange(
                        "certification",
                        "certificationName",
                        e.target.value
                      )
                    }
                    placeholder="Masukkan nama sertifikasi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Diterima :
                  </label>
                  <input
                    type="number"
                    value={modalForms.certification.certificationYear}
                    onChange={(e) =>
                      handleModalFormChange(
                        "certification",
                        "certificationYear",
                        e.target.value
                      )
                    }
                    placeholder="2024"
                    min="1900"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
                    onClick={addCertification}
                  >
                    TAMBAH
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium"
                    onClick={closeModal}
                  >
                    BATAL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Detail Modal */}
          {activeModal === "detail" && (
            <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Data Detail Tambahan
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama :
                  </label>
                  <select
                    id="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Pilih Agama</option>
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kewarganegaraan :
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Lahir :
                  </label>
                  <input
                    type="text"
                    id="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleInputChange}
                    placeholder="Masukkan tempat lahir"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir :
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
                    onClick={saveDetailData}
                  >
                    SIMPAN
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium"
                    onClick={closeModal}
                  >
                    BATAL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Message */}
      {message.show && (
        <div
          className={`px-6 py-3 rounded-lg shadow-lg text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{message.text}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeForm;
