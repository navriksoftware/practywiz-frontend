import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import GoToTop from "../../Utils/GoToTop";
import AvegaLanding from "../../Components/AvegaLanding/AvegaLanding";

const AvegaLandingPage = () => {
  document.title = "Practywiz | Avega";

  return (
    <>
      <Navbar />
      <AvegaLanding />
      <Footer />
      <GoToTop />
    </>
  );
};

export default AvegaLandingPage;
