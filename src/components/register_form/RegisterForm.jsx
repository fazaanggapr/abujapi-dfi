import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import InputField from '../auth/shared/InputField';
import LoadingDots from '../auth/shared/LoadingDots';

const RegisterForm = ({
  formData,
  onInputChange,
  onSubmit,
  loading,
}) => {
  const inputFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Nama Lengkap',
      icon: <FaUser />,
      label: 'Nama Lengkap'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      icon: <FaEnvelope />,
      label: 'Email'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Kata Sandi',
      icon: <FaLock />,
      label: 'Kata Sandi'
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Konfirmasi Kata Sandi',
      icon: <FaLock />,
      label: 'Konfirmasi Kata Sandi'
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-[90%] max-w-[450px] m-3 border border-white/20">
      {/* Logo/Header */}
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg mb-4">
          <h1 className="text-2xl font-bold">REGISTER</h1>
        </div>
        <p className="text-gray-600 text-sm">Daftar akun baru untuk login</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {inputFields.map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-medium mb-2">
              {field.label}
            </label>
            <InputField
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={onInputChange}
              placeholder={field.placeholder}
              icon={field.icon}
              required={true}
            />
          </div>
        ))}

        {loading ? (
          <LoadingDots />
        ) : (
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 border-none rounded-lg text-base font-bold cursor-pointer hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg mt-4"
          >
            Register
          </button>
        )}
      </form>

      <div className="text-center mt-4">
        <span className="text-gray-600">Sudah punya akun? </span>
        <Link to="/login" className="text-blue-700 hover:text-blue-800 font-semibold hover:underline">
          Login disini
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;