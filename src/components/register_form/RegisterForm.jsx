import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaDoorOpen } from 'react-icons/fa';

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
        className="
          w-full pl-12 pr-12 py-2.5 
          bg-gray-50 border border-gray-200 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          text-gray-900 placeholder-gray-500
          transition-all duration-200
        "
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

const RegisterForm = ({
  formData = { name: '', email: '', password: '', confirmPassword: '' },
  onInputChange = () => {},
  onSubmit = (e) => { e.preventDefault(); },
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl w-[90%] max-w-[400px] m-3 border border-white/20">
      {/* Logo/Header */}
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg mb-3">
                <h1 className="text-xl font-bold flex px-2">
                  <span className="mr-2 pt-1"><FaDoorOpen/></span> REGISTER
                </h1>
              </div>
              <p className="text-gray-600 text-sm">Daftar akun baru untuk login</p>
            </div>

      <div onSubmit={onSubmit} className="space-y-4">
        {inputFields.map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-medium mb-1">
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
              showPasswordToggle={field.name === 'password' || field.name === 'confirmPassword'}
              showPassword={field.name === 'password' ? showPassword : showConfirmPassword}
              onTogglePassword={field.name === 'password' ? togglePasswordVisibility : toggleConfirmPasswordVisibility}
            />
          </div>
        ))}

        {loading ? (
          <LoadingDots />
        ) : (
          <button
            type="submit"
            onClick={onSubmit}
            className="
              w-full py-2.5 
              bg-gradient-to-r from-yellow-400 to-yellow-500 
              text-gray-900 font-bold 
              border-2 border-transparent rounded-lg 
              hover:from-yellow-500 hover:to-yellow-500 hover:border-yellow-500
              transition-colors transition-shadow duration-300 ease-in-out
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
              mt-3
            "
          >
            Register
          </button>
        )}
      </div>

      <div className="text-center mt-4">
        <span className="text-gray-600">Sudah punya akun? </span>
        <a href="/login" className="text-blue-700 hover:text-blue-800 font-semibold hover:underline">
          Login disini
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;