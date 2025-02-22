import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
// import AllCourses from "../../Components/Courses/AllCourses";
import GoToTop from "../../Utils/GoToTop";
import AllCourse from "../../Components/Courses/AllCourse.jsx";
const AllCoursePage = () => {
  return (
    <>
      <Navbar />
      <AllCourse />
      <Footer />
      <GoToTop />
    </>
  );
};

export default AllCoursePage;
