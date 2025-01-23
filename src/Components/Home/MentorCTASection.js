import React from "react";
import "./Home.css";
import "./HomeCSS/MentorCTASection.css";
import Csdfsfgdf from "../../Images/Home/csdfsfgdf.png";
import Mkwef from "../../Images/Home/mkwef.png";
import { Link } from "react-router-dom";
import GoToTop from "../../Utils/GoToTop";

const MentorCTASection = () => {
  return (
    <>
      <div className="mentor-cta-section">
        <div className="diuehrr_wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3">
              <div className="mentor-cta-left-content">
                <h2 className="mb-3 mentor-cta-main-text">
                  Join The Mentor Connect Community
                </h2>

                <p className="mentor-cta-sub-text">
                  Whether you're looking to share your expertise or seeking
                  guidance, we're here to make meaningful connections.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cuierr_image position-relative">
                <img
                  src={Csdfsfgdf}
                  alt="line"
                  className="uidghegbr__uerww dieghrytretew_image position-absolute"
                  style={{ width: "25%", zIndex: 0 }}
                />
                <div className="mentor-cta-right-content">
                  <div className="mentor-cta-card">
                    <h2 className="mentor-cta-card-title">Be a Mentor</h2>
                    <div className="mentor-cta-card-content">
                      <div className="mentor-cta-card-feature">
                        <span className="mentor-cta-card-icon">
                          <i class="fa-solid fa-share-nodes"></i>
                        </span>
                        <p>Share your expertise and shape future leaders</p>
                      </div>
                      <div className="mentor-cta-card-feature">
                        <span className="mentor-cta-card-icon">
                          <i class="fa-solid fa-award"></i>
                        </span>
                        <p>
                          Contribute to case studies and Contribute to growth
                        </p>
                      </div>
                      <div className="mentor-cta-card-feature">
                        <span className="mentor-cta-card-icon">
                          <i class="fa-regular fa-calendar"></i>
                        </span>
                        <p>
                          Get opportunity become a Guest Lecturer in Colleges
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        (window.location.href = "/mentor-registration")
                      }
                      className="mentor-cta-card-btn"
                    >
                      Start Mentoring
                    </button>
                  </div>

                  <div className="mentor-cta-card">
                    <h2 className="mentor-cta-card-title">Find a Mentor</h2>
                    <div className="mentor-cta-card-content">
                      <div className="mentor-cta-card-feature">
                        <span className="mentor-cta-card-icon">
                          <i class="fa-solid fa-users"></i>
                        </span>
                        <p>Learn from industry veterans & experts</p>
                      </div>
                      <div className="mentor-cta-card-feature">
                        <span className="mentor-cta-card-icon">
                          <i class="fa-solid fa-bullseye"></i>
                        </span>
                        <p>Get personalized guidance for your career</p>
                      </div>
                      <div className="mentor-cta-card-feature">
                        <span className="mentor-cta-card-icon">
                          <i class="fa-solid fa-sitemap"></i>
                        </span>
                        <p>Access a diverse network of professionals</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        (window.location.href = "/mentee-registration")
                      }
                      className="mentor-cta-card-btn"
                    >
                      Find Your Mentor
                    </button>
                  </div>
                </div>

                <img
                  src={Mkwef}
                  alt="mkwef"
                  className="uidghegbr__uerww duihueirjt_image position-absolute"
                  style={{ width: "25%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoToTop />
    </>
  );
};

export default MentorCTASection;
