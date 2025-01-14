import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import SingleCourse from "../../Components/Courses/SingleCourse/SingleCourse";
import GoToTop from "../../Utils/GoToTop";

const SingleCoursePage = () => {
  return (
    <>
      <Navbar />
      <SingleCourse />
      <Footer />
      <GoToTop />
    </>
  );
};

export default SingleCoursePage;
