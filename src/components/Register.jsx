import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_password", password);

    alert("Registration successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="h-full bg-[#0d3551] font-sans m-0 p-0">
      <div className="relative w-full h-screen flex items-center justify-between overflow-hidden">
        {/* Background diagonal */}
        <div className="absolute top-0 left-[40%] w-full h-full bg-[#ff5722] transform -skew-x-12 origin-top-left z-0 hidden md:block"></div>

        {/* Gambar kiri */}
        <div className="flex-1 flex justify-center items-center z-10 md:p-0 p-5">
          <img
            src="public/assets/Door-Person.jpg"
            alt="Person Illustration"
            className="w-[70%] max-w-[400px] h-auto md:w-[70%] w-1/2"
          />
        </div>

        {/* Form Register */}
        <div className="flex-1 flex justify-center items-center z-10 md:p-0 p-5">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-center text-[22px] font-bold text-[#0d3551] mb-8">REGISTER</h2>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', type: 'text', placeholder: 'Enter your name', icon: '👤' },
                { name: 'email', type: 'email', placeholder: 'Enter your email', icon: '📧' },
                { name: 'password', type: 'password', placeholder: 'Enter your password', icon: '🔒' },
                { name: 'confirmPassword', type: 'password', placeholder: 'Confirm password', icon: '✅' }
              ].map((input, idx) => (
                <div className="relative mb-5" key={idx}>
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    value={formData[input.name]}
                    onChange={handleChange}
                    required
                    className="w-full py-[15px] px-[15px] border border-gray-300 rounded-md text-[15px] pr-12"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[18px] text-gray-600">
                    {input.icon}
                  </span>
                </div>
              ))}

              <button
                type="submit"
                className="w-full py-[15px] bg-[#0d3551] text-white border-none rounded-md text-base font-bold cursor-pointer hover:bg-[#133f63] transition-colors"
              >
                Register
              </button>
            </form>
            <div className="text-center mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                click here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
