import React from "react";
import Navbar from "../../../../Components/Navbar/Navbar";
import Footer from "../../../../Components/Footer/Footer";
import SingleMentorProfile from "../../../../Components/Mentor/AllMentors/SingleMentorProfile/SingleMentorProfile";
import GoToTop from "../../../../Utils/GoToTop";
import SingleMentorPageUpdated from "../../../../Components/Mentor/AllMentors/SingleMentorProfile/SingleMentorPageUpdated";
const SingleMentorProfilePage = () => {
  return (
    <>
      <SingleMentorPageUpdated />
      {/* <Footer /> */}
      <GoToTop />
    </>
  );
};

export default SingleMentorProfilePage;
