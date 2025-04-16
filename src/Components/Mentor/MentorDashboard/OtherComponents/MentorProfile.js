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
  // function countSessions(sessionData) {
  //   // Parse JSON if it's a string
  //   const sessions = typeof sessionData === "string" ? JSON.parse(sessionData) : sessionData;

  //   // Count sessions
  //   if (!Array.isArray(sessions)) {
  //     return { completed: 0, upcoming: 0 };
  //   }
  //   else {

  //     return sessions.reduce(
  //       (acc, session) => {
  //         if (session.mentor_session_status === "completed") {
  //           acc.completed += 1;
  //         } else if (session.mentor_session_status === "upcoming") {
  //           acc.upcoming += 1;
  //         }
  //         return acc;
  //       },
  //       { completed: 0, upcoming: 0 }
  //     );
  //   }

  // }



  return (
    <div className="mentor-profile">
      {data?.map((sMentor, index) => {

        const BookingJsonList = JSON.parse(sMentor?.booking_dtls_list)
        // const sessionCount = countSessions(BookingJsonList);
        // const educationList = JSON.parse(sMentor?.mentor_institute);
        return (

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
                      {sMentor.feedback_count})
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
{/* 
                <div className="MentorProfile-mentor-profile-col3">
                  <div className="mentorprofile-card mentorprofile-upcoming">
                    <div className="mentorprofile-card-title">Upcoming Sessions</div>
                    <div className="mentorprofile-count"> {sessionCount.upcoming}</div>
                  </div>

                  <div className="mentorprofile-card mentorprofile-completed">
                    <div className="mentorprofile-card-title">Completed Sessions</div>
                    <div className="mentorprofile-count">{sessionCount.completed}</div>
                  </div>
                </div> */}

                {/* <div className="MentorProfile-mentor-profile-col3">
                  <div className="MentorProfile-UpcomingSessionInfo">
                    <span>Upcoming Sessions</span>
                    {sessionCount.upcoming}

                  </div>

                  <div className="MentorProfile-UpcomingSessionInfo">
                    <span>Completed Sessions</span>
                    {sessionCount.completed}
                  </div>


                </div> */}
                {/* Education Details */}
                {/* <div className="mentorprofile-education-container">
                  <h2 className="mentorprofile-education-title">Education Details</h2>

                  <div className="mentorprofile-education-list">
                    {educationList.map((edu, index) => (
                      <div key={index} className="mentorprofile-education-card">
                        <div>
                          <h3 className="mentorprofile-degree">{edu.Degree}</h3>
                          <p className="mentorprofile-institute">{edu.Institute}</p>
                          <p className="mentorprofile-year">
                            Year of Completion: <span className="mentorprofile-year-highlight">{edu.YearCompletion}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Skills Section */}
                <div className="mentor-skills">
                  <div className="skills-header">
                    <span className="skills-title">Skills</span>
                  </div>
                  {sMentor.mentor_area_expertise !== "undefined" &&
                    sMentor?.mentor_area_expertise &&
                    sMentor.mentor_area_expertise !== "[]" &&
                    <div className="MentorProfile-SkillsShow"> {JSON.parse(sMentor?.mentor_area_expertise)?.map(
                      (skill, index) => (

                        <span key={index} className="MentorDashboardskill-tag">
                          {skill}
                        </span>
                      )
                    )}
                    </div>
                  }
                </div>


                <div className="MentorDashboard-RatingSection">
                  <div>
                    {" "}
                    <span className="SingleMentor-SkillsHeadline">
                      Reviews
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
        )
      })}
    </div>
  );
};

export default MentorProfile;
