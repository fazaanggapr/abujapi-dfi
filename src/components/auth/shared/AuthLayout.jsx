import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen font-sans bg-[#0d3551] m-0 p-0">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background diagonal orange */}
        <div className="absolute top-0 left-[55%] w-full h-full bg-[#ff5722] transform -skew-x-12 origin-top-left z-0"></div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;