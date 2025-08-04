// components/LoadingAnimation.js
import React from 'react';

function LoadingAnimation() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
}

export default LoadingAnimation;