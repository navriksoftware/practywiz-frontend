import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import GoToTop from "../../../Utils/GoToTop";
import OrganizationRegister from "../../../Components/Forms/Register/Organization/OrganizationRegister";

const EmployerRegistrationPage = () => {
  document.title = "Practywiz | Institute Register";

  return (
    <>
      <Navbar />
      <OrganizationRegister />
      <Footer />
      <GoToTop />
    </>
  );
};

export default EmployerRegistrationPage;
