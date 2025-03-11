import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import MentorUpdatedForm from "../../../Components/Forms/Register/MentorUpdatedReg/MentorRegFrom";
import GoToTop from "../../../Utils/GoToTop";
const MentorUpdatedRegistrationPage = () => {
  document.title = "Practywiz | Mentor Registration";
  return (
    <>
      <Navbar />
      <MentorUpdatedForm />
      <Footer />
      <GoToTop />
    </>
  );
};

export default MentorUpdatedRegistrationPage;
