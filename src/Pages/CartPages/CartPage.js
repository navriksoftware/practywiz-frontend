import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import CartPage from "../../Components/CaseStudy/Cart/CartPage";
// import Footer from "../../Components/Footer/Footer";
import GoToTop from "../../Utils/GoToTop";
import CaseNavBar from "../../Components/CaseStudy/CaseNavBar/CaseNavBar";

const Cart = ({ user, token }) => {
  return (
    <>
      <Navbar />
      <CaseNavBar />
      <CartPage user={user} token={token} />
      {/* <Footer /> */}
      <GoToTop />
    </>
  );
};

export default Cart;
