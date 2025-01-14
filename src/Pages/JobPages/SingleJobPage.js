import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Section7 } from "../../Components/Contactus/contact";
import SingleJob from "../../Components/Jobs/SingleJob/SingleJob";
import GoToTop from "../../Utils/GoToTop";

const SingleJobPage = () => {
  return (
    <>
      <Navbar />
      <SingleJob />
      <Section7 />
      <Footer />
      <GoToTop />
    </>
  );
};

export default SingleJobPage;
