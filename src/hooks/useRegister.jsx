import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/api";

const useRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }
    
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    const { name, email, password, confirmPassword } = formData;

    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        // Success
        alert("Registration successful! Redirecting to login...");
        
        // Save user data if needed
        if (data.token) {
          localStorage.setItem("user_token", data.token);
        }
        localStorage.setItem("user_name", name);
        localStorage.setItem("user_email", email);
        
        navigate("/login");
      } else {
        // Handle server errors
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError("");

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    clearError
  };
};

export default useRegister;
