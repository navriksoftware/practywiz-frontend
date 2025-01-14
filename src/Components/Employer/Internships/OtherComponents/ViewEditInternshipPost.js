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
  console.log(internshipPostId);
  const url = ApiURL();
  const [loading, setLoading] = useState(false);
  const [singleInternshipPost, setSingleInternshipPost] = useState(null);

  // Dummy data remains the same as before
  const internship = {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "Delhi, India",
    stipend: "15000",
    duration: "6 months",
    perks: [
      "Certificate",
      "Letter of Recommendation",
      "Flexible Hours",
      "PPO Opportunity",
    ],
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    replyRate: "92%",
    status: "New",
    aboutRole: `We are looking for a passionate Frontend Developer Intern to join our dynamic team. You'll work on real-world projects, collaborate with experienced developers, and contribute to building innovative web applications.

    As an intern, you'll be involved in:
    • Developing new user-facing features using React.js
    • Building reusable components for future use
    • Optimizing applications for maximum speed and scalability
    • Collaborating with back-end developers and designers`,

    responsibilities: [
      "Write clean, maintainable code for web applications",
      "Implement responsive design and ensure cross-browser compatibility",
      "Participate in code reviews and contribute to team discussions",
      "Debug and fix issues in existing applications",
      "Document your code and development processes",
    ],

    requirements: [
      "Currently pursuing B.Tech/B.E. in Computer Science or related field",
      "Strong understanding of JavaScript, HTML, and CSS",
      "Basic knowledge of React.js and modern JavaScript libraries",
      "Good problem-solving skills and attention to detail",
      "Excellent communication and teamwork abilities",
    ],

    aboutCompany: `TechCorp is a leading software development company specializing in creating innovative web solutions. With over 500 employees worldwide, we're committed to delivering high-quality products while fostering a culture of learning and growth.

    Our tech stack includes the latest technologies, and we believe in mentoring fresh talent to become industry leaders.`,

    companyWebsite: "www.techcorp.com",
    companySize: "500+ employees",
    companyEmail: "careers@techcorp.com",
  };

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
                      {internship.employer_internship_post_position} intern
                    </h1>
                    <div className="preview-single-intern-company">
                      {/* <Building2 className="w-4 h-4" /> */}
                      <span>{internship.employer_organization_name}</span>
                    </div>
                    <div className="preview-single-intern-meta">
                      <div className="preview-single-intern-meta-item">
                        {/* <MapPin className="w-4 h-4" /> */}
                        <span>
                          {internship.employer_internship_post_location}
                        </span>
                      </div>
                      <div className="preview-single-intern-meta-item">
                        {/* <Clock className="w-4 h-4" /> */}
                        <span>
                          {internship.employer_internship_post_duration} Months
                        </span>
                      </div>
                      <div className="preview-single-intern-meta-item">
                        {/* <Wallet className="w-4 h-4" /> */}
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
                      About{" "}
                      {internship.employer_organization_name.toUpperCase()}
                    </h2>
                    <p className="preview-single-intern-text">
                      {internship.employer_organization_desc}
                    </p>

                    <div className="preview-single-intern-company-meta">
                      <div className="preview-single-intern-company-meta-item">
                        {/* <Globe className="w-4 h-4" /> */}
                        <span>{internship.companyWebsite}</span>
                      </div>
                      <div className="preview-single-intern-company-meta-item">
                        {/* <Users className="w-4 h-4" /> */}
                        <span>
                          {internship.employer_organization_no_of_emp}
                        </span>
                      </div>
                      <div className="preview-single-intern-company-meta-item">
                        {/* <Mail className="w-4 h-4" /> */}
                        <span>{internship.companyEmail}</span>
                      </div>
                    </div>
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
