import React from "react";
import MentorExpertList from "../../../Components/Mentor/NavbarMentors/MentorExpertList";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import { Section7 } from "../../../Components/Contactus/contact";
import GoToTop from "../../../Utils/GoToTop";

const MentorExpertListPage = () => {
  document.title = "Practywiz | Mentor Connect";
  return (
    <>
      <Navbar />
      <MentorExpertList />
      <Section7 />
      <Footer />
      <GoToTop />
    </>
  );
};

export default MentorExpertListPage;
