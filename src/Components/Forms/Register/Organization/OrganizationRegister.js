import React from "react";
import OrganizationForm from "./OrganizationForm";

const OrganizationRegister = () => {
  return (
    <>
      <main>
        <div className="regis_background" id="menteeRegBackground">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4 doneed">
                <div className="iuhieiuihaw_left sticky-top">
                  <h3>
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
                  </p>

                  <h5 className="mt-4">
                    Benefits of Recruiting Through Our Platform:
                  </h5>

                  <ul className="ps-0 mt-3">
                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">Talent from leading universities</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">Streamlined application process</p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">
                          Tailored for diverse skills and industries
                        </p>
                      </div>
                    </li>

                    <li className="mb-3">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-circle-check"></i>
                        <p className="mb-0">
                          Engage top talent with minimal effort
                        </p>
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
                    <h4>Sign Up</h4>
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
