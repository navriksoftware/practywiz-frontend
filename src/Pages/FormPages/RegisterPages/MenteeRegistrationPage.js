import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import MenteeRegistration from "../../../Components/Forms/Register/Mentee/MenteeStepForm";
import GoToTop from "../../../Utils/GoToTop";

const MenteeRegistrationPage = () => {
  document.title = "Practywiz | Mentee Register";

  return (
    <>
      <Navbar />
      <MenteeRegistration />
      <Footer />
      <GoToTop />
    </>
  );
};

export default MenteeRegistrationPage;
