import React from "react";
import AuthLayout from "../components/auth/shared/AuthLayout";
import IllustrationSection from "../components/auth/shared/Illustration";
import RegisterForm from "../components/register_form/RegisterForm";
import ErrorMessage from "../components/auth/shared/ErrorMessage";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const { formData, isLoading, error, handleChange, handleSubmit, clearError } =
    useRegister();

  return (
    <AuthLayout>
      <IllustrationSection
        imageSrc="/assets/Door-Person.png"
        alt="Ilustrasi Gedung"
      />

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center z-10 h-full px-4">
        {/* Error message */}
        {error && (
          <div className="w-full max-w-[450px] mb-4">
            <ErrorMessage message={error} onClose={clearError} />
          </div>
        )}
        
        <RegisterForm
          formData={formData}
          onInputChange={handleChange}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
      </div>
    </AuthLayout>
  );
};

export default Register;