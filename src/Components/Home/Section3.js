import React from "react";
import "./Home.css";
import Csdfsfgdf from "../../Images/Home/csdfsfgdf.png";
import Mkwef from "../../Images/Home/mkwef.png";
import Archt from "../../Images/architecture-independence-palace-ho-chi-minh-city.jpg";
import { Link } from "react-router-dom";
import GoToTop from "../../Utils/GoToTop";

const Section3 = () => {
  return (
    <>
      <div className="section3 section-hor-gap overflow-hidden">
        <div className="container py-5">
          <div className="diuehrr_wrapper">
            <div className="row align-items-center asdfasdfasdfafs">
              <div className="col-lg-7 mb-3">
                <div className="idheirr_content">
                  <h2 className="mb-0">
                    Industry Interaction Should be a Culture Not a Transaction
                  </h2>

                  <p>Learn From The Corporate, Step Into Corporate World!</p>

                  <button className="btn me-2 btn-main mobbtn">
                    <Link to="/institute-registration">
                      Register Your Institute
                    </Link>
                  </button>
                  {/* <button className="btn btn-main">Learn More</button> */}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="cuierr_image position-relative">
                  <img
                    src={Csdfsfgdf}
                    alt="csdfsfgdf"
                    className="uidghegbr__uerww dieghrytretew_image position-absolute"
                    style={{ width: "25%" }}
                  />
                  <img
                    src={Archt}
                    className="dertgrtyf_image position-relative"
                    alt="architecture"
                    style={{ width: "100%" }}
                  />

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
      </div>
      <GoToTop />
    </>
  );
};

export default Section3;
