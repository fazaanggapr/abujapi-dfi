import React from "react";
import { Link } from "react-router-dom";

const AuthLink = ({ to, text, linkText }) => {
  return (
    <div className="text-center mt-4">
      {text}{' '}
      <Link to={to} className="text-blue-600 hover:underline">
        {linkText}
      </Link>
    </div>
  );
};

export default AuthLink;