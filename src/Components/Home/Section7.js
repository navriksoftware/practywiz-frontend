import React from "react";
import "./Home.css";
import Dcaffer from "../../Images/Home/dcaffer.png";
const Section7 = () => {
  return (
    <>
      <div className="section7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 asdfasdfaqwetoui">
              <div className="uiherr_wrapper">
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-3 sdfalsfdjlk">
                    <div className="diehrer_inner">
                      <h2>Unlock Your Potential Register as a Mentee!</h2>

                      <p>
                        Emphasizes growth and the idea that mentorship can help
                        individuals reach their full potential
                      </p>

                      <button className="btn btn-main mt-3">
                        <a href="/mentee-registration">Register Now</a>
                      </button>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <img
                      src={Dcaffer}
                      alt="dcaffer"
                      style={{ width: "100%" }}
                    />
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

export default Section7;
