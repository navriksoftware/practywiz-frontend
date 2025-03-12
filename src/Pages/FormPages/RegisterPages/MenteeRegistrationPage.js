import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import MenteeRegistration from "../../../Components/Forms/Register/Mentee/MenteeStepForm";
import GoToTop from "../../../Utils/GoToTop";
import MenteeFormLeftSidetext from "../../../Components/Forms/Register/Mentee/MenteeFormLeftSidetext";
import web96 from "../../../Images/icons8-account-96.webp";
const MenteeRegistrationPage = () => {
  document.title = "Practywiz | Mentee Register";

  return (
    <>
      <Navbar />

      <main>
        <div className="regis_background " id="menteeRegBackground">
          <div className="container">
            <div className="row">


              <MenteeFormLeftSidetext />
              <div className="col-lg-6">
                <div className="iuhieiuihaw_right bg-white p-3">
                  <div className="step active" id="step1">
                    <h4 className="text-center">
                      <img src={web96} alt="" className="me-1" />
                      Mentee Registration
                    </h4>

                    <MenteeRegistration />

                    <div className="d-flex justify-content-between pt-3">
                      <div className="uherrr_text text-center">
                        <p className="mb-0">
                          Already Have An Account? <a href="/login">Log In</a>
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
      <GoToTop />
    </>
  );
};

export default MenteeRegistrationPage;
