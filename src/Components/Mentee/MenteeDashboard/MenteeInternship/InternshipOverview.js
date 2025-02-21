import React from "react";
import "./InternshipOverview.css";

const InternshipOverview = ({ singleMentee }) => {
  return (
    <div className="mentee-int-profile-overview-container">
      <div className="mentee-int-prof-profile-section-header">
        <h2 className="mentee-int-prof-profile-title">Profile Overview</h2>
        {/* <div className="mentee-int-prof-profile-actions">
          <button className="mentee-int-prof-btn-outline">Edit Profile</button>
          <button className="mentee-int-btn-default">Download</button>
        </div> */}
      </div>

      {singleMentee?.map((mentee, index) => (
        <div key={index} className="mentee-int-profile-overview-wrapper">
          <div className="mentee-int-profile-card">
            <div className="mentee-int-profile-header">
              <img
                src={mentee?.mentee_profile_pic_url}
                alt={mentee.mentee_firstname}
                className="mentee-int-profile-picture"
              />
              <div className="mentee-int-profile-info">
                <h1 className="mentee-int-profile-name">
                  {mentee.mentee_firstname.toUpperCase()}{" "}
                  {mentee.mentee_lastname.toUpperCase()}
                </h1>
                <p className="mentee-int-profile-location">
                  {`${mentee?.mentee_email} | ${mentee.mentee_phone_number}`}
                </p>
                <p className="mentee-int-profile-description">
                  {mentee?.mentee_about}
                </p>
              </div>
              <div className="mentee-int-profile-links">
                <a
                  href={mentee?.mentee_linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mentee-int-icon-link"
                >
                  <i className="fa-brands fa-linkedin mentee-int-icon"></i>
                </a>
              </div>
            </div>

            <div className="mentee-int-profile-skill-section">
              <h2 className="mentee-int-section-title">Skills</h2>
              <div className="mentee-int-skills-container">
                {JSON.parse(mentee?.mentee_skills)?.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mentee-int-profile-section">
              <h2 className="mentee-int-section-title">Education</h2>

              <ul>
                {JSON.parse(mentee?.mentee_institute_details)?.map(
                  (edu, index) => (
                    <li key={index} className="education">
                      {edu.educationType === "college" ? (
                        <>
                          <strong>{edu?.collage_name}</strong> (
                          {edu?.mentee_institute_Start_Year} -{" "}
                          {edu?.mentee_institute_End_Year})
                          <div className="Internapplypage-row">
                            <p>{edu.mentee_courseName}</p>
                            <p>
                              Percentage: {edu?.mentee_institute_Percentage}%
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <strong>{edu?.school_name}</strong> (
                          {edu?.schoolStartYear} - {edu?.schoolEndYear})
                          <div className="Internapplypage-row">
                            <p> {edu?.schoolBoard}</p>
                            <p>Percentage: {edu?.school_location}%</p>
                          </div>
                        </>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mentee-int-profile-section">
              <h2 className="mentee-int-section-title">Experience</h2>

              {JSON.parse(mentee?.mentee_experience_details)?.map(
                (Info, index) => (
                  <div key={index} className="mentee-int-experience-item">
                    <h3 className="experience-title">
                      {" "}
                      {Info.mentee_workexp_Role}
                    </h3>
                    <p className="mentee-int-experience-company">
                      {Info.mentee_workexp_CompanyName} (
                      {Info.mentee_workexp_Start_Year} {"-"}{" "}
                      {Info.mentee_workexp_End_Year})
                    </p>
                    <ul className="mentee-int-experience-list">
                      <li>{Info.mentee_workexp_Desc}</li>
                    </ul>
                  </div>
                )
              )}
            </div>

            <div className="mentee-int-profile-section">
              <h2 className="mentee-int-section-title">Certifications</h2>

              {JSON.parse(mentee?.mentee_certificate_details)?.map(
                (Info, index) => (
                  <div key={index} className="mentee-int-experience-item">
                    <h3 className="experience-title">
                      {" "}
                      {Info.mentee_Certificate_Name}
                    </h3>
                    <p className="mentee-int-experience-company">
                      {Info.mentee_Certificate_level}(
                      {Info.mentee_Certificate_Start_Year} {"-"}{" "}
                      {Info.mentee_Certificate_End_Year})
                    </p>
                    <ul className="mentee-int-experience-list">
                      <li>{Info.mentee_Certificate_Desc}</li>
                    </ul>
                  </div>
                )
              )}
            </div>

            <div className="mentee-int-profile-section">
              <h2 className="mentee-int-section-title">
                Additional Information
              </h2>

              {JSON.parse(mentee?.mentee_additional_details)?.map(
                (Info, index) => (
                  <div key={index} className="mentee-int-experience-item">
                    <h3 className="experience-title">
                      {" "}
                      {Info.additionalHeadline}
                    </h3>
                    <p className="mentee-int-experience-company">
                      {Info.additionalDec}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InternshipOverview;
