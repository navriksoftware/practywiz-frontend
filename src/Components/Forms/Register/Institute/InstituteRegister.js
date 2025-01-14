import React from "react";
import InstituteForm from "./InstituteForm";

const InstituteRegister = () => {
  return (
    <>
      <main>
        <div className="regis_background " id="menteeRegBackground">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4 doneed">
                <div className="iuhieiuihaw_left sticky-top">
                  <h3>
                    Grow Your Professional Career with
                    <span className="span222">Top-Rated</span> Mentors
                  </h3>

                  <p>
                    Join us to upgrade your professional career with our
                    mentor’s guidance. We provide a personalised training
                    approach to improve your project management skills. Master
                    the skill to work under pressure on various projects within
                    tight deadlines. At Practiwiz we have courses for working
                    professionals, MBA students, and aspiring IT business
                    analysts. Hurry up and reserve your mentorship className
                    today.
                  </p>

                  <h5 className="mt-4">Benefits of Our Mentorship Course:</h5>

                  <ul className="ps-0 mt-3">
                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Self-paced training</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Flexible timing and scheduling</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">
                          Career guidance from experienced mentors
                        </p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Expert advice and guidance</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">
                          <a href="/">Sign Up Now!</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="iuhieiuihaw_right bg-white p-3">
                  <div className="uherrr_text text-center">
                    <h4>Sign up</h4>
                  </div>
                  <InstituteForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default InstituteRegister;
