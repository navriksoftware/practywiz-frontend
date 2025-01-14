import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../../../Utils/StartRating";
import "./AllMentorsMobile.css";
const AllMentorCard = ({ mentor }) => {
  let mentorName = mentor.user_firstname + " " + mentor.user_lastname;
  return (
    <div className="ghfghgfhg mob-allmentor-container">
      <div className="jghdfrg">
        <div className="kmg">
          <img
            src={mentor.mentor_profile_photo}
            alt={mentor.user_firstname + " " + mentor.user_lastname}
          />
        </div>
        <div className="dfhjbghfjgfgh22">
          <h4
            style={{
              textTransform: "capitalize",
              marginBottom: "5px !IMPORTANT",
            }}
          >
            {mentor.user_firstname + " " + mentor.user_lastname}
          </h4>
          <h5 style={{ textTransform: "capitalize" }}>
            {mentor.mentor_job_title}
          </h5>
          <span className="span121">
            <StarRating rating={mentor.avg_mentor_rating} />
          </span>

          <p>
            {mentor.mentor_session_count} Sessions ({mentor.feedback_count}
            Reviews)
          </p>

          <div className="kbfhgfgfg">
            <button className="btn-main">
              <Link
                to={`/mentor-club/mentor-profile/${mentorName
                  .replace(" ", "-")
                  .toLowerCase()}/${mentor.user_dtls_id}`}
              >
                VIEW PROFILE
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMentorCard;
