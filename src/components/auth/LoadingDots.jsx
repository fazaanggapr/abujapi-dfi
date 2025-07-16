import React from 'react';

const LoadingDots = () => {
  return (
    <div className="mt-4 text-gray-600 font-medium flex flex-col items-center">
      <p>Loading...</p>
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
          style={{ animationDelay: '0.2s' }}
        />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
    </div>
  );
};

export default LoadingDots;