import React from "react";
import AlumniMentor from "../../../Images/Institute/idherreee.webp";
import Mentor1 from "../../../Images/Institute/mentors1.jpeg";
import { Autoplay } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
function MentorAlumniCard() {
  return (
    <div className="item">
      <div className="njfgfd" style={{ width: "300px" }}>
        <div className="ghfghgfhg">
          <div className="jghdfrg">
            <div className="kmg">
              <img src={AlumniMentor} alt="AlumininMentor" />
            </div>

            <div className="dfhjbghfjgfgh22">
              <h4>Tarun Gautam</h4>

              <h6>Business Analyst</h6>

              <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>

              <p>7 Sessions Completed (57 Reviews)</p>

              <div className="kbfhgfgfg">
                <button className="btn-main">BOOK NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Top5AlumniCard() {
  return (
    <div className="col-lg-4 mb-4">
      <div className="njfgfd">
        <div className="ghfghgfhg mb-0">
          <div className="jghdfrg">
            <div className="kmg">
              <img src={AlumniMentor} alt="Top5Alumini" />
            </div>

            <div className="dfhjbghfjgfgh22">
              <h4>Tarun Gautam</h4>

              <h6>Business Analyst</h6>

              <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>

              <p>7 Sessions Completed (57 Reviews)</p>

              <div className="kbfhgfgfg">
                <button className="btn-main">BOOK NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function NonAlumniCard() {
  return (
    <div className="item">
      <div className="njfgfd" style={{ width: "300px" }}>
        <div className="ghfghgfhg">
          <div className="jghdfrg">
            <div className="kmg">
              <img src={AlumniMentor} alt="" />
            </div>

            <div className="dfhjbghfjgfgh22">
              <h4>Tarun Gautam</h4>

              <h6>Business Analyst</h6>

              <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>

              <p>7 Sessions Completed (57 Reviews)</p>

              <div className="kbfhgfgfg">
                <button className="btn-main">BOOK NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingMentorSessions() {
  return (
    <div className="itemMentor selectedd" onclick="showContent(1)">
      <div className="d-flex align-items-center">
        <div className="iduheirer_img me-2">
          <img src={AlumniMentor} width="100%" alt="Upcoming mentor" />
        </div>

        <h5 className="mb-0">Tarun Gautam</h5>
      </div>
    </div>
  );
}

function CompletedMentorSessions() {
  return (
    <div className="col-lg-6 mb-4">
      <div className="diehrer_inner">
        <div className="duieghr_inner p-3 bg-white">
          <div className="row">
            <div className="col-lg-5 mb-3">
              <div className="duieghrerewryrr text-center">
                <div className="duiehirer_left">
                  <img src={Mentor1} alt="mentors" />
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="duiehirer_right">
                <h5>Tarun Gautam</h5>

                <p>
                  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                  lorem ipsum lorem.
                </p>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="deoihrehr_Oirtuetr text-center">
                <div className="owl-carousel dewrewrer_slider owl-theme">
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div className="item">
                        <div className="ugeurbuyger_inner">
                          <div className="doiehrer_slider">
                            <h6>
                              <b>Monday - 26/2/2024</b>
                            </h6>

                            <ul className="ps-0">
                              <li>
                                <i className="fa-solid fa-hourglass-start"></i>{" "}
                                01:00 -
                                <i className="fa-solid fa-flag-checkered"></i>{" "}
                                2:30
                              </li>

                              <li>
                                <i className="fa-solid fa-hourglass-start"></i>{" "}
                                01:00 -
                                <i className="fa-solid fa-flag-checkered"></i>{" "}
                                2:30
                              </li>

                              <li>
                                <i className="fa-solid fa-hourglass-start"></i>{" "}
                                01:00 -
                                <i className="fa-solid fa-flag-checkered"></i>{" "}
                                2:30
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="item">
                        <div className="ugeurbuyger_inner">
                          <div className="doiehrer_slider">
                            <h6>
                              <b>Tuesday - 27/2/2024</b>
                            </h6>

                            <ul className="ps-0">
                              <li>
                                <i className="fa-solid fa-hourglass-start"></i>{" "}
                                01:00 -
                                <i className="fa-solid fa-flag-checkered"></i>{" "}
                                2:30
                              </li>

                              <li>
                                <i className="fa-solid fa-hourglass-start"></i>{" "}
                                01:00 -
                                <i className="fa-solid fa-flag-checkered"></i>{" "}
                                2:30
                              </li>

                              <li>
                                <i className="fa-solid fa-hourglass-start"></i>{" "}
                                01:00 -
                                <i className="fa-solid fa-flag-checkered"></i>{" "}
                                2:30
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlannedGuestLecture() {
  return (
    <div className="item">
      <div className="njfgfd">
        <div className="ghfghgfhg">
          <div className="jghdfrg">
            <div className="kmg">
              <img src={AlumniMentor} alt="" />
            </div>

            <div className="dfhjbghfjgfgh22">
              <h4>Tarun Gautam</h4>

              <h6>Business Analyst</h6>

              <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>

              <p>7 Sessions Completed (57 Reviews)</p>

              <div className="kbfhgfgfg">
                <button className="btn-main">BOOK NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export {
  MentorAlumniCard,
  Top5AlumniCard,
  NonAlumniCard,
  UpcomingMentorSessions,
  CompletedMentorSessions,
  PlannedGuestLecture,
};
