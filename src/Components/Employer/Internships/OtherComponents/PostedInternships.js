//date 14-11-2024
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../InternshipCss/InternshipProfile.css";

const PostedInternshipListing = ({ onEditInternshipPost, data }) => {
  const initialInternships = [
    {
      id: 1,
      profile: "Software Development Engineering (Web)",
      company: "TechCorp Inc.",
      status: "Active",
      supervisionType: "Guided",
      location: "Remote",
      duration: "6 months",
      applicants: 50,
    },
    {
      id: 2,
      profile: "Data Science Intern",
      company: "Analytics Pro",
      status: "Active",
      supervisionType: "Guided",
      location: "New York",
      duration: "3 months",
      applicants: 34,
    },
    {
      id: 3,
      profile: "UX/UI Design Intern",
      company: "Creative Solutions",
      status: "Closed",
      supervisionType: "Unsupervised",
      location: "San Francisco",
      duration: "4 months",
      applicants: 21,
    },
    {
      id: 4,
      profile: "Mobile App Development",
      company: "AppWorks",
      status: "Closed",
      supervisionType: "Unsupervised",
      location: "Austin",
      duration: "6 months",
      applicants: 40,
    },
    {
      id: 5,
      profile: "DevOps Engineering Intern",
      company: "CloudTech",
      status: "Active",
      supervisionType: "Guided",
      location: "Remote",
      duration: "5 months",
      applicants: 29,
    },
    {
      id: 6,
      profile: "Software Development Engineering (Web)",
      company: "TechCorp Inc.",
      status: "Active",
      supervisionType: "Guided",
      location: "Remote",
      duration: "6 months",
      applicants: 50,
    },
    {
      id: 7,
      profile: "Data Science Intern",
      company: "Analytics Pro",
      status: "Active",
      supervisionType: "Guided",
      location: "New York",
      duration: "3 months",
      applicants: 34,
    },
    {
      id: 8,
      profile: "UX/UI Design Intern",
      company: "Creative Solutions",
      status: "Closed",
      supervisionType: "Unsupervised",
      location: "San Francisco",
      duration: "4 months",
      applicants: 21,
    },
    {
      id: 9,
      profile: "Mobile App Development",
      company: "AppWorks",
      status: "Closed",
      supervisionType: "Unsupervised",
      location: "Austin",
      duration: "6 months",
      applicants: 40,
    },
    {
      id: 10,
      profile: "DevOps Engineering Intern",
      company: "CloudTech",
      status: "Active",
      supervisionType: "Guided",
      location: "Remote",
      duration: "5 months",
      applicants: 29,
    },
  ];

  const navigate = useNavigate();
  const [internships, setInternships] = useState(initialInternships);
  const [searchQuery, setSearchQuery] = useState("");

  const handleApplicants = (id) => {
    window.open(`/internships/${id}/applicants`, "_blank");
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setInternships(initialInternships);
    } else {
      const filtered = initialInternships.filter(
        (internship) =>
          internship.profile.toLowerCase().includes(query) ||
          internship.company.toLowerCase().includes(query) ||
          internship.location.toLowerCase().includes(query)
      );
      setInternships(filtered);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setInternships((prevInternships) =>
      prevInternships.map((internship) =>
        internship.id === id ? { ...internship, status: newStatus } : internship
      )
    );
  };

  return (
    <>
      {data[0] && (
        <div className="internship_profile_container">
          {/* Header */}
          <div className="internship_profile_header">
            {/* <h1 className="internship_profile_title">Internships</h1> */}
            <div style={{ textAlign: "center" }} className="mb-4">
              <h2>Posted Internship</h2>
            </div>
            <div className="internship_profile_search_wrapper">
              <input
                type="text"
                className="internship_profile_search_input"
                placeholder="Search internships..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="internship_profile_search_btn">Search</button>
            </div>
          </div>

          {/* Listings */}

          <div className="internship_profile_listings_container">
            {data[0].internship_post_list === "[]" && (
              <p>Currently, You have not posted any internships posts</p>
            )}
            {JSON.parse(data[0]?.internship_post_list)
              .slice()
              .reverse()
              .map((internship) => (
                <div key={internship.id} className="internship_profile_card">
                  <div className="internship_profile_card_content">
                    {/* Left section */}
                    <div className="internship_profile_info_section">
                      <h3 className="internship_profile_info_title">
                        {internship.employer_internship_post_position}
                      </h3>
                    </div>

                    {/* Middle section */}
                    <div className="internship_profile_status_section">
                      <p
                        className={`internship_profile_status_select ${
                          internship.employer_internship_post_status === "open"
                            ? "active"
                            : "closed"
                        }`}
                      >
                        {internship.employer_internship_post_status}
                      </p>
                    </div>
                    <div className={`internship_profile_supervision_label `}>
                      <span
                        className={`internship_profile_supervision_label_text ${
                          internship.employer_internship_post_supervision_type ===
                          "Self Manage"
                            ? " guided"
                            : " unsupervised"
                        }`}
                      >
                        {internship.employer_internship_post_supervision_type ===
                        "Self Manage"
                          ? "Guided"
                          : "Unsupervised"}
                      </span>
                    </div>

                    {/* Right section */}
                    <div className="internship_profile_action_section">
                      <button
                        className="internship_profile_applicants_btn"
                        onClick={() => handleApplicants(1)}
                      >
                        Applicants:
                      </button>
                      <button
                        onClick={() =>
                          onEditInternshipPost(
                            internship.employer_internship_post_dtls_id
                          )
                        }
                        className="internship_profile_edit_btn"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PostedInternshipListing;
