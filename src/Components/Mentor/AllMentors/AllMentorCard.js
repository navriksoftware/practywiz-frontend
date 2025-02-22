import React from "react";
import StarRating from "../../../Utils/StartRating";
import "./AllMentorsMobile.css";

const AllMentorCard = ({ mentor }) => {
  let mentorName = mentor.user_firstname + " " + mentor.user_lastname;
 
  function toTitleCase(str) {
    if (!str) return ""; // Handle null or undefined values
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div
      className="AllMentorCard-profile-card"
      onClick={() =>
        (window.location.href = `/mentor-club/mentor-profile/${mentorName
          .replace(/\s+/g, "-")
          .toLowerCase()}/${mentor.user_dtls_id}`)
      }
    >
      <div>
        {/* Profile Image Section */}

        <div className="AllmentorCard-price-tag">
          {mentor.mentor_currency_type} {mentor.mentor_session_price} /Hr
        </div>
        <div className="AllMentorCard-image-container">
          <div className="AllMentorCard-rating">
            <i
              className="fa-solid fa-star"
              style={{ color: "gold", fontSize: "13px" }}
            ></i>
            {mentor.avg_mentor_rating === null ? 4.5 : mentor.avg_mentor_rating}
          </div>

          <div className="AllMentorCard-photo-placeholder">
            <img
              src={mentor.mentor_profile_photo}
              alt={mentor.user_firstname + " " + mentor.user_lastname}
              className="AllMentorCard-photo-placeholder"
              loading="eager"
            />
          </div>
          {/* Reaction Buttons */}
          <div className="AllMentorCard-reaction-buttons">
            {mentor.mentor_area_expertise !== "undefined" &&
              mentor?.mentor_area_expertise &&
              mentor.mentor_area_expertise !== "[]" && (
                <>
                  {JSON.parse(mentor?.mentor_area_expertise)
                    .slice(0, 3)
                    ?.map((skill, index) => (
                      <span key={index} className="AllmentorCard-skill-item">
                        {skill}
                      </span>
                    ))}
                </>
              )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="AllMentorCard-profile-info">
          {/* Name and Title */}
          <div className="AllMentorCard-user-details">
            <div className="AllMentorCard-name-location">
              <h2>
                {toTitleCase(mentor.user_firstname) +
                  " " +
                  toTitleCase(mentor.user_lastname)}
              </h2>
              <span className="AllMentorCard-location">
                ({mentor.mentor_country})
              </span>
            </div>
            <div className="AllMentorCardInline">
              {" "}
              <i class="fa-solid fa-briefcase IconestyleBrifcase"></i>{" "}
              <span className="AllMentorCard-job-title">
                {" "}
                {mentor.mentor_job_title}
              </span>
            </div>

            <div className="AllMentorCardInline">
              <i className="fa-regular fa-at AttherateIcone "></i>
              <span className="AllMentorCard-company">
                {" "}
                {mentor.mentor_company_name}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="AllMentorCard-tags">
            {JSON.parse(mentor.mentor_language || "[]").map(
              (language, index, arr) => (
                <span key={index} className="AllMentorCard-language-tag">
                  {/* {index < arr.length && ' • '}  */}
                  {language.label}{" "}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Experience and Domain */}
      <div className="AllMentorCard-footer">
        <div className="AllMentorCard-footer-item">
          <div className="AllMentorCard-label">Domain</div>
          <div className="AllMentorCard-value">
            {mentor?.mentor_domain &&
              mentor.mentor_domain !== "[]" &&
              JSON.parse(mentor.mentor_domain)
                .slice(0, 3)
                .map((domain, index, arr) => (
                  <span key={index}>
                    {toTitleCase(domain)}
                    {index < arr.length - 1 && " | "}
                  </span>
                ))}
          </div>
        </div>

        <div className="AllMentorCard-footer-itemExp">
          <div className="AllMentorCard-label">Experience</div>
          <div className="AllMentorCard-value">
            {mentor.mentor_years_of_experience?.split("-")[0] + "+"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMentorCard;
