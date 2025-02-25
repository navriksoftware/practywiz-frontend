// Date: 15-11-24 Tushar
import React, { useEffect, useState } from "react";
import "../InternshipCss/ViewEditInternshipPost.css";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import DOMPurify from "dompurify";
import EditInternshipPost from "./EditInternshipPost";

const InternshipDetail = ({
  internshipPostId,
  onEditInternshipPost,
  setInternPostData,
}) => {

  const url = ApiURL();
  const [loading, setLoading] = useState(false);
  const [singleInternshipPost, setSingleInternshipPost] = useState(null);

  useEffect(() => {
    const fetchSingleMentors = async () => {
      setLoading(true);
      const response = await axios.post(
        `${url}api/v1/employer/internship/fetch-internship-post`,
        {
          internshipPostId: internshipPostId,
        }
      );
      setLoading(false);
      if (response.data.success) {
        setSingleInternshipPost(response.data.success);
        setInternPostData(response.data.success[0]);
      }
      if (response.data.error) {
        return setLoading(false), setSingleInternshipPost(null);
      }
    };
    fetchSingleMentors();
  }, [internshipPostId, url]);
  // console.log(singleInternshipPost[0]);

  // const handleEditInternshipPost = (singleInternshipPost) => () => {
  //   console.log(singleInternshipPost);
  //   return <EditInternshipPost singleInternshipPost={singleInternshipPost} />;
  // };

  return (
    <div className="col-lg-10 ps-0">
      <div className="">
        <div style={{ textAlign: "center" }}>
          <h2>Internship Preview</h2>
        </div>
        <div className="preview-single-intern-container">
          {singleInternshipPost?.map((internship) => {
            return (
              <>
                {" "}
                <div className="preview-single-intern-header">
                  <div className="preview-single-intern-header-content">
                    <h1 className="preview-single-intern-title">
                      {internship.employer_internship_post_position}
                    </h1>
                    <div className="preview-single-intern-company">
                      <span>{internship.employer_organization_name}</span>
                    </div>
                    <div className="preview-single-intern-meta">
                      <div className="preview-single-intern-meta-item preview-single-intern-menta-item-location">
                        <span>
                          {internship.employer_internship_post_location}
                        </span>
                      </div>
                      <div className="preview-single-intern-meta-item preview-single-intern-menta-item-duration">
                        <span>
                          {internship.employer_internship_post_duration} Months
                        </span>
                      </div>
                      <div
                        className={`preview-single-intern-meta-item preview-single-intern-menta-item-stipend ${
                          internship.employer_internship_post_stipend_type ===
                          "Unpaid"
                            ? "unpaid"
                            : "paid"
                        }`}
                      >
                        <span>
                          {internship.employer_internship_post_stipend_type ===
                          "Unpaid" ? (
                            <span>
                              {internship.employer_internship_post_stipend_type}
                            </span>
                          ) : (
                            <span>
                              ₹
                              {
                                internship.employer_internship_post_stipend_amount
                              }
                              /{internship.employer_internship_post_pay_type}
                            </span>
                          )}
                        </span>
                      </div>
                      <div
                        className={`preview-single-intern-meta-item preview-single-intern-menta-item-supervision ${
                          internship.employer_internship_post_supervision_type ===
                          "Guided"
                            ? "guided"
                            : "self"
                        }`}
                      >
                        <span>
                          {internship.employer_internship_post_supervision_type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="preview-single-intern-apply-btn"
                    onClick={onEditInternshipPost}
                    // onClick={handleEditInternshipPost(singleInternshipPost[0])}
                  >
                    Edit Internship Post
                  </button>
                </div>
                <div className="preview-single-intern-content">
                  <div className="preview-single-intern-main">
                    <section className="preview-single-intern-section">
                      <h2 className="preview-single-intern-section-title">
                        Skills Required
                      </h2>
                      <div className="preview-single-intern-skills">
                        {JSON.parse(
                          internship?.employer_internship_post_skills
                        ).map((skill, index) => (
                          <span
                            key={index}
                            className="preview-single-intern-skill-tag"
                          >
                            {skill.value}
                          </span>
                        ))}
                      </div>
                    </section>
                    <section className="preview-single-intern-section">
                      <h2 className="preview-single-intern-section-title">
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
                    <section className="preview-single-intern-section">
                      <h2 className="preview-single-intern-section-title">
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

                    {/* <section className="preview-single-intern-section">
                      <h2 className="preview-single-intern-section-title">
                        Perks & Benefits
                      </h2>
                      <div className="preview-single-intern-perks">
                        {JSON.parse(
                          internship.employer_internship_post_perks
                        ).map((perk, index) => (
                          <span
                            key={index}
                            className="preview-single-intern-perk-tag"
                          >
                            {perk}
                          </span>
                        ))}
                      </div>
                    </section> */}
                  </div>

                  <aside className="preview-single-intern-sidebar">
                    <h2 className="preview-single-intern-section-title">
                      About
                    </h2>
                    <h2 className="preview-single-intern-section-title">
                      {internship.employer_organization_name.toUpperCase()}
                    </h2>
                    <p className="preview-single-intern-text">
                      {internship.employer_organization_desc}
                    </p>

                    <div className="preview-single-intern-company-meta">
                      <div className="preview-single-intern-company-meta-item">
                        {/* <Globe className="w-4 h-4" /> */}
                        <i className="fa-solid fa-globe"></i>
                        <span>
                          <a href={internship.employer_organization_website}>
                            {internship.employer_organization_website}
                          </a>
                        </span>
                      </div>
                      <div className="preview-single-intern-company-meta-item">
                        <i className="fa-solid fa-users"></i>
                        <span>
                          {internship.employer_organization_no_of_emp}
                        </span>
                      </div>
                      <div className="preview-single-intern-company-meta-item">
                        <i className="fa-solid fa-envelope"></i>
                        <span>{internship.employer_organization_email}</span>
                      </div>
                      <div className="preview-single-intern-company-meta-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>
                          {internship.employer_organization_location +
                            ", " +
                            internship.employer_organization_complete_address}
                        </span>
                      </div>
                    </div>
                    <hr />
                    <h2 className="preview-single-intern-section-title">
                      Perks & Benefits
                    </h2>
                    <div className="preview-single-intern-perks">
                      {JSON.parse(
                        internship.employer_internship_post_perks
                      ).map((perk, index) => (
                        <span
                          key={index}
                          className="preview-single-intern-perk-tag"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </aside>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
