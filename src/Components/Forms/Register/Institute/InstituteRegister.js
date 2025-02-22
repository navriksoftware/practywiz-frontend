import React from "react";
import InstituteForm from "./InstituteForm";
import institute from "../../../../Images/Institute/college class-amico.svg";
const InstituteRegister = () => {
  return (
    <>
      <main>
        <div className="regis_background " id="menteeRegBackground">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4 doneed">
                <div className="iuhieiuihaw_left sticky-top">
                  <img
                    style={{ width: "25rem" }}
                    src={institute}
                    alt="img"
                  />

                  <h5 className="mt-4 testsize">Register your Institute to develop your students into Practywizards</h5>

                  <ul className="ps-0 mt-3">
                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Access to thousands of Industry Mentors</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Internships with Corporates</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">
                          Case Studies
                        </p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">Access to Avega, AI based Case assessment tool</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>

                        <p className="mb-0">
                          <p>Practical Experiential Training Programs</p>
                        </p>
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
