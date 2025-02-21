import React, { useState } from "react";
import "../Mentee/menteeregistration.css";
import "../Mentee/MenteeReg.css";
import mimgRemovebg from "../../../../Images/Mentors/Seminar-pana.svg";
import "./MentroTest.css";
import MentorUpdatedForm from "./MentorUpdatedForm";

const MentorRegFrom = () => {
  return (
    <>
      <main>
        <div
          className="regis_background regis_background2"
          id="menteeRegBackground"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4 doneed">
                <div className="iuhieiuihaw_left sticky-top">
                  <img
                    style={{ width: "30rem" }}
                    src={mimgRemovebg}
                    alt=""
                  />
                  <h4 className="mt-4 testsize">
                    Register as a Mentor to start your Practywizard journey
                  </h4>

                  <ul className="ps-0 mt-3">
                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0"> Share your knowledge and experience</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0"> Provide your convenient time for Mentees appointments</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">
                          Author case studies and get paid
                        </p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Access guest lecturer opportunities</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="iuhieiuihaw_right bg-white p-3">
                  {/* <div className="uherrr_text text-center">
                    <h4>Sign up</h4>
                  </div> */}

                  <MentorUpdatedForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MentorRegFrom;
