import React from "react";
import "./Home.css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
const HomePageBanner = () => {
  return (
    <>
      <div className="banner">
        <div className="banner_content">
          <div className=" px-5">
            {/* <div className="row align-items-center container-homepage"> */}
            <div className="container-homepage">
              <div className="col-lg-8 mb-4">
                <div className="iduherr_left">
                  <h1>Share Your Superpower,</h1>
                  {/* <h2 style={{ color: "white" }}>Become a Mentor</h2> */}
                  <h1>Become a Mentor</h1>
                  <p className="mentorDescription">
                    Turn your skills into someone else's success story and make
                    a difference!
                  </p>

                  <button className="btn mt-5 btn-main mobbtn">
                    <Link target="_blank" to="/mentor-registration">
                      Register Now
                    </Link>
                  </button>
                </div>
              </div>
              <div className="col-lg-4 mb-4 testbackg">
                <div className="iduherr_right">
                  <div className="owl-carousel udguafr_slider owl-theme carousel-react">
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={1}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      modules={[Autoplay]}
                      className="mySwiper "
                    >
                      <SwiperSlide>
                        <div>
                          <div className=" text-center swiper-img-home">
                            <img
                              src="https://practiwizstorage.blob.core.windows.net/practiwizcontainer/mentorprofilepictures/1728050519561-rituraj.jfif"
                              alt="Mentor"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className="doiuher_content text-center">
                            <h4 className="mb-0 gdgdght">
                              Rituraj Chaturmohta
                            </h4>
                            <p className="profession mb-0 gdgdght">
                              Growth Lead
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div>
                          <div className=" text-center swiper-img-home">
                            <img
                              src="https://practiwizstorage.blob.core.windows.net/practiwizcontainer/mentorprofilepictures/1727617085477-PDPic.png"
                              alt="Mentor"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className="doiuher_content text-center my-0">
                            <h4 className="mb-0 gdgdght">Puneet Dhawan</h4>
                            <p className="profession mb-0 gdgdght">
                              Executive Director
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div>
                          <div className=" text-center swiper-img-home">
                            <img
                              src="https://practiwizstorage.blob.core.windows.net/practiwizcontainer/mentorprofilepictures/1728067572082-jhdihdd.jpg"
                              alt="Mentor"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className="doiuher_content text-center my-0">
                            <h4 className="mb-0 gdgdght">Gaurav Jalote</h4>
                            <p className="profession mb-0 gdgdght">
                              Real Estate
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div>
                          <div className=" text-center swiper-img-home">
                            <img
                              src="https://practiwizstorage.blob.core.windows.net/practiwizcontainer/mentorprofilepictures/1728534661839-Rajeev%20Profile%20Pic.jpg"
                              alt="Mentor"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className="doiuher_content text-center my-0">
                            <h4 className="mb-0 gdgdght">RAJEEV SONI</h4>
                            <p className="profession mb-0 gdgdght">
                              PRODUCT HEAD
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div>
                          <div className=" text-center swiper-img-home">
                            <img
                              src="https://practiwizstorage.blob.core.windows.net/practiwizcontainer/mentorprofilepictures/1728291881552-Ritendra.jfif"
                              alt="Mentor"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className="doiuher_content text-center my-0">
                            <h4 className="mb-0 gdgdght">Ritendra Banerjee</h4>
                            <p className="profession mb-0 gdgdght">
                              Entrepreneur and C level Advisory
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div>
                          <div className=" text-center swiper-img-home">
                            <img
                              src="https://practiwizstorage.blob.core.windows.net/practiwizcontainer/mentorprofilepictures/1728224940276-1605063794631.jpeg"
                              alt="Mentor"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div className="doiuher_content text-center my-0">
                            <h4 className="mb-0 gdgdght">Santosh Rout</h4>
                            <p className="profession mb-0 gdgdght">Founder</p>
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
    </>
  );
};

export default HomePageBanner;
