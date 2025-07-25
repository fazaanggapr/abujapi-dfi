import React from "react";
import AuthLayout from "../components/Auth/shared/AuthLayout";
import IllustrationSection from "../components/auth/shared/Illustration";
import RegisterForm from "../components/register_form/RegisterForm";
import ErrorMessage from "../components/Auth/shared/ErrorMessage";
import useRegister from "../hooks/useRegister"; // Menggunakan hook untuk handle registrasi

const Register = () => {
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    clearError
  } = useRegister();

  return (
    <AuthLayout>
      <IllustrationSection
        imageSrc="/assets/Door-Person.png"  // Pastikan ini menggunakan path relatif
        imageAlt="Person Illustration"
      />

      {/* Menampilkan pesan error jika ada */}
      <ErrorMessage message={error} onClose={clearError} />

      {/* Form Register dengan fungsionalitas loading */}
      <div className="w-1/2 flex items-center justify-start z-10 h-full pl-10 min-w-[400px]">
        <RegisterForm
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
    </AuthLayout>
  );
};

export default Register;
