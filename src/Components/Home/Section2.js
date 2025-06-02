import React, { useEffect, useState } from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Home.css";
import axios from "axios";
import { ApiURL } from "../../Utils/ApiURL";
import { Link } from "react-router-dom";
import StarRating from "../../Utils/StartRating";
import SkeletonOfSection2 from "./SkeletonOfSection2";
const Section2 = () => {
  const [allMentors, setAllMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);

        const response = await Promise.race([
          axios.get(`${url}api/v1/mentor/fetch-10-mentors`),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllMentors(response.data.success);
        } else if (response.data.error) {
          setAllMentors([]);
        }
      } catch (error) {
        setAllMentors([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false); // Ensure loading is stopped regardless of outcome
      }
    };
    fetchMentors();
  }, [url]);
  return (
    <>
      <div className="section2 py-5 section-hor-gap">
        <div className="container ">
          <div className="hjfgdfgfg">
            <h2>Our Featured Mentors</h2>
          </div>
          <div>
            <div className="khjfdgdf">
              <div
                className="owl-carousel ihdieruir_slider owl-theme"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  overflow: "hidden",
                }}
              >
                {loading && (
                  <>
                    <SkeletonOfSection2 />
                    <SkeletonOfSection2 />
                    <SkeletonOfSection2 />
                  </>
                )}
                <Swiper
                  spaceBetween={50}
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
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper"
                >
                  {!loading &&
                    allMentors.length > 0 &&
                    allMentors?.map((mentor, index) => {
                      return (
                        <SwiperSlide>
                          <div className="item" key={index}>
                            <div className="iheroijr_inner bg-white text-center overflow-hidden position-relative">
                              <div className="diegrher overflow-hidden">
                                <img
                                  src={mentor.mentor_profile_photo}
                                  alt="mentors1"
                                  style={{
                                    width: "240px !important",
                                    height: "400px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div className="doiuher_content">
                                <h4 className="mb-0 gdgdght">
                                  {mentor.mentor_firstname +
                                    " " +
                                    mentor.mentor_lastname}
                                </h4>
                                <p className="profession gdgdght">
                                  {mentor.mentor_job_title}
                                </p>
                                <p className="rating mb-0"></p>
                                {mentor.avg_mentor_rating !== null ? (
                                  <StarRating
                                    rating={mentor.avg_mentor_rating}
                                  />
                                ) : (
                                  <>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                  </>
                                )}

                                <div
                                  className="dhhfff text-center"
                                  style={{ marginTop: "12px" }}
                                >
                                  <button className="btn small-btn-main">
                                    <Link
                                      target="_blanks"
                                      to={`/mentor-connect/mentor-profile/${
                                        mentor.mentor_firstname +
                                        "-" +
                                        mentor.mentor_lastname
                                          .replace(" ", "-")
                                          .toLowerCase()
                                      }/${mentor.user_dtls_id}`}
                                    >
                                      View Profile
                                    </Link>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="dhhfff text-center">
            <button className="btn btn-main">
              <Link to="/mentor-connect" target="_blanks">
                VIEW ALL MENTORS <i className="fa-solid fa-circle-right"></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
