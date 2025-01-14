import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import RegisterForm from "../../../Components/Forms/Register/Mentor/MentorStepForm";
import GoToTop from "../../../Utils/GoToTop";

const RegisterFormPage = () => {
  document.title = "Practywiz | Mentor Register";
  return (
    <>
      <Navbar />
      <RegisterForm />
      <Footer />
      <GoToTop />
    </>
  );
};

export default RegisterFormPage;
