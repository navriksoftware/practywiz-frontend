import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { ContactUs, Section7 } from "../../Components/Contactus/contact";
import GoToTop from "../../Utils/GoToTop";

const ContactusPage = () => {
  document.title = "Practywiz | Contact Us";
  return (
    <>
      <Navbar />
      <ContactUs />
      {/* <GoogleMap /> */}
      {/* <Section7 /> */}
      <Footer />
      <GoToTop />
    </>
  );
};

export default ContactusPage;
