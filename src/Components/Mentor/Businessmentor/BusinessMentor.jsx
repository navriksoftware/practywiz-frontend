import React from "react";
import "./BusinessMentor.css";
import BusinessMentorCard from "./BusinessMentorCard";
import BusinessMenteeTestimonial from "./BusinessMenteeTestimonial";
import BusinessMentorSideProfile from "./BusinessMentorSideProfile";

const BusinessMentor = () => {
  return (
    <>
      <div className="kjgfghvfggfhgfhg556">
        <div className="ighefirr sticky-top bg-white py-2">
          <div className="container-fluid px-5">
            <div className="uilhdier_filter_wrap d-flex slign-items-center justify-content-between">
              <div className="dieirherr_btn bhduebbuger">
                <span className="cjdsuibfsdf_btn position-relative">
                  <button
                    className="custom-select sfgrwwe_btn btn btn-main me-2"
                    id="bmfltrbtn"
                  >
                    <span>Mentor Availability</span>
                  </button>

                  <ul
                    className="diugerbihr p-3 bg-white position-absolute text-left d-none"
                    id="bm-filter-drpdwn"
                  >
                    <h6>Mentors available within</h6>

                    <div className="row dgeubr mt-3">
                      <div className="col-lg-6 mb-2">
                        <input type="radio" id="cat" name="animal" value="" />
                        <label for="cat">7 Days</label>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <input type="radio" id="dog" name="animal" value="" />
                        <label for="dog">14 Days</label>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <input type="radio" id="pig" name="animal" value="" />
                        <label for="pig">21 Days</label>
                      </div>

                      <div className="col-lg-6">
                        <input type="radio" id="vdsf" name="animal" value="" />
                        <label for="vdsf">30 Days</label>
                      </div>
                    </div>
                  </ul>
                </span>

                <span className="cjdsuibfsdf_btn position-relative">
                  <button
                    className="custom-select sfgrwwe_btn btn btn-main mx-2"
                    id="bmfltrbtn2"
                  >
                    <span>Experience</span>
                  </button>

                  <ul
                    className="diugerbihr p-3 bg-white position-absolute text-left d-none"
                    id="bm-filter-drpdwn2"
                  >
                    <h6>Mentors with the experience (Yrs) of</h6>

                    <div className="row dgeubr mt-3">
                      <div className="col-lg-6 mb-2">
                        <input
                          type="radio"
                          id="sdsd"
                          name="csdfdwrtt"
                          value=""
                        />
                        <label for="sdsd">3 - 5</label>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <input
                          type="radio"
                          id="sadf"
                          name="csdfdwrtt"
                          value=""
                        />
                        <label for="sadf">5 - 7</label>
                      </div>

                      <div className="col-lg-6 mb-2">
                        <input
                          type="radio"
                          id="gdfg"
                          name="csdfdwrtt"
                          value=""
                        />
                        <label for="gdfg">7 - 9</label>
                      </div>

                      <div className="col-lg-6">
                        <input
                          type="radio"
                          id="gftsr"
                          name="csdfdwrtt"
                          value=""
                        />
                        <label for="gftsr">9+</label>
                      </div>
                    </div>
                  </ul>
                </span>

                <span className="cjdsuibfsdf_btn position-relative">
                  <button
                    className="custom-select sfgrwwe_btn btn btn-main mx-2"
                    id="bmfltrbtn3"
                  >
                    <span>
                      Price Range (
                      <i className="fa-solid fa-indian-rupee-sign"></i>)
                    </span>
                  </button>

                  <ul
                    className="diugerbihr p-3 bg-white position-absolute d-none"
                    id="bm-filter-drpdwn3"
                  >
                    <div className="wrapper">
                      <div className="price-input">
                        <div className="field">
                          <span>Min</span>
                          <input
                            type="number"
                            className="input-min"
                            value="2500"
                          />
                        </div>

                        <div className="separator">-</div>

                        <div className="field">
                          <span>Max</span>
                          <input
                            type="number"
                            className="input-max"
                            value="7500"
                          />
                        </div>
                      </div>
                    </div>
                  </ul>
                </span>

                <span className="cjdsuibfsdf_btn position-relative">
                  <button
                    className="custom-select sfgrwwe_btn btn btn-main ms-2"
                    id="bmfltrbtn4"
                  >
                    <span>Rating</span>
                  </button>

                  <ul
                    className="diugerbihr ohgiererr_list p-3 bg-white position-absolute d-none"
                    id="bm-filter-drpdwn4"
                  >
                    <h6>Choose rating</h6>

                    <div className="row dgeubr mt-3">
                      <div className="col-lg-12 mb-2">
                        <input type="radio" id="dsad" name="fcreter" value="" />
                        <label for="dsad">
                          1 (<i className="fa-solid fa-star"></i>)
                        </label>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <input
                          type="radio"
                          id="sadsad"
                          name="fcreter"
                          value=""
                        />
                        <label for="sadsad">
                          2 (<i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>)
                        </label>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <input
                          type="radio"
                          id="hgffgh"
                          name="fcreter"
                          value=""
                        />
                        <label for="hgffgh">
                          3 (<i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>)
                        </label>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <input
                          type="radio"
                          id="kggfg"
                          name="fcreter"
                          value=""
                        />
                        <label for="kggfg">
                          4 (<i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>)
                        </label>
                      </div>

                      <div className="col-lg-12">
                        <input
                          type="radio"
                          id="poirer"
                          name="fcreter"
                          value=""
                        />
                        <label for="poirer">
                          5 (<i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>{" "}
                          <i className="fa-solid fa-star"></i>)
                        </label>
                      </div>
                    </div>
                  </ul>
                </span>

                <button
                  className="custom-select sfgrwwe_btn oikahdbaed_filter btn btn-main d-none"
                  id="fuygernert"
                >
                  <span>Filter</span>
                </button>
              </div>

              <div className="ibhdiber_btn">
                <button className="btn btn-main">
                  Apply Filter <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid px-5 mt-2">
          <div className="jkjfghfg">
            <div className="row">
              <div className="col-lg-4">
                <div className="sticky-top">
                  <div className="duilehri_left">
                    <ul className="tabs fettghghhh">
                      <BusinessMentorCard />
                      <BusinessMentorCard />
                      <BusinessMentorCard />
                      <BusinessMentorCard />
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="bnbgjhg">
                  <BusinessMentorSideProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile version */}
      <div className="mbpm d-none">
        <div className="djoier_bck_drp" id="modalbackdrop"></div>

        <div className="csdffh_modal dbhebn__biedr py-3" id="oihfe_tab_modal">
          <div className="ihstrerer bg-white position-relative">
            <i
              className="fa-solid position-absolute fa-chevron-down"
              id="modal-close-btn"
            ></i>

            <div className="hgdfggtf p-3">
              <div className="row">
                <div className="col-lg-2">
                  <div className="gkbhfg2">
                    <img src="./images/qqq3.png" alt="" />
                  </div>
                </div>

                <div className="col-lg-10">
                  <div className="dhjgdfghgj">
                    <div className="mgjbhfghfgh2">
                      <h6>
                        Tarun Gautam{" "}
                        <span>
                          <i className="fa-solid fa-star"></i> 4.8
                        </span>
                      </h6>
                    </div>

                    <div className="kdfhjfg">
                      <p>
                        Product Supply Manager - P&amp;G | IIT Madras | Unstop
                        B-School Leader'23 | National Winner - Infosys
                        Ingenious'22 &amp; 6 Bschool Competitions | Ex-Wipro
                      </p>
                    </div>

                    <div className="d-flex idneihrr_btn justify-content-between align-items-center">
                      <div className="mkghdfgf2">
                        <button className="btn btn-transparent">
                          <i className="fa-solid fa-lock"></i> 3 Years
                        </button>

                        <button className="btn btn-transparent">
                          <i className="fa-solid fa-shield-halved"></i> Genarel
                        </button>

                        <button className="btn btn-transparent">
                          <i className="fa-solid fa-comment"></i> 26 Bookings
                        </button>

                        <button className="btn btn-transparent">
                          <i className="fa-solid fa-clock"></i> 12 hours
                        </button>
                      </div>

                      <div className="djbhfdf">
                        <button className="btn btn-main">
                          View Profile{" "}
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="jfgdfrgfgt p-3">
              <div className="row justify-content-right">
                <div className="col-lg-5">
                  <div className="jghfttght d-flex align-items-center">
                    <i className="fa-brands fa-facebook"></i>

                    <i className="fa-brands fa-square-instagram"></i>

                    <i className="fa-brands fa-linkedin"></i>

                    <button className="btn d-flex align-items-center btn-main">
                      <i className="fa-regular me-1 fa-heart"></i> +Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dikherr p-3">
            <h4 className="mt-4 mb-1">Services</h4>

            <div className="jdfghfghfghfg">
              <div className="khrudghfgfdghfh">
                <div className="row">
                  <div className="col-lg-9">
                    <div className="fjbffd">
                      <h5>Mock Interviews - A-Schools Specific</h5>
                      <div className="hjvbf">
                        <span>
                          {" "}
                          <p>
                            <i className="fa-solid fa-video"></i> 1:1 Call
                          </p>
                        </span>

                        <p>
                          <i className="fa-regular fa-clock"></i> 30 min
                        </p>
                      </div>
                      <div className="fhdfgf">
                        <h2>
                          <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                          300/-
                        </h2>
                        <p>
                          Get(15% OFF){" "}
                          <i className="fa-solid fa-indian-rupee-sign"></i>250
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="drkjbghgg">
                      <button className="btn-main">BOOK NOW</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="khrudghfgfdghfh">
                <div className="row align-items-end">
                  <div className="col-lg-9">
                    <div className="fjbffd">
                      <h5>Mock Interviews - D-Schools Specific</h5>
                      <div className="hjvbf">
                        <span>
                          {" "}
                          <p>
                            <i className="fa-solid fa-video"></i> 1:1 Call
                          </p>
                        </span>

                        <p>
                          <i className="fa-regular fa-clock"></i> 40 min
                        </p>
                      </div>
                      <div className="fhdfgf">
                        <h2>
                          <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                          800/-
                        </h2>
                        <p>
                          Get(15% OFF){" "}
                          <i className="fa-solid fa-indian-rupee-sign"></i>250
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="drkjbghgg">
                      <button className="btn-main">BOOK NOW </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="jbfgf">
                <button>
                  View More <i className="fa-solid fa-caret-down"></i>
                </button>
              </div>

              <div className="njbfghddfgf">
                <h4>About Mentor</h4>
                <p>
                  As a product supply manager, I have a passion for optimizing
                  supply chain operations and delivering exceptional results. In
                  addition to my professional endeavors, I enjoy staying active
                  through swimming and playing football. I provide mentorship in
                  both career and academic aspects related to ...
                </p>
              </div>

              <div className="fgkjhdffg">
                <h4>Topics</h4>
                <div className="dfhjbg">
                  <button>#Product Management</button>
                  <button>#Crack Case Study and Innovation Challenges</button>
                  <button>#Get your Resume/CV reviewed</button>
                  <button>#Pass interviews</button>
                  <button>#Sales and Marketing</button>
                </div>
              </div>

              <div className="fgkjhdffg">
                <h4>Skills</h4>
                <div className="dfhjbg">
                  <button>#Product Management</button>
                  <button>#Sales and Marketing</button>
                  <button>
                    #Case Study Competitions and Innovation Challenges
                  </button>
                  <button>#Career Advice</button>

                  <button>#CAT Preparation</button>
                </div>
              </div>

              <div className="fgkjhdffg">
                <h4>Language</h4>
                <div className="dfhjbg">
                  <button>#English</button>
                  <button>#Hindi</button>
                  <button>#Bengali</button>
                </div>
              </div>

              <div className="fgkjhdffg">
                <h4>Education</h4>

                <div className="ndfhjgdfrgdfgfd">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="njhfd2">
                        <img src="./images/edu4.png" alt="" />
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="lfjguifhgftgh">
                        <h6>
                          Department of Management Studies (DoMS), Indian
                          Institute of Technology (IIT), Madras
                        </h6>
                        <span>
                          <p>MBA</p>
                        </span>
                        <p>2021 - 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ndfhjgdfrgdfgfd">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="njhfd2">
                        <img src="./images/edu5.png" alt="" />
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="lfjguifhgftgh">
                        <h6>
                          Thiagarajar College of Engineering (TCE), Madurai
                        </h6>
                        <span>
                          <p>B.E</p>
                        </span>
                        <p>2015 - 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fgkjhdffg">
                <h4>Work Experience</h4>

                <div className="ndfhjgdfrgdfgfd">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="njhfd2">
                        <img src="./images/kom1.png" alt="" />
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="lfjguifhgftgh">
                        <h6>Product Supply Manager</h6>
                        <span>
                          <p>Wipro Technologies</p>
                        </span>
                        <p>2021 - present</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ndfhjgdfrgdfgfd">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="njhfd2">
                        <img src="./images/kom2.png" alt="" />
                      </div>
                    </div>

                    <div className="col-lg-10">
                      <div className="lfjguifhgftgh">
                        <h6>Associate Consultant</h6>
                        <span>
                          <p>Procter &amp; Gamble (P&amp;G)</p>
                        </span>
                        <p>2015 - 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fgkjhdffg">
                <h4>What mentees say</h4>
                <BusinessMenteeTestimonial />
                <div className="hghgg">
                  <div className="djbgdfdfgh d-flex justify-content-between align-items-center">
                    <div className="fyhugdghg d-flex justify-content-between align-items-center">
                      <div className="kjghjfg me-2">
                        <img src="./images/rrrr1.png" alt="" />
                      </div>

                      <div className="ihceuirr">
                        <h4>Anwesha Sinha</h4>

                        <div className="fgnhjghjgh">
                          <span>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </span>
                          <p>
                            <i className="fa-solid fa-calendar-days"></i>{" "}
                            17/03/2024
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="gnhjbggf">
                      <a href="/businessmentor">View Profile</a>
                    </div>
                  </div>

                  <div className="dfkjbghdfffg">
                    <p>
                      As a business analyst professional, I feel very lucky to
                      have Tarun Sir as my mentor. I got in-depth knowledge
                      about the subject. It helps me to cope with the dynamicity
                      of it quite beautifully. His dedication to mentoring the
                      students is excellent. If somebody asks to me for a
                      business analyst mentor I will surely take&nbsp; Gautam
                      sir’s name.
                    </p>
                  </div>
                </div>

                <div className="hghgg">
                  <div className="djbgdfdfgh d-flex justify-content-between align-items-center">
                    <div className="fyhugdghg d-flex justify-content-between align-items-center">
                      <div className="kjghjfg me-2">
                        <img src="./images/rrrr2.png" alt="" />
                      </div>

                      <div className="ihceuirr">
                        <h4>Tithi Mishra</h4>

                        <div className="fgnhjghjgh">
                          <span>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </span>

                          <p>
                            <i className="fa-solid fa-calendar-days"></i>{" "}
                            17/03/2024
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="gnhjbggf">
                      <a href="/businessmentor">View Profile</a>
                    </div>
                  </div>

                  <div className="dfkjbghdfffg">
                    <p>
                      As a business analyst professional, I feel very lucky to
                      have Tarun Sir as my mentor. I got in-depth knowledge
                      about the subject. It helps me to cope with the dynamicity
                      of it quite beautifully. His dedication to mentoring the
                      students is excellent. If somebody asks to me for a
                      business analyst mentor I will surely take&nbsp; Gautam
                      sir’s name.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {mobile verion ends} */}
    </>
  );
};

export default BusinessMentor;
