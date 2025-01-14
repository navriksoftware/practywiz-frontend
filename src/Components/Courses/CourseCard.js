import React from "react";
import Vb4 from "../../Images/Courses/vb4.jpg";
import { Link } from "react-router-dom";
const CourseCard = () => {
  let courseName = "Jumpstart To It Business Analyst";
  return (
    <>
      <div className="col-lg-4">
        <div className="drhuydgfth position-relative overflow-hidden">
          <div className="jgfg">
            <img src={Vb4} alt="" />
          </div>

          <div className="ngdfhgfdg">
            <span className="spn55">ALL LEVELS</span>
            <h4>Jumpstart To It Business Analyst</h4>
            <p>
              <span className="span121">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>
              <span className="spn12">(5.0/3 Rating)</span>
            </p>
            <h3>$39</h3>
            <div className="kjhgdfgfd">
              <span>
                <p>
                  <i className="fa-solid fa-layer-group"></i> 11 Lessons
                </p>
              </span>
              <p className="pl-3">
                <i className="fa-solid fa-user"></i> 107 Students
              </p>
            </div>
          </div>

          <div className="nhjgghhjhjhjg position-absolute">
            <div className="nghjgfg55">
              <div className="kdfhfgfg55">
                <p>Beginner</p>
              </div>
              <div className="mdfhjgbg">
                <h2>Jumpstart To It Business Analyst</h2>
                <p>
                  <span className="span121">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span>(3 Reviews)</span>
                </p>
                <h2>$39</h2>
              </div>
              <div className="jufbgyfr">
                <p>
                  Lorem ipsum dolor sit amet consectur adipisicing elit, sed do
                  eiusmod tempor inc idid unt ut labore et dolore...
                </p>
              </div>
              <div className="kjhgdfgfd2">
                <span>
                  <p>
                    <i className="fa-solid fa-layer-group"></i> 11 Lessons
                  </p>
                </span>
                <p className="pl-3">
                  <i className="fa-solid fa-user"></i> 107 Students
                </p>
              </div>
              <div className="kjghgdg">
                <button>
                  <Link
                    to={
                      "/courses/single-course/Jumpstart-To-It-Business-Analyst"
                    }
                  >
                    ENROLL NOW <i className="fa-solid fa-circle-right"></i>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
