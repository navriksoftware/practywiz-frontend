import React from "react";
import "../DashboardCSS/menteeprofile.css";
import Annesa from "../../../../Images/Mentee/annesa.webp";
import Ll1 from "../../../../Images/Mentee/ll1.png";
import Ll2 from "../../../../Images/Mentee/ll2.png";
import Ll3 from "../../../../Images/Mentee/ll3.png";
import Ll4 from "../../../../Images/Mentee/ll4.png";
import Ll5 from "../../../../Images/Mentee/ll5.png";
import Ii1 from "../../../../Images/Mentee/ii1.png";
import Ii2 from "../../../../Images/Mentee/ii2.png";
import Ii4 from "../../../../Images/Mentee/ii4.png";
import Edu from "../../../../Images/Mentee/edu.png";
import Certification from "../../../../Images/Mentee/certification.png";
import Experience from "../../../../Images/Mentee/experiece.png";
const MenteeProfile = () => {
  return (
    <>
      <div className="difuhtre_content">
        <div
          className="duiegrer_bck position-relative mb-3 mt70"
          id="menteeBackgroundCover"
        >
          <div className="container">
            <div className="csdpeijf kjbdbeuirrr d-flex justify-content-between">
              <div className="ihuerorktrt ujgereter position-relative">
                <div className="iijieirr_left overflow-hidden">
                  <img src={Annesa} width="100%" alt="" />
                </div>
              </div>

              <div className="ihurtf_btn">
                <button className="btn btn-main">
                  <i className="fa-solid pe-2 fa-envelope-open-text"></i>{" "}
                  Message
                </button>

                <button className="btn btn-main">
                  <i className="fa-solid pe-2 fa-share"></i> Share Profile
                </button>
              </div>

              <div className="ljrfhf">
                <i className="fa-solid fa-upload"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="lndfhjfvgdvbfgfghgf pt-5">
          <div className="container">
            <div className="skhfdfdfg">
              <div className="row justify-content-between">
                <div className="col-lg-7">
                  <div className="dfnjghjggh">
                    <div className="ghvfvdfgg">
                      <div className="gjnjfghg">
                        <h2 className="mb-2">Anwesha Sinha</h2>
                      </div>

                      <div className="njfgfghf">
                        <i className="fa-brands me-2 fa-linkedin-in"></i>

                        <i className="fa-brands fa-x-twitter"></i>
                      </div>
                    </div>

                    <div className="hfuydfgftgh d-flex align-items-center mb-2">
                      <div className="gjfhg me-2">
                        <img src={Ii1} alt="" />
                      </div>

                      <p className="mb-0">Digital Marketing</p>
                    </div>

                    <div className="hfuydfgftgh d-flex align-items-center mb-2">
                      <div className="gjfhg me-2">
                        <img src={Ii2} alt="" />
                      </div>

                      <p className="mb-0">
                        Working Professional{" "}
                        <span className="spnrr">(Working at XYZ company)</span>
                      </p>
                    </div>

                    <div className="hfuydfgftgh d-flex mb-2">
                      <div className="gjfhg me-2">
                        <img src={Ii4} alt="" />
                      </div>

                      <p className="mb-0">
                        I am currently working as a digital marketing intern,
                        have a passion for copy...{" "}
                        <span className="spnn45">Show More</span>
                      </p>
                    </div>

                    <div className="jgufgfhghjg my-5">
                      <h4 className="mb-3">Skills</h4>

                      <div className="hjuyfgdfggh">
                        <button>PHP</button>

                        <button>Laravel</button>

                        <button>Javascript</button>

                        <button>jquery</button>

                        <button>React</button>

                        <button>Flutter</button>

                        <button>Wordpress</button>
                      </div>
                    </div>

                    <div className="jnfhujydfgfghfh">
                      <div className="lgjgf align-items-center mb-3">
                        <div className="mgjhg me-3">
                          <img src={Experience} alt="" />
                        </div>

                        <h3 className="mb-0">Work Experience</h3>
                      </div>

                      <div className="gkjnhfgfg">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="gfgh">
                              <h6>Product Designer</h6>
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="gfgh">
                              <h6>Product Designer</h6>
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="jnfhujydfgfghfh py-3">
                      <div className="lgjgf3 align-items-center mb-3">
                        <div className="mgjhg me-3">
                          <img src={Certification} alt="" />
                        </div>

                        <h3 className="mb-0">Certification</h3>
                      </div>

                      <div className="gkjnhfgfg">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="gfgh">
                              <h6>Certification in Content Writing</h6>
                              <p>
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="gdfgghjhhjkjh">
                    <div className="dfkjbgdfgg">
                      <div className="nggh mb-3">
                        <h5>Personal Details</h5>
                      </div>

                      <div className="mfbghffghg py-2">
                        <div className="doiherer d-flex align-items-center">
                          <div className="jnhfgjhf me-2">
                            <img src={Ll1} alt="" />
                          </div>

                          <h6 className="mb-0">Experience:</h6>
                        </div>

                        <p className="mb-0">0-2 Years</p>
                      </div>

                      <div className="mfbghffghg py-2">
                        <div className="doiherer d-flex align-items-center">
                          <div className="jnhfgjhf me-2">
                            <img src={Ll2} alt="" />
                          </div>

                          <h6 className="mb-0">Age:</h6>
                        </div>

                        <p className="mb-0">25 Years</p>
                      </div>

                      <div className="mfbghffghg py-2">
                        <div className="doiherer d-flex align-items-center">
                          <div className="jnhfgjhf me-2">
                            <img src={Ll3} alt="" />
                          </div>

                          <h6 className="mb-0">Gender:</h6>
                        </div>

                        <p className="mb-0">Female</p>
                      </div>

                      <div className="mfbghffghg py-2">
                        <div className="doiherer d-flex align-items-center">
                          <div className="jnhfgjhf me-2">
                            <img src={Ll4} alt="" />
                          </div>

                          <h6 className="mb-0">Language:</h6>
                        </div>

                        <p className="mb-0">English,Hindi,Bengali</p>
                      </div>

                      <div className="mfbghffghg py-2">
                        <div className="doiherer d-flex align-items-center">
                          <div className="jnhfgjhf me-2">
                            <img src={Ll5} alt="" />
                          </div>

                          <h6 className="mb-0">Educational Level:</h6>
                        </div>

                        <p className="mb-0">Master Degree</p>
                      </div>
                    </div>

                    <div className="jnfhujydfgfghfh my-4">
                      <div className="lgjgf2 align-items-center mb-3">
                        <div className="mgjhg me-3">
                          <img src={Edu} alt="" />
                        </div>

                        <h3 className="mb-0">Education</h3>
                      </div>

                      <div className="gkjnhfgfg">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="gfgh">
                              <h6>Bachelors in Fins Arts</h6>
                              <p>College/ School 2010-2012</p>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="gfgh">
                              <h6>Bachelors in Fins Arts</h6>
                              <p>College/ School 2010-2012</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default MenteeProfile;
