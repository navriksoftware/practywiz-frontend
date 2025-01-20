import React, { useState, useEffect } from "react";
import "./HomeCSS/RecentInternshipsSection.css";
import axios from "axios";
import { ApiURL } from "../../Utils/ApiURL";
import SkeletonOfSection2 from "./SkeletonOfSection2";

const RecentInternshipsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const url = ApiURL();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesPerView = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  };

  const getMaxSlides = () => {
    const slidesPerView = getSlidesPerView();
    return Math.max(0, Math.ceil(internships.length - slidesPerView));
  };

  const fetchInternshipListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}api/v1/employer/internship/fetch-10-internships`
      );
      setInternships(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch internship listings");
      setLoading(false);
      console.error("Error fetching internship listings:", err);
    }
  };

  useEffect(() => {
    fetchInternshipListings();
  }, []);
  console.log(internships);

  useEffect(() => {
    const maxSlides = getMaxSlides();
    if (currentSlide > maxSlides) {
      setCurrentSlide(maxSlides);
    }
  }, [windowWidth, internships.length]);

  const nextSlide = () => {
    const maxSlides = getMaxSlides();
    setCurrentSlide((current) => (current >= maxSlides ? 0 : current + 1));
  };

  const prevSlide = () => {
    const maxSlides = getMaxSlides();
    setCurrentSlide((current) => (current === 0 ? maxSlides : current - 1));
  };

  const getSlideWidth = () => {
    const slidesPerView = getSlidesPerView();
    return 100 / slidesPerView;
  };

  if (loading) {
    return (
      <div className="featured-mentor-slider-loading">
        <SkeletonOfSection2 />
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="recent_internships_container">
        <div className="recent_internships_header">
          <h2>
            Recent <span className="recent_internships_highlight">Guided</span>{" "}
            Internship
          </h2>
        </div>
        <div className="recent_internships_container-inner">
          <svg
            viewBox="0 0 240 180"
            className="recent_internships_illustration"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="120"
              cy="90"
              r="60"
              className="recent_internships_bg_circle_large"
            />
            <circle
              cx="120"
              cy="90"
              r="40"
              className="recent_internships_bg_circle_small"
            />

            <path
              d="M100 70h40v-10c0-2.8-2.2-5-5-5h-30c-2.8 0-5 2.2-5 5v10z"
              className="recent_internships_briefcase_top"
            />
            <rect
              x="85"
              y="70"
              width="70"
              height="50"
              rx="5"
              className="recent_internships_briefcase_bottom"
            />

            <circle
              cx="120"
              cy="90"
              r="25"
              className="recent_internships_clock_face"
            />
            <path
              d="M120 90l-15 0M120 90l0 -12"
              className="recent_internships_clock_hands"
            />
            <circle
              cx="120"
              cy="90"
              r="3"
              className="recent_internships_clock_center"
            />
          </svg>

          <h2 className="recent_internships_title">No Internships Available</h2>
          <p className="recent_internships_description">
            There are currently no internship positions open. Check back soon or
            post a new internship opportunity.
          </p>

          <button
            onClick={() => (window.location.href = "/employer-registration")}
            className="recent_internships_button"
          >
            <svg
              className="recent_internships_button_icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span> Post Internship</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recent_internships_container">
      <div className="recent_internships_header">
        <h2>
          Recent <span className="recent_internships_highlight">Guided</span>{" "}
          Internship
        </h2>
      </div>

      <div className="recent_internships_slider_wrapper">
        <div className="recent_internships_slider_content">
          <div
            className="recent_internships_slider_track"
            style={{
              transform: `translateX(-${currentSlide * getSlideWidth()}%)`,
            }}
          >
            {internships.map((internship, index) => (
              <div
                key={index}
                className="recent_internships_card"
                style={{ flex: `0 0 ${getSlideWidth()}%` }}
              >
                <div className="recent_internships_card_inner">
                  <div className="recent_internships_card_header">
                    <div className="recent_internships_supervision_type">
                      {internship.employer_internship_post_supervision_type}
                    </div>
                    <h3>{internship.employer_internship_post_position}</h3>
                    <div className="recent_internships_company_name">
                      {internship.employer_organization_name}
                    </div>
                  </div>

                  <div className="recent_internships_card_details">
                    <div className="recent_internships_detail_item">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>
                        {internship.employer_internship_post_location}
                      </span>
                    </div>
                    <div className="recent_internships_detail_item">
                      <i className="fa-solid fa-indian-rupee-sign"></i>
                      <span>
                        ₹ {internship.employer_internship_post_stipend_amount}
                        /month
                      </span>
                    </div>
                    <div className="recent_internships_detail_item">
                      <i className="fa-regular fa-clock"></i>
                      <span>
                        {internship.employer_internship_post_duration} months
                      </span>
                    </div>
                  </div>

                  <button className="recent_internships_view_details">
                    View details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {internships.length > getSlidesPerView() && (
          <>
            <button
              className="recent_internships_nav_button recent_internships_prev"
              onClick={prevSlide}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="recent_internships_nav_button recent_internships_next"
              onClick={nextSlide}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}

        <div className="recent_internships_dots">
          {[...Array(getMaxSlides() + 1)].map((_, index) => (
            <button
              key={index}
              className={`recent_internships_dot ${
                currentSlide === index ? "recent_internships_dot_active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentInternshipsSection;
