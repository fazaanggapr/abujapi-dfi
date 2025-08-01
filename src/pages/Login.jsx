import React from 'react';
import AuthLayout from "../components/auth/shared/AuthLayout";
import IllustrationSection from "../components/auth/shared/Illustration";
import LoginForm from "../components/login_form/LoginForm";
import { useLogin } from "../hooks/useLogin";

const LoginComponent = () => {
  const { formData, loading, handleInputChange, handleSubmit } = useLogin();

  return (
    <AuthLayout>
      <IllustrationSection 
        imageSrc="/assets/Door-Person.png"
        alt="Ilustrasi Orang Masuk Pintu"
      />
      
      <div className="w-1/2 flex items-center justify-start z-10 h-full pl-10 min-w-[400px]">
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

export default LoginComponent;

