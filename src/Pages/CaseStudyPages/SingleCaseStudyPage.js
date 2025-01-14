import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SingleCaseStudy from "../../Components/CaseStudy/SingleCaseStudy/SingleCaseStudy.jsx";
import GoToTop from "../../Utils/GoToTop.js";
const SingleCaseStudyPage = ({ user, token }) => {
  document.title = "Practywiz | Case study";

  return (
    <>
      <Navbar />
      <SingleCaseStudy user={user} token={token} />
      <Footer />
      <GoToTop />
    </>
  );
};

export default SingleCaseStudyPage;
