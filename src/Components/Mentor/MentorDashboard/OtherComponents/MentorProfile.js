// MentorProfile.jsx
import React, { useState } from "react";
import MentorRatingCard from "../../AllMentors/SingleMentorProfile/MentorRatingCard";
import StarRating from "../../../../Utils/StartRating";
import "../DashboardCSS/Mentor.css";
const MentorProfile = ({ data, user, token }) => {
  const [showLessText, setShowLessText] = useState(false);

  function toTitleCase(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="mentor-profile">
      {data?.map((sMentor, index) => (
        <div key={index} className="mentor-profile-mainpage">
          {/* Blue ribbon at top */}

          <div className="Dashoboard-mentor-profile-ribbon ">
            {sMentor.mentor_social_media_profile && (
              <div className="MentorProfile-linkedin-Icon">
                <a
                  href={sMentor.mentor_social_media_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link"
                >
                  <i className="fa-brands fa-linkedin fa-2xl"></i>
                </a>
              </div>
            )}
          </div>

          {/* Main content container */}

          <div className="MentorProfile-container">
            <div className="mentor-profile-content">
              {/* Left Column */}
              <div className="mentor-profile-col1">
                <div className="mentor-image-container">
                  <img
                    src={sMentor.mentor_profile_photo}
                    className="mentor-image"
                    alt={
                      sMentor.mentor_firstname + " " + sMentor.mentor_lastname
                    }
                    style={{ borderRadius: "15px", width: "100%" }}
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className="MentorProfile-mentor-profile-col2">
                <div className="MentorProfile-name-section">
                  <span className="MentorProfile-mentor-name">
                    {toTitleCase(sMentor?.mentor_firstname)}{" "}
                    {toTitleCase(sMentor?.mentor_lastname)}
                  </span>
                  <span className="MentorProfile-span121 span121">
                    <StarRating rating={sMentor.avg_mentor_rating} />(
                    {sMentor.feedback_count} Reviews)
                  </span>
                </div>

                <div className="MentorProfile-mentor-company">
                  {toTitleCase(sMentor.mentor_job_title)} @{" "}
                  {toTitleCase(sMentor.mentor_company_name)}{" "}
                </div>

                <div className="mentor-domains">
                  {sMentor?.mentor_domain &&
                    sMentor.mentor_domain !== "[]" &&
                    JSON.parse(sMentor.mentor_domain)?.map(
                      (domain, index, arr) => (
                        <span key={index} className="domain-tag">
                          {toTitleCase(domain)}
                          {index < arr.length - 1 && " |"}
                        </span>
                      )
                    )}
                </div>
                <div className="mentor-description">
                  <p className="mentor-headline">
                    {!showLessText
                      ? sMentor.mentor_headline.slice(0, 300) + " "
                      : sMentor.mentor_headline}
                    <span
                      className="show-more-text"
                      onClick={() => setShowLessText(!showLessText)}
                    >
                      {!showLessText ? "see more" : "see less"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mentor-skills">
                <div className="skills-header">
                  <span className="skills-title">Skills</span>
                </div>
                {sMentor.mentor_area_expertise !== "undefined" &&
                  sMentor?.mentor_area_expertise &&
                  sMentor.mentor_area_expertise !== "[]" &&
                  JSON.parse(sMentor?.mentor_area_expertise)?.map(
                    (skill, index) => (
                      <span key={index} className="MentorDashboardskill-tag">
                        {skill}
                      </span>
                    )
                  )}
              </div>
              <div className="MentorDashboard-RatingSection">
                <div>
                  {" "}
                  <span className="SingleMentor-SkillsHeadline">
                    Ratings and Reviews
                  </span>
                </div>
                <div>
                  {" "}
                  <div id="tab-10" className="">
                    <div className="jfgghghhghkgkhjg">
                      <div className="jhdfgfjgg">
                        <MentorRatingCard
                          feedbackCount={sMentor.feedback_count}
                          feedback_details={sMentor.feedback_details}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MentorProfile;
