import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Tambahkan header Authorization kalau pakai token (opsional)
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: confirmPassword
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Berhasil register
      alert("Registration successful! Redirecting to login...");
      // Simpan data jika diperlukan
      localStorage.setItem("user_name", name);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_token", data.token); // jika ada token
      navigate("/login");
    } else {
      // Tampilkan pesan error dari server
      alert(data.message || "Registration failed.");
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  }
};


  const inputIcons = {
    name: <FaUser />,
    email: <FaEnvelope />,
    password: <FaLock />,
    confirmPassword: <FaCheckCircle />
  };

  return (
    <div className="h-screen font-sans bg-[#0d3551] m-0 p-0">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* Background diagonal seperti login */}
        <div className="absolute top-0 left-[55%] w-full h-full bg-[#ff5722] transform -skew-x-12 origin-top-left z-0 hidden md:block"></div>

        {/* Gambar kiri seperti login */}
        <div className="w-1/2 flex items-center justify-end z-10 h-full pr-20">
          <div className="w-[80%] max-w-[450px]">
            <img
              src="assets/Door-Person.png"
              alt="Person Illustration"
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Form kanan */}
        <div className="w-1/2 flex items-center justify-start z-10 h-full pl-10">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[90%] max-w-[400px] m-3">
            <h2 className="text-center text-[22px] font-bold text-[#0d3551] mb-8">REGISTER</h2>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', type: 'text', placeholder: 'Enter your name' },
                { name: 'email', type: 'email', placeholder: 'Enter your email' },
                { name: 'password', type: 'password', placeholder: 'Enter your password' },
                { name: 'confirmPassword', type: 'password', placeholder: 'Confirm password' }
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
                    {inputIcons[input.name]}
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
              <Link to="/login" className="text-blue-600 hover:underline">click here!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
