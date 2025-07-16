import React from 'react';

const IllustrationSection = ({ imageSrc, alt }) => {
  return (
    <div className="w-1/2 flex items-center justify-end z-10 h-full pr-20 hidden md:flex">
      <div className="w-[80%] max-w-[450px]">
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default IllustrationSection;