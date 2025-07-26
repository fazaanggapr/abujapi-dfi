import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
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
      placeholder: 'Name', 
      icon: <FaLock /> 
    },
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
    { 
      name: 'confirmPassword', 
      type: 'password', 
      placeholder: 'Confirm Password', 
      icon: <FaLock /> 
    },
  ];

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-[90%] max-w-[400px] m-3">
      <h2 className="text-center text-[22px] font-bold text-[#0d3551] mb-8">
        REGISTER
      </h2>

      <form onSubmit={onSubmit}>
        {inputFields.map((field, index) => (
          <InputField
            key={index}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={onInputChange}
            placeholder={field.placeholder}
            icon={field.icon}
            required={true}
          />
        ))}

        {loading ? (
          <LoadingDots />
        ) : (
          <button
            type="submit"
            className="w-full py-2 bg-[#0d3551] text-white border-none rounded-md text-base font-bold cursor-pointer hover:bg-[#133f63] transition-colors"
          >
            Register
          </button>
        )}
      </form>

      <div className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here!
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
