import React from "react";

const AuthButton = ({ type = "submit", onClick, children, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-[15px] bg-[#0d3551] text-white border-none rounded-md text-base font-bold cursor-pointer hover:bg-[#133f63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default AuthButton;
