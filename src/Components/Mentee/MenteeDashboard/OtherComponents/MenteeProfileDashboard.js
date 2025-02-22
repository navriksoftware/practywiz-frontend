// MenteeProfileDashboard.jsx
import React from "react";
import "./MenteeDashboardProfile.css";

const MenteeProfileDashboard = ({ singleMentee, user, token }) => {
  return (
    <div className="mentee-dashboard">
      {singleMentee?.map((mentee, index) => (
        <div key={index} className="dashboard-container">
          {/* Cover Section */}

          {/* Main Content */}
          <div className="main-content">
            <div className="content-grid">
              {/* Left Column */}
              <div className="left-column">
                <div className="profile-cover">
                  <div className="cover-content">
                    <div className="profile-header">
                      <div className="menteeProfile-photoName">
                        <div className="profile-image-container">
                          <img
                            src={mentee?.mentee_profile_pic_url}
                            alt={mentee.mentee_firstname}
                            className="profile-imageDashBoard"
                          />
                        </div>

                        <div className="mentee-dashboardHeadline">
                          {" "}
                          <div className="MenteeDashboard-info-section">
                            <span className="mentee-name">
                              {mentee.mentee_firstname.toUpperCase()}{" "}
                              {mentee.mentee_lastname.toUpperCase()}
                            </span>
                          </div>
                          {/* About */}
                          <div className="info-item">
                            <p className="about-text">{mentee?.mentee_about}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="skills-section">
                  <h4>Skills</h4>
                  <div className="skills-container">
                    {JSON.parse(mentee?.mentee_skills)?.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="experience-section">
                  <div className="section-header">
                    {/* <img src="/api/placeholder/24/24" alt="Experience" /> */}
                    <h3>Work Experience</h3>
                  </div>
                  <div className="experience-content">
                    <div className="work-experience-container">
                      {JSON.parse(mentee?.mentee_experience_details)?.map(
                        (Info, index) => (
                          <div key={index} className="experience-card">
                            <div className="experience-header">
                              <h3 className="company-name">
                                {Info.mentee_workexp_CompanyName}
                              </h3>
                              <div className="duration">
                                <span>{Info.mentee_workexp_Start_Year}</span>
                                <span className="duration-separator">-</span>
                                <span>{Info.mentee_workexp_End_Year}</span>
                              </div>
                            </div>

                            <h4 className="role-title">
                              {Info.mentee_workexp_Role}
                            </h4>

                            <p className="experience-description">
                              {Info.mentee_workexp_Desc}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {/* Certification Section */}
                <div className="certification-section">
                  <div className="section-header">
                    <h3>Certifications</h3>
                  </div>

                  <div className="certification-content">
                    {JSON.parse(mentee?.mentee_certificate_details)?.map(
                      (Info, index) => (
                        <div key={index} className="certification-card">
                          <div className="certification-header">
                            <h4 className="certificate-name">
                              {Info.mentee_Certificate_Name}
                            </h4>
                            <span className="certificate-level">
                              {Info.mentee_Certificate_level}
                            </span>
                          </div>

                          <div className="certificate-details">
                            <div className="certificate-duration">
                              <span>{Info.mentee_Certificate_Start_Year}</span>
                              <span className="duration-separator">-</span>
                              <span>{Info.mentee_Certificate_End_Year}</span>
                            </div>

                            <p className="certificate-description">
                              {Info.mentee_Certificate_Desc}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="additional-section mt-4">
                  <div className="section-header">
                    <h3>Additional Information</h3>
                  </div>

                  <div className="additional-content">
                    {JSON.parse(mentee?.mentee_additional_details)?.map(
                      (detail, index) => (
                        <div key={index} className="additional-card">
                          <h4 className="additional-headline">
                            {detail.additionalHeadline}
                          </h4>
                          <p className="additional-description">
                            {detail.additionalDec}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="right-column">
                {/* Personal Details */}
                <div className="details-card">
                  {/* <h5 className="card-title">Personal Details</h5> */}
                  <div className="detail-item">
                    <div className="detail-header">
                      {/* <img src="/api/placeholder/20/20" alt="Education" /> */}
                      <h6>Profession:</h6>
                    </div>
                    <p>{mentee?.mentee_type}</p>
                  </div>

                  <div className="detail-item">
                    <div className="detail-header">
                      {/* <i className="fa-solid fa-envelope"></i> */}
                      <h6>Email:</h6>
                    </div>
                    <p>{mentee?.mentee_email}</p>
                  </div>

                  <div className="detail-item">
                    <div className="detail-header">
                      {/* <img src="/api/placeholder/20/20" alt="Gender" /> */}
                      <h6>Gender:</h6>
                    </div>
                    <p>{mentee?.mentee_gender}</p>
                  </div>

                  <div className="detail-item">
                    <div className="detail-header">
                      {/* <img src="/api/placeholder/20/20" alt="Language" /> */}
                      <h6>Language:</h6>
                    </div>
                    <div className="language-list">
                      {mentee?.mentee_language ? (
                        // Parse the mentee_language only once and check if it's an array with data
                        (() => {
                          try {
                            const languages = JSON.parse(
                              mentee.mentee_language
                            );
                            return languages?.length > 0 ? (
                              languages.map((lang, idx, arr) => (
                                <p key={idx}>
                                  {lang.value}
                                  {idx < arr.length - 1 && ", "}
                                </p>
                              ))
                            ) : (
                              <p>No languages available</p>
                            );
                          } catch (error) {
                            console.error(
                              "Error parsing mentee_language:",
                              error
                            );
                            return <p>No languages available</p>;
                          }
                        })()
                      ) : (
                        <p>No languages available</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="education-section">
                  <div className="section-header">
                    <h3>Education</h3>
                  </div>

                  <div className="education-content">
                    {JSON.parse(mentee?.mentee_institute_details)?.map(
                      (detail, index) => {
                        if (detail.educationType === "college") {
                          return (
                            <div key={index} className="education-card">
                              <div className="education-type">
                                {detail.educationType}
                              </div>
                              <h4 className="school-name">
                                {detail.collage_name}
                              </h4>
                              <h4 className="course-name">
                                {detail.mentee_courseName}
                              </h4>

                              <div className="education-details">
                                <div className="detail-group">
                                  <span className="detail-label">
                                    Duration:
                                  </span>
                                  <span className="detail-value">
                                    {detail.mentee_institute_Start_Year} -{" "}
                                    {detail.mentee_institute_End_Year}
                                  </span>
                                </div>

                                <div className="detail-group">
                                  <span className="detail-label">
                                    Percentage:
                                  </span>
                                  <span className="detail-value">
                                    {detail.mentee_institute_Percentage}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        } else if (detail.educationType === "school") {
                          return (
                            <div key={index} className="education-card">
                              <div className="education-type">
                                {detail.educationType}
                              </div>
                              <h4 className="school-name">
                                {detail.school_name}
                              </h4>

                              <div className="education-details">
                                <div className="detail-group">
                                  <span className="detail-label">Board:</span>
                                  <span className="detail-value">
                                    {detail.schoolBoard}
                                  </span>
                                </div>

                                <div className="detail-group">
                                  <span className="detail-label">Class:</span>
                                  <span className="detail-value">
                                    {detail.schoolClass}
                                  </span>
                                </div>

                                <div className="detail-group">
                                  <span className="detail-label">
                                    Location:
                                  </span>
                                  <span className="detail-value">
                                    {detail.school_location}%
                                  </span>
                                </div>

                                <div className="detail-group">
                                  <span className="detail-label">
                                    Duration:
                                  </span>
                                  <span className="detail-value">
                                    {detail.schoolStartYear} -{" "}
                                    {detail.schoolEndYear}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    )}
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

export default MenteeProfileDashboard;

// MenteeProfileDashboard.css
