import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import InstituteRegister from "../../../Components/Forms/Register/Institute/InstituteRegister";
import GoToTop from "../../../Utils/GoToTop";

const InstituteRegistrationPage = () => {
  document.title = "Practywiz | Institute Register";

  return (
    <>
      <Navbar />
      <InstituteRegister />
      <Footer />
      <GoToTop />
    </>
  );
};

export default InstituteRegistrationPage;
