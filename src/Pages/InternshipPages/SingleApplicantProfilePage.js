import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ApplicantProfile from "../../Components/Employer/Internships/OtherComponents/SingleApplicantProfile";

const SingleApplicantProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-6 px-5">
        <ApplicantProfile />
      </div>
      <Footer />
    </>
  );
};

export default SingleApplicantProfilePage;
