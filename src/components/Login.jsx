import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const baseUrl = import.meta.env.VITE_API_URL;
const LoginComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const [loading, setLoading] = useState(false);
  const LoadingDots = () => (
    <div className="mt-4 text-gray-600 font-medium flex flex-col items-center">
      <p>Loading...</p>
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
          style={{ animationDelay: '0.2s' }}
        />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
    </div>
  );

 const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  setLoading(true); 

  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('token_type', data.token_type);
      navigate('/dashboard');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred. Please try again.');
  } finally {
    setLoading(false); // AKHIRI LOADING
  }
};


  const inputFields = [
    { name: 'email', type: 'email', placeholder: 'Email', icon: <FaEnvelope /> },
    { name: 'password', type: 'password', placeholder: 'Password', icon: <FaLock /> },
  ];

  return (
    <div className="h-screen font-sans bg-[#0d3551] m-0 p-0">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background diagonal orange */}
        <div className="absolute top-0 left-[55%] w-full h-full bg-[#ff5722] transform -skew-x-12 origin-top-left z-0"></div>

        {/* Kiri - Gambar Ilustrasi */}
        <div className="w-1/2 flex items-center justify-end z-10 h-full pr-20 hidden md:flex">
          <div className="w-[80%] max-w-[450px]">
            <img
              src="/assets/Door-Person.png"
              alt="Ilustrasi Orang Masuk Pintu"
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Kanan - Form Login */}
        <div className="w-1/2 flex items-center justify-start z-10 h-full pl-10 min-w-[400px]">

          <div className="bg-white p-10 rounded-lg shadow-lg w-[90%] max-w-[400px] m-3">
            <h2 className="text-center text-[22px] font-bold text-[#0d3551] mb-8">ADMIN LOGIN</h2>

            <form onSubmit={handleSubmit}>
              {inputFields.map((field, index) => (
                <div className="relative mb-6" key={index}>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-md"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-[18px]">
                    {field.icon}
                  </span>
                </div>
              ))}

              {loading ? (
                      <LoadingDots />
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="w-full py-2 bg-[#0d3551] text-white border-none rounded-md text-base font-bold cursor-pointer hover:bg-[#133f63] transition-colors"
                      >
                        Login
                      </button>
                    )}

            </form>

            <div className="text-center mt-4">
              Don't have an account?{' '}
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
