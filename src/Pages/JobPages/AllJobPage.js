import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
// import AllJobs from "../../Components/Jobs/AllJobs";
// import { Section7 } from "../../Components/Contactus/contact";
import Internships from "../../Components/Employer/Internships/OtherComponents/Internships";

const AllJobPage = () => {
  return (
    <>
      <Navbar />
      {/* <AllJobs /> */}
      {/* <Section7 /> */}
      <Internships title="jobs" />
      <Footer />
    </>
  );
};

export default AllJobPage;
