import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import InternshipListing from "../../Components/Employer/Internships/OtherComponents/InternshipListing";
const InternshipListingPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-8 px-4">
        <InternshipListing />
      </div>
      <Footer />
    </>
  );
};

export default InternshipListingPage;
