import React from "react";
import "./allcourse.css";
import CourseCard from "./CourseCard";
const AllCourses = () => {
  return (
    <>
      <div className="aslkhghj2">
        <div className="jbbhvf55">
          <div className="container-fluid px-5">
            <div className="jgfgfg">
              <h2>All Courses</h2>
              <p>
                Home <i className="fa-solid fa-greater-than"></i> All Courses
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="kjfghdgvfgfghfh">
        <div className="container-fluid px-5">
          <div className="jdfhygdff">
            <div className="row align-items-center">
              <div className="col-lg-9">
                <div className="kdrhgjddf">
                  <h5 className="mb-0">
                    <b>Showing 10 Courses</b>
                  </h5>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="nhjfg position-relative">
                  <input
                    className="form-control"
                    placeholder="What are you interested in?.."
                  />

                  <i className="fa-solid fa-2x fa-circle-right position-absolute"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="kjfhhreghft">
        <div className="container-fluid px-5">
          <div className="uikjghfh">
            <div className="row">
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCourses;
