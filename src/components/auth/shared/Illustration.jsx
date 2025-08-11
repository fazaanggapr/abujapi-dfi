import React from 'react';

const IllustrationSection = () => {
  return (
    <div className="w-1/2 flex flex-col items-center justify-center z-10 h-full hidden lg:flex">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          ABUJAPI<span className="text-yellow-400"> SECURITY</span>
        </h1>
        <p className="text-2xl text-white/90 font-light mb-2">
          Administration System
        </p>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
      </div>

      {/* Company Logo */}
      <div className="w-[60%] max-w-[300px] mb-8">
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="bg-white rounded-xl p-6 flex items-center justify-center">
            <img src="/assets/logo-abujapi.png" alt="Abujapi Logo" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-white/70 text-sm text-center">
        <p>Copyright © 2025 Digital Forte Indonesia</p>
      </div>
    </div>
  );
};

export default IllustrationSection;
