import React from "react";
import "./institute.css";
import {
  CompletedMentorSessions,
  MentorAlumniCard,
  NonAlumniCard,
  PlannedGuestLecture,
  Top5AlumniCard,
  UpcomingMentorSessions,
} from "./InstituteMentorCard";
import { Autoplay } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
const InstituteProfile = () => {
  return (
    <>
     
      <div className="dfknhguyfdgf">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="gtyfdgfgf">
                <div className="tjbghdfhbgfgf">
                  <ul>
                    <li>
                      Home <i className="fa-solid fa-chevron-right"></i>
                    </li>

                    <li>
                      <i>Institute Profile</i>
                    </li>
                  </ul>
                </div>

                <div className="ndfhjvdfv">
                  <h2>Brainware Group Of Institution</h2>

                  <div className="fhghgdgg">
                    <h3>
                      <i className="fa-solid me-2 fa-sign-hanging"></i> Est. 2006
                    </h3>
                  </div>
                </div>

                <div className="ndshfgfdgdfgdfg">
                  <div className="hff">
                    <h4 className="d-flex align-items-center">
                      <i className="fa-solid me-2 fa-eject"></i> About Institute
                    </h4>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable. If you are going to
                      use a passage of Lorem Ipsum, you need to be sure there
                      isn't anything embarrassing hidden in the middle of text.
                      All the Lorem Ipsum generators on the Internet tend to
                      repeat predefined chunks as necessary, making this the
                      first true generator on the making this the first
                      Internet.{" "}
                    </p>
                  </div>
                </div>

                <div className="jvhfdfvgdf">
                  <h4>
                    <i className="fa-regular me-2 fa-address-card"></i> Registered
                    Mentors Alumni
                  </h4>

                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>

                  <div className="ihitrbubrt">
                    <div className="djghvgfgbgfg552">
                      <div className="rejugfgh">
                        <div className="dfnghdfgdf">
                          <div className="owl-carousel owl-theme owl58">
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
                                <MentorAlumniCard />
                              </SwiperSlide>
                              <SwiperSlide>
                                <MentorAlumniCard />
                              </SwiperSlide>
                              <SwiperSlide>
                                <MentorAlumniCard />
                              </SwiperSlide>
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="jvhfdfvgdf">
                  <h4>
                    <i className="fa-solid me-2 fa-star-of-life"></i> Top 5 Alumni
                    Mentors
                  </h4>

                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>

                  <div className="ihitrbubrt">
                    <div className="djghvgfgbgfg552">
                      <div className="rejugfgh">
                        <div className="dfnghdfgdf">
                          <div className="row justify-content-center">
                            <Top5AlumniCard />
                            <Top5AlumniCard /> <Top5AlumniCard />
                            <Top5AlumniCard /> <Top5AlumniCard />
                            <Top5AlumniCard />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="jvhfdfvgdf">
                  <h4>
                    <i className="fa-solid me-2 fa-id-card-clip"></i> Registered
                    Mentors Non-Alumni
                  </h4>

                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>

                  <div className="ihitrbubrt">
                    <div className="djghvgfgbgfg552">
                      <div className="rejugfgh">
                        <div className="dfnghdfgdf">
                          <div
                            className="owl-carousel owl-theme owl58"
                            style={{ display: "flex" }}
                          >
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
                                <NonAlumniCard />
                              </SwiperSlide>
                              <SwiperSlide>
                                <NonAlumniCard />
                              </SwiperSlide>
                              <SwiperSlide>
                                <NonAlumniCard />
                              </SwiperSlide>
                              <SwiperSlide>
                                <NonAlumniCard />
                              </SwiperSlide>
                            </Swiper>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="jvhfdfvgdf mt-5">
                  <div className="">
                    <h4>
                      <i className="fa-regular me-2 fa-calendar-check"></i> Upcoming
                      Mentor Sessions
                    </h4>

                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>

                  <div className="iudfyghentr_slider_wrapper mt-4">
                    <div className="uidheiur_mentor_slider">
                      <div className="carouselMentor">
                        <UpcomingMentorSessions />
                        <UpcomingMentorSessions /> <UpcomingMentorSessions />
                        <UpcomingMentorSessions /> <UpcomingMentorSessions />
                      </div>

                      <div id="content1" className="contentMentor show">
                        <div className="idghuiehrnihr_ihihuerr">
                          <div className="row justify-content-between mt-4">
                            <div className="col-lg-6 mb-4">
                              <div className="duiheirre_left">
                                <h4>About My Upcoming Sessions</h4>

                                <p>
                                  <i className="fa-solid fa-star"></i>{" "}
                                  <i className="fa-solid fa-star"></i>{" "}
                                  <i className="fa-solid fa-star"></i>{" "}
                                  <i className="fa-solid fa-star"></i>{" "}
                                  <i className="fa-solid fa-star"></i>
                                </p>

                                <p>
                                  Join us for an insightful session on Business
                                  Analysis! Our experienced mentor will cover
                                  key topics including the role of a business
                                  analyst, analysis techniques, and leveraging
                                  data for decision-making. Whether you're an
                                  entrepreneur or professional, this session
                                  will equip you with essential skills for
                                  success in the business world.
                                </p>

                                <button className="btn btn-main">
                                  View Profile
                                </button>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="duiheirre_right">
                                <div
                                  className="mb-responsive-calendar vvverrbrrtr bg-white"
                                  id="mbrcalmodal"
                                >
                                  <div className="fkjbghdfgfghghjygh mt-0 p-3">
                                    <div className="ghjfgghgf">
                                      <div className="wrapper">
                                        <header>
                                          <p className="current-date">May 2024</p>
                                          <div className="icons">
                                            <span
                                              id="prev"
                                              className="material-symbols-rounded"
                                            >
                                              <i className="fa-regular fa-chevron_right"></i>
                                            </span>
                                            <span
                                              id="next"
                                              className="material-symbols-rounded"
                                            >
                                              <i className="fa-regular fa-chevron_left"></i>
                                            </span>
                                          </div>
                                        </header>

                                        <div className="calendar">
                                          <ul className="weeks mb-0">
                                            <li>Sun</li>
                                            <li>Mon</li>
                                            <li>Tue</li>
                                            <li>Wed</li>
                                            <li>Thu</li>
                                            <li>Fri</li>
                                            <li>Sat</li>
                                          </ul>

                                          <ul className="days">
                                            <li className="inactive">28</li>
                                            <li className="inactive">29</li>
                                            <li className="inactive">30</li>
                                            <li className="">1</li>
                                            <li className="">2</li>
                                            <li className="active">3</li>
                                            <li className="">4</li>
                                            <li className="">5</li>
                                            <li className="">6</li>
                                            <li className="">7</li>
                                            <li className="">8</li>
                                            <li className="">9</li>
                                            <li className="">10</li>
                                            <li className="">11</li>
                                            <li className="">12</li>
                                            <li className="">13</li>
                                            <li className="">14</li>
                                            <li className="">15</li>
                                            <li className="">16</li>
                                            <li className="">17</li>
                                            <li className="">18</li>
                                            <li className="">19</li>
                                            <li className="">20</li>
                                            <li className="">21</li>
                                            <li className="">22</li>
                                            <li className="">23</li>
                                            <li className="">24</li>
                                            <li className="">25</li>
                                            <li className="">26</li>
                                            <li className="">27</li>
                                            <li className="">28</li>
                                            <li className="">29</li>
                                            <li className="">30</li>
                                            <li className="">31</li>
                                            <li className="inactive">1</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="bhghh">
                                      <div className="lkfhgfgf sefagfberr">
                                        <h5>Choose The Time Slot:</h5>

                                        <div className="text-center">
                                          <button className="btngdfr m-1">
                                            <input
                                              type="radio"
                                              id="csad"
                                              name="dfsadf"
                                              value=""
                                            />
                                            <label for="csad">
                                              11:00 - 12:30
                                            </label>
                                          </button>

                                          <button className="btngdfr m-1">
                                            <input
                                              type="radio"
                                              id="cdsfdf"
                                              name="dfsadf"
                                              value=""
                                            />
                                            <label for="cdsfdf">
                                              13:00 - 14:30
                                            </label>
                                          </button>

                                          <button className="btngdfr m-1">
                                            <input
                                              type="radio"
                                              id="cgdf"
                                              name="dfsadf"
                                              value=""
                                            />
                                            <label for="cgdf">
                                              18:00 - 19:30
                                            </label>
                                          </button>
                                        </div>

                                        <div className="dfghjffg mt-3">
                                          <button className="btn btn-main">
                                            Confirm Booking
                                          </button>
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
                </div>

                <div className="jvhfdfvgdf mt-5">
                  <div className="">
                    <h4>
                      <i className="fa-regular me-2 fa-calendar-check"></i>{" "}
                      Completed Mentor Sessions
                    </h4>

                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>

                  <div className="cmpltd-mntr-sesns-slider-wrapper mt-4">
                    <div className="row">
                      <CompletedMentorSessions />
                      <CompletedMentorSessions />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="hdfgfghfgh sticky-top">
                <div className="doeirbrner_right">
                  <div className="jvhfdfvgdf">
                    <h4>
                      <i className="fa-solid me-2 fa-id-card-clip"></i> Planned
                      Guest Lectures
                    </h4>

                    <p className="mb-0">
                      There are many variations of passages of Lorem Ipsum
                      available..
                    </p>

                    <div className="ihitrbubrt uigbhuyguberer">
                      <div className="djghvgfgbgfg552">
                        <div className="rejugfgh">
                          <div className="dfnghdfgdf">
                            <div className="owl-carousel owl-theme deeyfvytfer_slider">
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
                                  <PlannedGuestLecture />
                                </SwiperSlide>
                                <SwiperSlide>
                                  <PlannedGuestLecture />
                                </SwiperSlide>
                                <SwiperSlide>
                                  <PlannedGuestLecture />
                                </SwiperSlide>
                                <SwiperSlide>
                                  <PlannedGuestLecture />
                                </SwiperSlide>
                                <SwiperSlide>
                                  <PlannedGuestLecture />
                                </SwiperSlide>
                              </Swiper>
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

      <div className="hjvgdhvdffg d-none">
        <div className="container-fluid px-5">
          <div className="dfghfg">
            <h4>Our Testimonial</h4>
          </div>

          <div className="jhffgfhfgh">
            <div className="owl-carousel owl-theme fhghjgfhjgh">
              <div className="item">
                <div className="fgfghjg55">
                  <div className="carousel-item">
                    <div className="card shadow-sm rounded-3">
                      <div className="quotes display-2 text-body-tertiary">
                        <i className="bi bi-quote"></i>
                      </div>

                      <div className="card-body">
                        <p className="card-text">
                          "Some quick example text to build on the card title
                          and make up the bulk of the card's content."
                        </p>
                        <div className="d-flex align-items-center pt-2">
                          <div className="hgfgf">
                            <img
                              src="https://codingyaar.com/wp-content/uploads/square-headshot-2.png"
                              alt="bootstrap testimonial carousel slider 2"
                            />
                          </div>
                          <div>
                            <h5 className="card-title fw-bold">June Doe</h5>
                            <span className="text-secondary">
                              CEO, Example Company
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="carousel-item">
                  <div className="fgfghjg55">
                    <div className="card shadow-sm rounded-3">
                      <div className="quotes display-2 text-body-tertiary">
                        <i className="bi bi-quote"></i>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          "Some quick example text to build on the card title
                          and make up the bulk of the card's content."
                        </p>
                        <div className="d-flex align-items-center pt-2">
                          <div className="hgfgf">
                            <img
                              src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                              alt="bootstrap testimonial carousel slider 2"
                            />
                          </div>
                          <div>
                            <h5 className="card-title fw-bold">John Doe</h5>
                            <span className="text-secondary">
                              CEO, Example Company
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="carousel-item">
                  <div className="fgfghjg55">
                    <div className="card shadow-sm rounded-3">
                      <div className="quotes display-2 text-body-tertiary">
                        <i className="bi bi-quote"></i>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          "Some quick example text to build on the card title
                          and make up the bulk of the card's content."
                        </p>
                        <div className="d-flex align-items-center pt-2">
                          <div className="hgfgf">
                            <img
                              src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                              alt="bootstrap testimonial carousel slider 2"
                            />
                          </div>
                          <div>
                            <h5 className="card-title fw-bold">John Doe</h5>
                            <span className="text-secondary">
                              CEO, Example Company
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="carousel-item">
                  <div className="fgfghjg55">
                    <div className="card shadow-sm rounded-3">
                      <div className="quotes display-2 text-body-tertiary">
                        <i className="bi bi-quote"></i>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          "Some quick example text to build on the card title
                          and make up the bulk of the card's content."
                        </p>
                        <div className="d-flex align-items-center pt-2">
                          <div className="hgfgf">
                            <img
                              src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                              alt="bootstrap testimonial carousel slider 2"
                            />
                          </div>
                          <div>
                            <h5 className="card-title fw-bold">John Doe</h5>
                            <span className="text-secondary">
                              CEO, Example Company
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="carousel-item">
                  <div className="fgfghjg55">
                    <div className="card shadow-sm rounded-3">
                      <div className="quotes display-2 text-body-tertiary">
                        <i className="bi bi-quote"></i>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          "Some quick example text to build on the card title
                          and make up the bulk of the card's content."
                        </p>
                        <div className="d-flex align-items-center pt-2">
                          <div className="hgfgf">
                            <img
                              src="https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg"
                              alt="bootstrap testimonial carousel slider 2"
                            />
                          </div>
                          <div>
                            <h5 className="card-title fw-bold">John Doe</h5>
                            <span className="text-secondary">
                              CEO, Example Company
                            </span>
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

export default InstituteProfile;
