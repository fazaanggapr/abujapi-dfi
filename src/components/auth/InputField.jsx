import React from 'react';

const InputField = ({ 
  type, 
  name, 
  value, 
  onChange, 
  placeholder, 
  icon, 
  required = false 
}) => {
  return (
    <div className="relative mb-6">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-[18px]">
        {icon}
      </span>
    </div>
  );
};

export default InputField;