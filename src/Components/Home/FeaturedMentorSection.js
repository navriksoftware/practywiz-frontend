import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import { ApiURL } from "../../Utils/ApiURL";
import { json, Link } from "react-router-dom";
import StarRating from "../../Utils/StartRating";
import SkeletonOfSection2 from "./SkeletonOfSection2";
import "./HomeCSS/FeaturedMentorSection.css";

const FeaturedMentorSection = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.get(`${url}api/v1/mentor/fetch-10-mentors`),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);
        if (response.data.success) {
          setMentors(response.data.success);
        }
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const MentorCard = ({ mentor }) => (
    <div className="featured-mentor-card">
      <Link
        target="_blank"
        to={`/mentor-club/mentor-profile/${
          mentor.mentor_firstname
        }-${mentor.mentor_lastname.toLowerCase()}/${mentor.user_dtls_id}`}
      >
        <div className="featured-mentor-image-wrapper">
          <img
            src={mentor.mentor_profile_photo}
            alt={`${mentor.mentor_firstname} ${mentor.mentor_lastname}`}
            className="featured-mentor-profile-img"
          />

          <div className="featured-mentor-rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="featured-mentor-star-icon"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {mentor.avg_mentor_rating !== null ? (
              <span>mentor.avg_mentor_rating </span>
            ) : (
              <span>5</span>
            )}
          </div>
          {mentor.company && (
            <div className="featured-mentor-company-badge">
              <img src="/google-logo.png" alt="Company Logo" />
            </div>
          )}
          {/* add on the photo */}
          {mentor.mentor_area_expertise &&
            mentor.mentor_area_expertise !== "undefined" && (
              <div className="featured-mentor-expertise-badge">
                {JSON.parse(mentor.mentor_area_expertise)
                  .slice(0, 3)
                  .map((expertise, index) => (
                    <span key={index} className="featured-mentor-expertise-tag">
                      {expertise}
                    </span>
                  ))}
              </div>
            )}
        </div>
        <div className="featured-mentor-details">
          <h3 className="featured-mentor-name">
            {mentor.mentor_firstname} {mentor.mentor_lastname}
          </h3>
          <p className="featured-mentor-position">{mentor.mentor_job_title}</p>
          {mentor.mentor_domain && (
            <div className="featured-mentor-skills">
              {JSON.parse(mentor.mentor_domain)
                .slice(0, 3)
                .map((domain, index) => (
                  <span key={index} className="featured-mentor-skill-tag">
                    {domain}
                  </span>
                ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );

  if (loading) {
    return (
      <div className="featured-mentor-slider-loading">
        <SkeletonOfSection2 />
      </div>
    );
  }

  return (
    <section className="featured-mentor-section">
      <div className="featured-mentor-container">
        <div className="featured-mentor-header">
          <div className="featured-mentor-header-content">
            <h2 className="featured-mentor-title">Featured Mentors</h2>
            <p className="featured-mentor-description">
              Learn from industry experts who've been there. Our top-rated
              mentors bring years of real-world experience to guide you on your
              professional journey.
            </p>
          </div>
          <Link to="/mentor-club" className="featured-mentor-view-all">
            View all Mentors
          </Link>
        </div>

        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{
            loop: true,
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[Autoplay]}
          className="featured-mentor-slider"
        >
          {mentors.map((mentor, index) => (
            <SwiperSlide key={index}>
              <MentorCard mentor={mentor} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Link to="/mentor-club" className="featured-mentor-view-all-mobile">
          View all Mentors
        </Link>
      </div>
    </section>
  );
};

export default FeaturedMentorSection;
