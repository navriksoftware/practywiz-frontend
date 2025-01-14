// Date: 11-11-24 Tushar
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../InternshipCss/ApplicationReceived.css";

const dummyData = [
  {
    id: 1,
    name: "Tushar Khanagwal",
    education: "B.Tech Delhi Technological University",
    graduationYear: "2019-2023",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    location: "Delhi",
    isShortlisted: false,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    education: "B.Tech Indian Institute of Technology",
    graduationYear: "2018-2022",
    skills: ["Angular", "JavaScript", "Express.js", "MongoDB"],
    location: "Mumbai",
    isShortlisted: false,
  },
  {
    id: 3,
    name: "Priya Singh",
    education: "B.Tech Netaji Subhas University of Technology",
    graduationYear: "2020-2024",
    skills: ["React", "JavaScript", "Python", "Django"],
    location: "Bangalore",
    isShortlisted: false,
  },

  {
    id: 4,
    name: "Rahul Sharma",
    education: "B.Tech Indian Institute of Technology",
    graduationYear: "2018-2022",
    skills: ["Angular", "JavaScript", "Express.js", "MongoDB"],
    location: "Mumbai",
    isShortlisted: false,
  },
];

const ApplicationsReceived = (id) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [showShortlistedOnly, setShowShortlistedOnly] = useState(false);

  // New state for mobile filter visibility
  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);

  const [applicants, setApplicants] = useState(dummyData);

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedLocations([]);
    setSearchTerm("");
    setSkillInput("");
    setLocationInput("");
    setShowShortlistedOnly(false);
  };

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      if (type === "skill") {
        if (!selectedSkills.includes(e.target.value.trim())) {
          setSelectedSkills([...selectedSkills, e.target.value.trim()]);
        }
        setSkillInput("");
      } else if (type === "location") {
        if (!selectedLocations.includes(e.target.value.trim())) {
          setSelectedLocations([...selectedLocations, e.target.value.trim()]);
        }
        setLocationInput("");
      }
    }
  };

  const removeFilter = (value, type) => {
    if (type === "skill") {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
    } else if (type === "location") {
      setSelectedLocations(
        selectedLocations.filter((location) => location !== value)
      );
    }
  };

  const handleVewProfile = (Id) => {
    navigate(`/internships/applicants/${Id}`);
  };

  const handleShortlist = (applicantId) => {
    const updatedApplicants = applicants.map((applicant) => {
      if (applicant.id === applicantId) {
        return { ...applicant, isShortlisted: true };
      }
      return applicant;
    });
    setApplicants(updatedApplicants);
    setShowShortlistedOnly(false);
  };

  const filteredData = applicants.filter((data) => {
    const searchMatch =
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const skillMatch =
      selectedSkills.length === 0 ||
      selectedSkills.some((selectedSkills) =>
        data.skills.some((skill) =>
          skill.toLowerCase().includes(selectedSkills.toLowerCase())
        )
      );

    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.some((selectedLocation) =>
        data.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );

    const shortlistMatch = showShortlistedOnly ? data.isShortlisted : true;

    return searchMatch && skillMatch && locationMatch && shortlistMatch;
  });
  console.log(filteredData);

  return (
    <div className="col-lg-10 ps-0">
      <div className="gtyfdgfgf">
        <div className="applications-received-board">
          <div className="applications-outer-container">
            <div style={{ textAlign: "center" }}>
              <h2>Front end Intern</h2>
            </div>
            <div className="applications-type">
              <div
                className={`applications-type-header ${
                  !showShortlistedOnly ? "active" : "inactive"
                }`}
                onClick={() => {
                  setShowShortlistedOnly(false);
                  setApplicants(dummyData);
                }}
              >
                All Applicants
              </div>
              <div
                className={`applications-type-header ${
                  showShortlistedOnly ? "active" : "inactive"
                }`}
                onClick={() => {
                  setShowShortlistedOnly(true);
                  setApplicants(
                    filteredData.filter((data) => data.isShortlisted)
                  );
                }}
              >
                Shortlisted
              </div>
            </div>

            <div className="applications-main-content">
              {/* <aside className="applications-filters"> */}
              <aside
                className={`applications-filters ${
                  isMobileFiltersVisible ? "mobile-filters-visible" : ""
                }`}
              >
                {isMobileFiltersVisible && (
                  <div className="applications-filter-overlay">
                    <span
                      className="applications-close-filters"
                      onClick={() => setIsMobileFiltersVisible(false)}
                    >
                      X
                    </span>
                    <h2 className="applications-filter-overlay-lable">
                      Filters
                    </h2>
                    <div
                      className={`applications-search-bar ${
                        isMobileFiltersVisible ? "mobile-filters-visible" : ""
                      }`}
                    >
                      <input
                        type="text"
                        className="applications-search-input"
                        placeholder="Search by keywords (React, Node.js, Design...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        className="applications-search-btn"
                        onClick={() => setIsMobileFiltersVisible(false)}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                )}
                <div className="applications-filter-section">
                  <h3>Skills</h3>
                  <input
                    type="text"
                    className="applications-filter-input"
                    placeholder="Add a skill and press Enter..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "skill")}
                  />
                  <div className="applications-selected-filters">
                    {selectedSkills.map((skill, index) => (
                      <span key={index} className="applications-filter-tag">
                        {skill}
                        <span
                          className="applications-remove-tag"
                          onClick={() => removeFilter(skill, "skill")}
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="applications-filter-section">
                  <h3>Location</h3>
                  <input
                    type="text"
                    className="applications-filter-input"
                    placeholder="Add a location and press Enter..."
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "location")}
                  />
                  <div className="applications-selected-filters">
                    {selectedLocations.map((location, index) => (
                      <span key={index} className="applications-filter-tag">
                        {location}
                        <span
                          className="applications-remove-tag"
                          onClick={() => removeFilter(location, "location")}
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  className="applications-clear-filters"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </aside>

              <main className="applications-listings">
                <div
                  className={`applications-search-bar ${
                    isMobileFiltersVisible ? "mobile-filters-visible" : ""
                  }`}
                >
                  <input
                    type="text"
                    className="applications-search-input"
                    placeholder="Search by keywords (React, Node.js, Design...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Mobile Filter Toggle Button */}
                <div className="applications-mobile-filter-toggle">
                  <button
                    className="applications-filter-mobile-btn"
                    onClick={() =>
                      setIsMobileFiltersVisible(!isMobileFiltersVisible)
                    }
                  >
                    {isMobileFiltersVisible ? "Close Filters" : "Open Filters"}
                  </button>
                </div>
                {/* test */}

                <div className="difuhtre_content applications-job-lists">
                  {filteredData.length > 0 ? (
                    filteredData.map((applicant) => (
                      <div key={applicant.id} className="applications-card">
                        <div className="applications-header">
                          <div className="applications-info">
                            <h2>{applicant.name}</h2>
                            <div className="applications-meta">
                              {applicant.education} | {applicant.graduationYear}
                            </div>
                          </div>
                          <div className="applications-location">
                            <div className="applications-location-amount">
                              {applicant.location}
                            </div>
                          </div>
                        </div>

                        <div className="applications-skills-list">
                          {applicant.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="applications-skill-tag"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="applications-action-section">
                          <span
                            className="applications-view-profile-btn"
                            onClick={() => handleVewProfile(applicant.id)}
                          >
                            View Profile
                          </span>
                          {!applicant.isShortlisted && (
                            <button
                              className="applications-shortlist-btn"
                              onClick={() => handleShortlist(applicant.id)}
                            >
                              Shortlist
                            </button>
                          )}
                          {applicant.isShortlisted && (
                            <span className="applications-status-tag shortlisted">
                              Shortlisted
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="applications-card">
                      <p className="text-center">
                        No applications received for the selected filters
                      </p>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsReceived;
