import React from "react";
import BusinessMentor from "../../../Components/Mentor/Businessmentor/BusinessMentor";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import GoToTop from "../../../Utils/GoToTop";

const BusinessMentorsPage = () => {
  return (
    <>
      <Navbar />
      <BusinessMentor />
      <Footer />
      <GoToTop />
    </>
  );
};

export default BusinessMentorsPage;
