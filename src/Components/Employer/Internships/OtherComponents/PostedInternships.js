//date 14-11-2024
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../InternshipCss/InternshipProfile.css";

const PostedInternshipListing = ({ onEditInternshipPost, data }) => {
  const [internshipList, setInternshipList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInternships, setFilteredInternships] = useState([]);

  useEffect(() => {
    if (data[0]?.internship_post_list) {
      const datamain = JSON.parse(data[0]?.internship_post_list);
      const extractedData = datamain.map((item) => ({
        id: item.employer_internship_post_dtls_id,
        profile: item.employer_internship_post_position,
        status: item.employer_internship_post_status,
        supervisionType:
          item.employer_internship_post_supervision_type.toUpperCase(),
      }));
      setInternshipList(extractedData);
      setFilteredInternships(extractedData);
    }
  }, [data]);

  const navigate = useNavigate();
  // const [internships, setInternships] = useState(initialInternships);
  // const [searchQuery, setSearchQuery] = useState("");

  const handleApplicants = (id, profile) => {
    window.open(`/internships/${profile}/${id}/applicants`, "_blank");
    // navigate(`/internships/${profile}/${id}/applicants`, {
    //   state: { roleProfile: profile, id: id },
    // });
  };

  useEffect(() => {
    let result = internshipList;
    if (searchQuery) {
      result = result.filter((internship) => {
        const searchString = searchQuery.toLowerCase();
        return internship.profile.toLowerCase().includes(searchString);
      });
    }
    setFilteredInternships(result);
  }, [internshipList, searchQuery]);

  const handleStatusChange = (id, newStatus) => {
    setInternshipList((prevInternships) =>
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="internship_profile_search_btn">Search</button>
            </div>
          </div>

          {/* Listings */}

          <div className="internship_profile_listings_container">
            {internshipList.length === 0 && (
              <p>Currently, You have not posted any internships posts</p>
            )}
            {filteredInternships
              .slice()
              .reverse()
              .map((internship) => (
                <div key={internship.id} className="internship_profile_card">
                  <div className="internship_profile_card_content">
                    {/* Left section */}
                    <div className="internship_profile_info_section">
                      <h3 className="internship_profile_info_title">
                        {internship.profile}
                      </h3>
                    </div>

                    {/* Middle section */}
                    <div className="internship_profile_status_section">
                      <p
                        className={`internship_profile_status_select ${
                          internship.status === "open" ? "active" : "closed"
                        }`}
                      >
                        {internship.status}
                      </p>
                    </div>
                    <div className={`internship_profile_supervision_label `}>
                      <span
                        className={`internship_profile_supervision_label_text ${
                          internship.supervisionType === "Self Manage"
                            ? " guided"
                            : " unsupervised"
                        }`}
                      >
                        {internship.supervisionType === "Self Manage"
                          ? "Guided"
                          : "Unsupervised"}
                      </span>
                    </div>

                    {/* Right section */}
                    <div className="internship_profile_action_section">
                      <button
                        className="internship_profile_applicants_btn"
                        onClick={() => {
                          handleApplicants(internship.id, internship.profile);
                        }}
                      >
                        Applicants:
                      </button>
                      <button
                        onClick={() => onEditInternshipPost(internship.id)}
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
