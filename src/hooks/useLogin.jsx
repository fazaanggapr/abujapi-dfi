import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../services/LoginService';


export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await loginService.login({ email, password });

      if (result.success) {
        loginService.storeTokens(result.data);
        navigate('/dashboard');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleInputChange,
    handleSubmit
  };
};