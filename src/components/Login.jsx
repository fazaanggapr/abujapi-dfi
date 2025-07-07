import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const LoginComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    // Simulasi login (contoh hardcoded)
    if (
      formData.email === 'chiper@admin.com' &&
      formData.password === 'chiper123'
    ) {
      alert('Login successful! Redirecting to dashboard...');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
<div className="h-screen font-sans bg-[#0d3551] m-0 p-0">
  <div className="relative w-full h-full flex items-center justify-between overflow-hidden">
    {/* Background diagonal orange */}
    <div className="absolute top-0 left-[40%] w-full h-full bg-[#ff5722] transform -skew-x-12 origin-top-left z-0"></div>

    {/* Kiri - Gambar Ilustrasi */}
    <div className="flex-1 flex items-center justify-center z-10 h-full hidden md:flex">
      <div className="w-[80%] max-w-[600px]">
        <img
          src="public/assets/Door-Person.png"
          alt="Ilustrasi Orang Masuk Pintu"
          className="w-full h-auto object-contain m-3 rounded-lg shadow-lg"
        />
      </div>
    </div>

    {/* Kanan - Form Login */}
    <div className="flex-1 flex items-center justify-center z-10 h-full ">
     
      <div className="bg-white p-10 rounded-lg shadow-lg w-[70%] h-[500px] m-3">
        <h2 className="text-center text-[22px] font-bold text-[#0d3551] mb-8">
          ABUJAPI LOGIN
        </h2>

        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue="chiper@gmail.com"
            className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            defaultValue="chiper123"
            className="w-full mb-6 p-3 border border-gray-300 rounded-md"
            required
          />
    <Link
      to="/dashboard"
      className="block w-full bg-[#0d3551] text-white text-center py-3 rounded-md hover:bg-[#ff5722]/90 transition-colors duration-200 shadow-md hover:shadow-lg font-semibold hover:text-white"
    >
      Login
    </Link>
        </form>

<div className="text-center mt-4">
  Don't have an account?{" "}
  <Link to="/register" className="text-blue-600 hover:underline">
    click here!
  </Link>
</div>

        </div>
      </div>
    </div>
  </div>
);
};

export default LoginComponent;
