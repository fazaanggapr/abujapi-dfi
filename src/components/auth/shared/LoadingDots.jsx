// LoadingDots.jsx (Updated)
import React from 'react';

const LoadingDots = () => {
  return (
    <div className="mt-4 text-gray-600 font-medium flex flex-col items-center">
      <p className="mb-3">Memproses...</p>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" />
        <div
          className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.1s' }}
        />
        <div
          className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        />
      </div>
    </div>
  );
};

export default LoadingDots;
