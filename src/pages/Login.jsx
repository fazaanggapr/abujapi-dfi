import React from 'react';
import AuthLayout from "../components/auth/shared/AuthLayout";
import IllustrationSection from "../components/auth/shared/Illustration";
import LoginForm from "../components/login_form/LoginForm";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { formData, loading, handleInputChange, handleSubmit } = useLogin();

  return (
    <AuthLayout>
      <IllustrationSection
        imageSrc="/assets/Door-Person.png"
        alt="Ilustrasi Gedung"
      />
      
      <div className="w-full lg:w-1/2 flex items-center justify-center z-10 h-full px-4">
        <LoginForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </AuthLayout>
  );
};

export default Login;