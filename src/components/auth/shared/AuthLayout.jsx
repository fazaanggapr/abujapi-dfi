import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen font-sans bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 m-0 p-0 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-lg transform rotate-12"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/15 rounded-lg transform -rotate-12"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 border border-white/10 rounded-lg transform rotate-45"></div>
      </div>
      
      <div className="relative w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;