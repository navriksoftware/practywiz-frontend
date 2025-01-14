import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import About from "../../Components/AboutUs/about";
import GoToTop from "../../Utils/GoToTop";

const AboutusPage = () => {
  document.title = "Practywiz | About Us";

  return (
    <>
      <Navbar />
      <About />
      <Footer />
      <GoToTop />
    </>
  );
};

export default AboutusPage;
