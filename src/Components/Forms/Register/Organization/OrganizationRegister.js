import React from "react";
import OrganizationForm from "./OrganizationForm";
import menteeRegPage from "../../../../Images/Employer/Resume-amico.svg";
const OrganizationRegister = () => {
  return (
    <>
      <main>
        <div className="regis_background" id="menteeRegBackground">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4 doneed">
                <div className="iuhieiuihaw_left sticky-top">

                <img
                    style={{ width: "25rem" }}
                    src={menteeRegPage}
                    alt="img"
                  />
                  {/* <h3>
                    Get Access to Interns from
                    <span className="span222">Top Colleges</span>
                  </h3>

                  <p>
                    Connect with bright and motivated students from leading
                    colleges. Our platform bridges the gap between organizations
                    and high-caliber talent. Post your internship opportunities
                    and bring fresh ideas, skills, and innovation into your team
                    from the next generation of professionals. Sign up to unlock
                    talent from premier institutions!
                  </p> */}

                  <h5 className="mt-4 testsize">
                  Get Access to PractyWizards
                  </h5>

                  <ul className="ps-0 mt-3">
                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">Hire Interns who will deliver results not just add numbers</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">Practywiz will manage the entire internship process</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">
                        Post your annual internship requirements
                        </p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">
                        Take your corporate case study to millions
                        </p>
                      </div>
                    </li>
{/* 
                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">
                          <a href="/">Sign Up Now!</a>
                        </p>
                      </div>
                    </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="iuhieiuihaw_right bg-white p-3">
                  <div className="uherrr_text text-center">
                    {/* <h4>Sign Up</h4> */}
                  </div>
                  <OrganizationForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrganizationRegister;
