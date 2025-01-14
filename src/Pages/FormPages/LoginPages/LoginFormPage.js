import React, { useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import LoginForm from "../../../Components/Forms/Login/LoginForm";
import GoToTop from "../../../Utils/GoToTop";

const LoginFormPage = ({ user, token }) => {
  document.title = "Practywiz | Login";
  return (
    <>
      <Navbar />
      <LoginForm user={user} token={token} />
      <Footer />
      <GoToTop />
    </>
  );
};

export default LoginFormPage;
