import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import HomePageBanner from "../../Components/Home/HomePageBanner";
import Section2 from "../../Components/Home/Section2";
import Section3 from "../../Components/Home/Section3";
import Section4 from "../../Components/Home/Section4";
import Section5 from "../../Components/Home/Section5";
import Section6 from "../../Components/Home/Section6";
import Section7 from "../../Components/Home/Section7";

const Homepage = () => {
  document.title = "Practywiz | Home";
  return (
    <>
      <Navbar />
      <HomePageBanner />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      {/* / <Section6 /> */}
      <Section7 />
      <Footer />
    </>
  );
};

export default Homepage;
