import React, { useState } from "react";
import "./InternshipApplication.css";
import InternshipOverview from "./InternshipOverview";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { useDispatch } from "react-redux";

const InternshipApplication = ({ user, token }) => {
  //   const [showApplication, setShowApplication] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const url = ApiURL();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const internship_post_dtls_id = queryParams.get("internshipId");
  const singleMentee = useSelector((state) => state.mentee.singleMentee);
  console.log("singleMentee", singleMentee);
  const mentee_dtls_id = singleMentee[0].mentee_dtls_id;
  const mentee_user_dtls_id = singleMentee[0].mentee_user_dtls_id;
  const [selectedResume, setSelectedResume] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const uploadedResumes = [
    {
      id: "1",
      name: "Software_Engineer_Resume.pdf",
      lastModified: "2024-01-20",
    },
    { id: "2", name: "Technical_Resume_2024.pdf", lastModified: "2024-01-15" },
    {
      id: "3",
      name: "mentee-Intern_Resume_Latest.pdf",
      lastModified: "2024-01-25",
    },
  ];
  console.log("singleMentee", singleMentee);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (selectedResume) {
    setIsSubmitted(true);
    try {
      dispatch(showLoadingHandler());
      const response = await Promise.race([
        axios.post(`${url}api/v1/employer/internship/apply-internship`, {
          mentee_dtls_id: mentee_dtls_id,
          mentee_user_dtls_id: mentee_user_dtls_id,
          internship_post_dtls_id: Number(internship_post_dtls_id),
          // resume: selectedResume,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 45000)
        ),
      ]);
      if (response.data.success) {
        dispatch(hideLoadingHandler());
        toast.success("Application submitted successfully");
        setIsSubmitted(true);
        setTimeout(() => {
          navigate("/mentee/dashboard");
        }, 2000);
      }
      if (response.data.error) {
        dispatch(hideLoadingHandler());
        toast.error("There is some error while submitting the application");
      }
    } catch (error) {
      toast.error(
        "There is some error while submitting the application try again later"
      ); // Stop loading
      dispatch(hideLoadingHandler());
    } finally {
      dispatch(hideLoadingHandler());
    }
    // }
  };

  if (isSubmitted) {
    return (
      <div className="mentee-intern-apply-card">
        <div className="mentee-intern-apply-success">
          <div className="mentee-intern-apply-success-icon">✓</div>
          <h2>Application Submitted Successfully!</h2>
          <p>
            Thank you for applying. We'll review your application and get back
            to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mentee-intern-apply-card">
      <div className="mentee-intern-apply-header">
        <h2>Complete Your Application</h2>
        <p>Please review the position details and select your resume</p>
      </div>
      <InternshipOverview singleMentee={singleMentee} />
      <div className="mentee-intern-apply-content">
        <form onSubmit={handleSubmit}>
          {/* <div className="mentee-intern-apply-section">
            <h3>Select Resume</h3>
            <div className="mentee-intern-apply-resume-list">
              {uploadedResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="mentee-intern-apply-resume-item"
                >
                  <input
                    type="radio"
                    id={resume.id}
                    name="resume"
                    value={resume.id}
                    checked={selectedResume === resume.id}
                    onChange={(e) => setSelectedResume(e.target.value)}
                    className="mentee-intern-apply-radio"
                  />
                  <label
                    htmlFor={resume.id}
                    className="mentee-intern-apply-resume-label"
                  >
                    <span className="mentee-intern-apply-file-icon">📄</span>
                    <div className="mentee-intern-apply-resume-details">
                      <span className="mentee-intern-apply-resume-name">
                        {resume.name}
                      </span>
                      <span className="mentee-intern-apply-resume-date">
                        Last modified: {resume.lastModified}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div> */}

          <div className="mentee-intern-apply-button-group">
            <button
              type="button"
              className="mentee-intern-apply-btn mentee-intern-apply-btn-secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mentee-intern-apply-btn mentee-intern-apply-btn-primary"
              // disabled={!selectedResume}
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipApplication;
