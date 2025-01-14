import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PaymentCancellation from "../../Components/Utils/PaymentCancellation";
import GoToTop from "../../Utils/GoToTop";

const PaymentCancPage = () => {
  return (
    <>
      <Navbar />
      <PaymentCancellation />
      <Footer />
      <GoToTop />
    </>
  );
};

export default PaymentCancPage;
