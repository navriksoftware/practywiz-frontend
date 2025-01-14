import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import MenteeProfile from "../../Components/Mentee/MenteeDashboard/OtherComponents/MenteeProfile";
import GoToTop from "../../Utils/GoToTop";
const MenteeProfilePage = () => {
  document.title = "Practywiz | Mentee Profile";
  return (
    <>
      <Navbar />
      <MenteeProfile />
      <Footer />
      <GoToTop />
    </>
  );
};

export default MenteeProfilePage;
