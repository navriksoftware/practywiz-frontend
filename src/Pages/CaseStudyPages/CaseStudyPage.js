import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CaseStudy from "../../Components/CaseStudy/CaseStudy";
import GoToTop from "../../Utils/GoToTop";
const CaseStudyPage = ({ user, token }) => {
  document.title = "Practywiz | Case Studies";

  return (
    <>
      <Navbar />
      <CaseStudy user={user} token={token} />
      <Footer />
      <GoToTop />
    </>
  );
};

export default CaseStudyPage;
