import React from "react";
import "./SingleJob.css";
import SingleJobCard from "./SingleJobCard";
import C4 from "../../../Images/Jobs/c4.webp";
const SingleJob = () => {
  return (
    <>
      <div className="aslkhghj border-none">
        <div className="container-fluid px-5">
          <div className="kndfghjfb">
            <div className="dfknghffg">
              <div className="row">
                <div className="col-lg-6">
                  <div className="kjdhhjgd p-3">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-sm-12 mb-4">
                        <div className="hjgfdfg">
                          <img src={C4} alt="" />
                        </div>
                      </div>

                      <div className="col-lg-9 col-md-9 col-sm-12 ps-lg-0 ps-sm-2">
                        <div className="kfhgjfgfh mb-2 d-flex align-items-center justify-content-between">
                          <div className="jhgjgf">
                            <h4 className="mb-0">
                              Software Engineer (Android), Libraries{" "}
                              <i className="fa-solid fa-up-right-from-square"></i>
                            </h4>
                          </div>
                        </div>

                        <div className="nfhjdfghfdghf mb-3">
                          <button className="rlknjhgjfg ps-0 btn btn-transparent">
                            <p className="mb-0">
                              <i className="fa-solid fa-location-arrow me-1"></i>{" "}
                              London,Uk
                            </p>
                          </button>

                          <button className="rlknjhgjfg ps-0 btn btn-transparent">
                            <p className="mb-0">
                              <i className="fa-solid fa-sack-dollar me-1"></i>{" "}
                              $24k-$30k
                            </p>
                          </button>

                          <button className="rlknjhgjfg ps-0 btn btn-transparent">
                            <p className="mb-0">11 hours ago</p>
                          </button>
                        </div>
                        <button className="rlknjhgjfg1 oidefrgtry px-2 py-1">
                          Full Time
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-3">
                  <div className="kjhfhffd">
                    <button className="btn-main">Apply To This Job</button>
                    <div className="jhgjgf1">
                      <div className="mhgf1 position-relative text-center">
                        <i className="fa-regular fa-bookmark position-absolute"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="kjdfvghjdrbgdfgfd">
        <div className="container-fluid px-5">
          <div className="kjdfhdf">
            <div className="row">
              <div className="col-lg-8">
                <div className="kjguydg">
                  <div className="lghjgt">
                    <h5>Job Description</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>

                    <p>
                      It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s with the
                      release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>

                  <div className="lghjgt">
                    <h5>Key Responsibilities</h5>
                    <ul>
                      <li>
                        Be involved in every step of the product design cycle
                        from discovery to developer handoff and user acceptance
                        testing.
                      </li>
                      <li>
                        Be involved in every step of the product design cycle
                        from discovery to developer handoff and user acceptance
                        testing.
                      </li>
                      <li>
                        Be involved in every step of the product design cycle
                        from discovery to developer handoff and user acceptance
                        testing.
                      </li>
                      <li>
                        Be involved in every step of the product design cycle
                        from discovery to developer handoff and user acceptance
                        testing.
                      </li>
                    </ul>
                  </div>
                  <hr />

                  <div className="lghjgt">
                    <h5>Skill & Experience</h5>
                    <ul>
                      <li>
                        Be involved in every step of the product design cycle
                        from discovery to developer handoff and user acceptance
                        testing.
                      </li>
                      <li>
                        Be involved in every step of the product design cycle
                        from discovery to developer handoff and user acceptance
                        testing.
                      </li>
                      <li>
                        Be involved in every step of the product design cycle
                        from discovery to developer handoff and user acceptance
                        testing.
                      </li>
                    </ul>
                  </div>
                  <hr />

                  <div className="jfgngjfgh">
                    <p>Share This Job</p>
                    <div className="kfgjh">
                      <i className="fa-brands fa-facebook"></i>
                      <i className="fa-brands fa-twitter"></i>
                      <i className="fa-brands fa-linkedin-in"></i>
                    </div>
                  </div>
                  <div className="kjdhjdrgfg">
                    <h5>Related Jobs</h5>
                    <p>154 new jobs added today.</p>
                  </div>
                  <div className="gdfgdfg">
                    <SingleJobCard />
                    <SingleJobCard /> <SingleJobCard /> <SingleJobCard />
                    <SingleJobCard />
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-3">
                <div className="kjdfhjdfdffg ">
                  <h5>Job Overview</h5>
                  <div className="fkghfgnhgjhg">
                    <div className="fjhg">
                      <h6>Date Posted:</h6>
                      <p>1 hour ago</p>
                    </div>
                    <div className="fjhg">
                      <h6>Location:</h6>
                      <p>Kolkata</p>
                    </div>
                    <div className="fjhg">
                      <h6>Job Title:</h6>
                      <p>Designer</p>
                    </div>
                    <div className="fjhg">
                      <h6>Hours:</h6>
                      <p>50h/ week</p>
                    </div>
                    <div className="fjhg">
                      <h6>Salary:</h6>
                      <p>$10k - $15k</p>
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

export default SingleJob;
