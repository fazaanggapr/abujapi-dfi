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
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full py-3 px-4 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
        {icon}
      </span>
    </div>
  );
};

export default InputField;