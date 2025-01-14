import React from "react";
import Pic1 from "../../Images/Home/pic1.png";
import Pic2 from "../../Images/Home/pic2.png";
import Pic3 from "../../Images/Home/pic3.png";
import Pic4 from "../../Images/Home/pic4.png";
import Pic5 from "../../Images/Home/pic5.png";
import Pic6 from "../../Images/Home/pic6.png";
import "./Home.css";
const Section4 = () => {
  return (
    <>
      <div className="section4 section-hor-gap">
        <div className="container py-5">
          <div className="bghfdg">
            <h2>HOW MENTOR CONNECT MAKES A DIFFERENCE</h2>
          </div>

          <div className="diherrr_content text-center mt-4">
            <h3>
              <span>For Colleges</span>
            </h3>

            <div className="ihdiuherr mt-4">
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <div className="diuehr_box p-3">
                    <div className="dihuiehr_circle">
                      <img src={Pic1} alt="pic1" />
                    </div>

                    <h4>Access to Alumni & Non-Alumni Registered Mentors</h4>
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className="diuehr_box p-3">
                    <div className="dihuiehr_circle">
                      <img src={Pic2} alt="pic2" />
                    </div>

                    <h4>Topic Specific Guest Lectures</h4>
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className="diuehr_box p-3">
                    <div className="dihuiehr_circle">
                      <img src={Pic3} alt="pic3" />
                    </div>

                    <h4>Only Mentors with 10 plus years of experience</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="diherrr_content text-center mt-4">
            <h3>
              <span>For Students & Professional</span>
            </h3>

            <div className="ihdiuherr mt-4">
              <div className="row">
                <div className="col-lg-4 mb-3">
                  <div className="diuehr_box p-3">
                    <div className="dihuiehr_circle">
                      <img src={Pic4} alt="pic4" />
                    </div>

                    <h4>One-On-One Mentor Sessions</h4>
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className="diuehr_box p-3">
                    <div className="dihuiehr_circle">
                      <img src={Pic5} alt="pic5" />
                    </div>

                    <h4>AI Based Mentor Matching</h4>
                  </div>
                </div>

                <div className="col-lg-4 mb-3">
                  <div className="diuehr_box p-3">
                    <div className="dihuiehr_circle">
                      <img src={Pic6} alt="pic6" />
                    </div>

                    <h4>Session Certificate for Resume</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section4;
