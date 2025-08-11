import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye } from 'react-icons/fa';
import InputField from '../auth/shared/InputField';
import LoadingDots from '../auth/shared/LoadingDots';
import { FaDoorOpen } from 'react-icons/fa6';

const LoginForm = ({
  formData,
  onInputChange,
  onSubmit,
  loading
}) => {
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
    <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-2xl w-[90%] max-w-[450px] m-3 border border-white/20">
      {/* Logo/Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg mb-4">
          <h1 className="text-2xl font-bold flex px-2"><span className="mr-2 pt-1"><FaDoorOpen/></span> LOGIN</h1>
        </div>
        <p className="text-gray-600 text-sm">Masuk ke sistem administrasi</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Email Pengguna  */}
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
          />
        </div>

        {loading ? (
          <LoadingDots />
        ) : (
          <button
            type="submit"
            className="
            w-full py-4 
            bg-gradient-to-r from-yellow-400 to-yellow-500 
            text-gray-900 font-bold 
            border-2 border-transparent rounded-lg 
            hover:from-white hover:to-white hover:border-yellow-500
            transition-colors transition-shadow duration-300 ease-in-out
            shadow-lg hover:shadow-xl
            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
          ">

            Login
          </button>
        )}
      </form>

      <div className="text-center mt-6">
        <span className="text-gray-600">Pengguna Baru? </span>
        <Link to="/register" className="text-blue-700 hover:text-blue-800 font-semibold hover:underline">
          Daftar disini
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;