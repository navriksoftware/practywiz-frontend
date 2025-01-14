import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SingleInternshipDetails from "../../Components/Employer/Internships/OtherComponents/SingleInternshipDetails";

const InternshipListingPage = () => {
  return (
    <>
      <Navbar />
      <SingleInternshipDetails />
      <Footer />
    </>
  );
};

export default InternshipListingPage;
