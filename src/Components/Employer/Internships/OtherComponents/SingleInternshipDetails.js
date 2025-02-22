// Date: 11-11-24 Tushar
import React, { useState, useEffect } from "react";
import "../InternshipCss/SingleInternshipDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const InternshipDetail = ({ user, token }) => {
  const url = ApiURL();
  const navigate = useNavigate();
  const singleMentee = useSelector((state) => state.mentee.singleMentee);
  const location = useLocation();
  const internshipPostId = Number(location.pathname.split("/").pop()) || null;
  const appliedInternships = singleMentee?.[0]?.applied_internships || [];

  const { internshipId, appliedInternshipsID = [] } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [singleInternshipPost, setSingleInternshipPost] = useState([]);
  const [appliedInternshipsId, setAppliedInternshipsId] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserMentee, setUserMentee] = useState(false);

  useEffect(() => {
    const fetchSingleInternship = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${url}api/v1/employer/internship/fetch-internship-post`,
          { internshipPostId }
        );
        if (response.data.success) {
          setSingleInternshipPost(response.data.success);
        } else {
          setSingleInternshipPost(null);
        }
      } catch (error) {
        console.error("Error fetching internship details:", error);
        setSingleInternshipPost(null);
      }
      setLoading(false);
    };
    fetchSingleInternship();
  }, [internshipPostId, url]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    const checkUserType = () => {
      const userType = user?.user_type;
      if (userType === "mentee") {
        setUserMentee(true);
      }
    };
    checkLoginStatus();
    checkUserType();
  }, []);

  useEffect(() => {
    if (appliedInternships?.length > 0) {
      const internshipIDs = [
        ...new Set(
          appliedInternships.map((item) => item.internship_post_dtls_id)
        ),
      ];
      setAppliedInternshipsId(internshipIDs);
    }
  }, [appliedInternships]);

  const handleApply = () => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
    if (!isUserMentee) {
      toast.error("Only mentees can apply for internships");
      return navigate("/");
    }
    navigate(`/internship/apply?internshipId=${internshipPostId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="col-lg-10 ps-0">
      <div className="gtyfdgfgf">
        {singleInternshipPost?.map((internship, index) => {
          const isApplied = [
            ...(appliedInternshipsId || []),
            ...(appliedInternshipsID || []),
          ].includes(internshipPostId);

          return (
            <div key={index} className="single-intern-container">
              <button onClick={handleBack} className="single-intern-back-btn">
                <i className="fa-solid fa-arrow-left"></i>
              </button>

              <div className="single-intern-header">
                <div className="single-intern-header-content">
                  <h1 className="single-intern-title">
                    {internship.employer_internship_post_position}
                  </h1>
                  <div className="single-intern-company">
                    <span>{internship.employer_organization_name}</span>
                  </div>
                  <div className="single-intern-meta">
                    <div className="single-intern-meta-item">
                      <span>
                        {internship.employer_internship_post_location}
                      </span>
                    </div>
                    <div className="single-intern-meta-item">
                      <span>
                        {internship.employer_internship_post_duration} Months
                      </span>
                    </div>
                    <div className="single-intern-meta-item">
                      <span>
                        {internship.employer_internship_post_stipend_type ===
                        "Unpaid" ? (
                          <span>
                            {internship.employer_internship_post_stipend_type}
                          </span>
                        ) : (
                          <span>
                            ₹
                            {internship.employer_internship_post_stipend_amount}
                            /{internship.employer_internship_post_pay_type}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="single-intern-apply-btn"
                  onClick={handleApply}
                  disabled={isApplied}
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </button>
              </div>

              <div className="single-intern-content">
                <div className="single-intern-main">
                  <section className="single-intern-section">
                    <h2 className="single-intern-section-title">
                      Skills Required
                    </h2>
                    <div className="single-intern-skills">
                      {JSON.parse(
                        internship?.employer_internship_post_skills
                      ).map((skill, index) => (
                        <span key={index} className="single-intern-skill-tag">
                          {skill.value}
                        </span>
                      ))}
                    </div>
                  </section>
                  <section className="single-intern-section">
                    <h2 className="single-intern-section-title">
                      About the Role
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          internship.employer_internship_post_res
                        ),
                      }}
                    />
                  </section>
                  <section className="single-intern-section">
                    <h2 className="single-intern-section-title">
                      Requirements
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          internship.employer_internship_post_req
                        ),
                      }}
                    />
                  </section>
                </div>

                <aside className="single-intern-sidebar">
                  <h2 className="single-intern-section-title">About</h2>
                  <h2 className="single-intern-section-title">
                    {internship.employer_organization_name.toUpperCase()}
                  </h2>
                  <p className="single-intern-text">
                    {internship.employer_organization_desc}
                  </p>
                  <div className="single-intern-company-meta">
                    <div className="single-intern-company-meta-item">
                      <span>{internship.employer_organization_website}</span>
                    </div>
                    <div className="single-intern-company-meta-item">
                      <span>{internship.employer_organization_no_of_emp}</span>
                    </div>
                    <div className="single-intern-company-meta-item">
                      <span>{internship.employer_organization_email}</span>
                    </div>
                    <div className="single-intern-company-meta-item">
                      <span>
                        {internship.employer_organization_location +
                          ", " +
                          internship.employer_organization_complete_address}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <h2 className="single-intern-section-title">
                    Perks & Benefits
                  </h2>
                  <div className="single-intern-perks">
                    {JSON.parse(internship.employer_internship_post_perks).map(
                      (perk, index) => (
                        <span key={index} className="single-intern-perk-tag">
                          {perk}
                        </span>
                      )
                    )}
                  </div>
                </aside>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InternshipDetail;
