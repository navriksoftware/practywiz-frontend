import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import GoToTop from "../../Utils/GoToTop";
// import OrganizationRegister from "../../../Components/Forms/Register/Orgenization/OrgenizationRegister";
import OrganizationRegistration from "../../Components/Forms/Register/Organization/OrganizationRegister2";

const OrganizationRegistrationPage2 = () => {
  document.title = "Practywiz | Organization Register";

  return (
    <>
      <Navbar />
      <OrganizationRegistration />
      <Footer />
      <GoToTop />
    </>
  );
};

export default OrganizationRegistrationPage2;
