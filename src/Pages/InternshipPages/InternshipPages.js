import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Internships from "../../Components/Employer/Internships/OtherComponents/Internships";
const InternshipPages = () => {
  return (
    <>
      <Navbar />
      <Internships title={"Internships"} />
      <Footer />
    </>
  );
};

export default InternshipPages;
