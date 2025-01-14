import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import AllCourses from "../../Components/Courses/AllCourses";
import GoToTop from "../../Utils/GoToTop";
const AllCoursePage = () => {
  return (
    <>
      <Navbar />
      <AllCourses />
      <Footer />
      <GoToTop />
    </>
  );
};

export default AllCoursePage;
