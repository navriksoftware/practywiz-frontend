import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiURL } from "../../../../Utils/ApiURL";
import "../InternshipCss/SingleApplicantProfile.css";

const ApplicantProfile = () => {
  const url = ApiURL();
  const location = useLocation();
  const mentee = location.state.applicant || [];
  const [isShortlisted, setIsShortlisted] = useState(
    mentee?.mentee_internship_applied_status === "shortlisted" ? true : false
  );
  console.log(mentee);

  const hasValidData = (array) => {
    return (
      Array.isArray(array) &&
      array.length > 0 &&
      array.some((item) => Object.values(item).some((value) => value))
    );
  };

  const handleShortlist = async (applicantId, internshipId) => {
    try {
      // Make POST request to update status
      const response = await axios.post(
        `${url}api/v1/employer/dashboard/update-applicant-status`,
        {
          internshipId: internshipId,
          applicantId: applicantId,
          status: "shortlisted",
        }
      );
      if (response.data.success) {
        toast.success("Applicant shortlisted successfully.");
        setIsShortlisted(true);
      }
      if (response.data.error) {
        toast.error("Failed to shortlist applicant. Please try again.");
        throw new Error("Failed to shortlist applicant. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to shortlist applicant. Please try again.");
      throw new Error("Failed to shortlist applicant. Please try again.");
    }
  };

  return (
    <div className="single-applicant-profile-overview-container">
      <div className="single-applicant-prof-profile-section-header">
        <h2 className="single-applicant-prof-profile-title">
          Profile Overview
        </h2>
        <div className="single-applicant-prof-profile-actions">
          <button
            className="single-applicant-prof-btn-outline"
            onClick={() =>
              handleShortlist(
                mentee?.mentee_dtls_id,
                mentee?.internship_post_dtls_id
              )
            }
            disabled={isShortlisted}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </button>
          <button className="single-applicant-btn-default">Download CV</button>
        </div>
      </div>
      {mentee && (
        <div className="single-applicant-profile-overview-wrapper">
          <div className="single-applicant-profile-card">
            <div className="single-applicant-profile-header">
              <img
                src={mentee?.mentee_profile_pic_url}
                alt={mentee.mentee_firstname}
                className="single-applicant-profile-picture"
              />
              <div className="single-applicant-profile-info">
                <h1 className="single-applicant-profile-name">
                  {mentee.mentee_firstname.toUpperCase()}{" "}
                  {mentee.mentee_lastname.toUpperCase()}
                </h1>
                <p className="single-applicant-profile-location">
                  {`${mentee?.mentee_email} | ${mentee.mentee_phone_number}`}
                </p>
                <p className="single-applicant-profile-description">
                  {mentee?.mentee_about}
                </p>
              </div>
              <div className="single-applicant-profile-links">
                <a
                  href={mentee?.mentee_linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="single-applicant-icon-link"
                >
                  <i className="fa-brands fa-linkedin single-applicant-icon"></i>
                </a>
              </div>
            </div>

            {hasValidData(JSON.parse(mentee?.mentee_skills)) && (
              <div className="single-applicant-profile-skill-section">
                <h2 className="single-applicant-section-title">Skills</h2>
                <div className="single-applicant-skills-container">
                  {JSON.parse(mentee?.mentee_skills)?.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasValidData(JSON.parse(mentee?.mentee_institute_details)) && (
              <div className="single-applicant-profile-section">
                <h2 className="single-applicant-section-title">Education</h2>
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
            )}

            {hasValidData(JSON.parse(mentee?.mentee_experience_details)) && (
              <div className="single-applicant-profile-section">
                <h2 className="single-applicant-section-title">Experience</h2>
                {JSON.parse(mentee?.mentee_experience_details)?.map(
                  (Info, index) => (
                    <div
                      key={index}
                      className="single-applicant-experience-item"
                    >
                      <h3 className="experience-title">
                        {" "}
                        {Info.mentee_workexp_Role}
                      </h3>
                      <p className="single-applicant-experience-company">
                        {Info.mentee_workexp_CompanyName} (
                        {Info.mentee_workexp_Start_Year} {"-"}{" "}
                        {Info.mentee_workexp_End_Year})
                      </p>
                      <ul className="single-applicant-experience-list">
                        <li>{Info.mentee_workexp_Desc}</li>
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}

            {hasValidData(JSON.parse(mentee?.mentee_certificate_details)) && (
              <div className="single-applicant-profile-section">
                <h2 className="single-applicant-section-title">
                  Certifications
                </h2>
                {JSON.parse(mentee?.mentee_certificate_details)?.map(
                  (Info, index) => (
                    <div
                      key={index}
                      className="single-applicant-experience-item"
                    >
                      <h3 className="experience-title">
                        {" "}
                        {Info.mentee_Certificate_Name}
                      </h3>
                      <p className="single-applicant-experience-company">
                        {Info.mentee_Certificate_level}(
                        {Info.mentee_Certificate_Start_Year} {"-"}{" "}
                        {Info.mentee_Certificate_End_Year})
                      </p>
                      <ul className="single-applicant-experience-list">
                        <li>{Info.mentee_Certificate_Desc}</li>
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}

            {hasValidData(JSON.parse(mentee?.mentee_additional_details)) && (
              <div className="single-applicant-profile-section">
                <h2 className="single-applicant-section-title">
                  Additional Information
                </h2>
                {JSON.parse(mentee?.mentee_additional_details)?.map(
                  (Info, index) => (
                    <div
                      key={index}
                      className="single-applicant-experience-item"
                    >
                      <h3 className="experience-title">
                        {" "}
                        {Info.additionalHeadline}
                      </h3>
                      <p className="single-applicant-experience-company">
                        {Info.additionalDec}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantProfile;
