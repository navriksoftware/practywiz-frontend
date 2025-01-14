import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Wide from "../../Images/Home/wide-angle-shot-schonbrunn-palace-vienna-austria-with-cloudy-blue-sky-min.jpg";
import Herc from "../../Images/Home/hercules-hall-surrounded-by-greenery-sunlight-daytime-munich-germany-min.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./Home.css";
const Section5 = () => {
  return (
    <>
      <div className="section5a py-5">
        <div className="container">
          <div className="gnjhbff">
            <h2>OUR PARTNERS</h2>
          </div>

          <div className="duygerre_partners mt-4">
            <div
              className="owl-carousel opslider owl-theme"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <Swiper
                spaceBetween={50}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                  // when the viewport is >= 1024px (large screens)
                  1024: {
                    slidesPerView: 3,
                  },
                  // when the viewport is >= 768px (tablets)
                  768: {
                    slidesPerView: 2,
                  },
                  // when the viewport is <= 767px (mobile devices)
                  0: {
                    slidesPerView: 1,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="item">
                    <div className="diuehrrtrer">
                      <img className="image carousel2" src={Wide} alt="wide" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item">
                    <div className="diuehrrtrer">
                      <img className="image carousel2" src={Herc} alt="wide" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <div className="item">
                    <div className="diuehrrtrer">
                      <img className="image carousel2" src={Wide} alt="wide" />
                    </div>
                  </div>
                </SwiperSlide>{" "}
                <SwiperSlide>
                  <div className="item">
                    <div className="diuehrrtrer">
                      <img className="image carousel2" src={Herc} alt="wide" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <div className="item">
                    <div className="diuehrrtrer">
                      <img className="image carousel2" src={Wide} alt="wide" />
                    </div>
                  </div>
                </SwiperSlide>{" "}
                <SwiperSlide>
                  <div className="item">
                    <div className="diuehrrtrer">
                      <img className="image carousel2" src={Herc} alt="wide" />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section5;
