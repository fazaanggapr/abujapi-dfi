import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaDoorOpen } from 'react-icons/fa';

// InputField component dengan password toggle
const InputField = ({ 
  type, 
  name, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  required,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = () => {}
}) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10">
        {icon}
      </div>
      <input
        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full pl-12 pr-12 py-3 
          bg-gray-50 border border-gray-200 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          text-gray-900 placeholder-gray-500
          transition-all duration-200"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg z-10"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

// LoadingDots component
const LoadingDots = () => (
  <div className="flex justify-center items-center py-4">
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  </div>
);

const LoginForm = ({
  formData = { email: '', password: '' },
  onInputChange = () => {},
  onSubmit = (e) => { e.preventDefault(); },
  loading = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputFields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      icon: <FaEnvelope />
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      icon: <FaLock />
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-[90%] max-w-[400px] m-3 border border-white/20">
      {/* Logo/Header */}
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg mb-3">
          <h1 className="text-xl font-bold flex px-2">
            <span className="mr-2 pt-1"><FaDoorOpen/></span> LOGIN
          </h1>
        </div>
        <p className="text-gray-600 text-sm">Masuk ke sistem administrasi</p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Email Pengguna */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <InputField
            type={inputFields[0].type}
            name={inputFields[0].name}
            value={formData[inputFields[0].name]}
            onChange={onInputChange}
            placeholder="Masukkan email Anda"
            icon={inputFields[0].icon}
            required={true}
          />
        </div>

        {/* Password Label */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Kata Sandi
          </label>
          <InputField
            type={inputFields[1].type}
            name={inputFields[1].name}
            value={formData[inputFields[1].name]}
            onChange={onInputChange}
            placeholder="Masukkan kata sandi"
            icon={inputFields[1].icon}
            required={true}
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={togglePasswordVisibility}
          />
        </div>

        {loading ? (
          <LoadingDots />
        ) : (
          <button
            type="submit"
            className="w-full py-3 
              bg-gradient-to-r from-yellow-400 to-yellow-500 
              text-gray-900 font-bold 
              border-2 border-transparent rounded-lg 
              hover:from-yellow-500 hover:to-yellow-500 hover:border-yellow-500
              transition-colors transition-shadow duration-300 ease-in-out
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Login
          </button>
        )}
      </form>

      {/* Register Link */}
      <div className="text-center mt-5">
        <span className="text-gray-600">Pengguna Baru? </span>
        <a href="/register" className="text-blue-700 hover:text-blue-800 font-semibold hover:underline">
          Daftar disini
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
