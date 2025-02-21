import React, { useState, useEffect } from "react";
import "../InternshipCss/InternshipListing.css";
import { ApiURL } from "../../../../Utils/ApiURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InternshipJobBoard({
  appliedInternshipsID,
  singleMentee,
  user,
  token,
}) {
  // State for jobs and filters
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minStipend, setMinStipend] = useState("");
  const [maxStipend, setMaxStipend] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const url = ApiURL();

  // Fetch internship listings
  const fetchInternshipListings = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${url}api/v1/employer/internship/fetch-internship-listing`
      );
      setJobs(response.data.data);
      setFilteredJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch internship listings");
      setLoading(false);
      console.error("Error fetching internship listings:", err);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchInternshipListings();
  }, []);

  // Filter jobs based on various criteria
  useEffect(() => {
    let result = jobs;

    // Filter by skills
    if (selectedSkills.length > 0) {
      result = result.filter((job) =>
        selectedSkills.every((skill) =>
          JSON.parse(job.employer_internship_post_skills).some((jobSkill) =>
            jobSkill.label.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Filter by location
    if (selectedLocations.length > 0) {
      result = result.filter((job) =>
        selectedLocations.some((location) =>
          job.employer_internship_post_location
            .toLowerCase()
            .includes(location.toLowerCase())
        )
      );
    }

    // Filter by stipend range
    if (minStipend) {
      result = result.filter(
        (job) =>
          parseInt(job.employer_internship_post_stipend_amount) >=
          parseInt(minStipend)
      );
    }

    if (maxStipend) {
      result = result.filter(
        (job) =>
          parseInt(job.employer_internship_post_stipend_amount) <=
          parseInt(maxStipend)
      );
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter((job) => {
        const searchString = searchTerm.toLowerCase();
        const skills = JSON.parse(job.employer_internship_post_skills).map(
          (skill) => skill.label.toLowerCase()
        );

        return (
          job.employer_internship_post_position
            .toLowerCase()
            .includes(searchString) ||
          job.employer_organization_name.toLowerCase().includes(searchString) ||
          skills.some((skill) => skill.includes(searchString))
        );
      });
    }

    setFilteredJobs(result);
  }, [
    jobs,
    selectedSkills,
    selectedLocations,
    minStipend,
    maxStipend,
    searchTerm,
  ]);

  // Handle adding skills filter
  const handleKeyPress = (e, type) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      if (type === "skill") {
        if (!selectedSkills.includes(e.target.value.trim())) {
          setSelectedSkills([...selectedSkills, e.target.value.trim()]);
          setSkillInput("");
        }
      } else if (type === "location") {
        if (!selectedLocations.includes(e.target.value.trim())) {
          setSelectedLocations([...selectedLocations, e.target.value.trim()]);
          setLocationInput("");
        }
      }
    }
  };

  // Remove filter
  const removeFilter = (filter, type) => {
    if (type === "skill") {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== filter));
    } else if (type === "location") {
      setSelectedLocations(
        selectedLocations.filter((location) => location !== filter)
      );
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedLocations([]);
    setMinStipend("");
    setMaxStipend("");
    setSearchTerm("");
  };

  const handleApply = (jobId) => {
    const navigationState = {
      internshipId: jobId,
      appliedInternshipsID,
    };

    navigate(`/internship-listing/${jobId}`, {
      state: navigationState,
    });
  };

  // Render loading state
  if (loading) {
    return (
      <div className="intern-job-board">
        <div className="intern-outer-container">
          <div style={{ textAlign: "center" }} className="mb-4">
            <h2>Loading Internships...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="intern-job-board">
        <div className="intern-outer-container">
          <div style={{ textAlign: "center" }} className="mb-4">
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="intern-job-board">
      <div className="intern-outer-container">
        <h2 className="profile-title">Internship</h2>

        <div className="intern-main-content">
          <aside className="intern-filters">
            <div className="intern-filter-section">
              <h3>Skills</h3>
              <input
                type="text"
                className="intern-filter-input"
                placeholder="Add a skill and press Enter..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "skill")}
              />
              <div className="intern-selected-filters">
                {selectedSkills.map((skill, index) => (
                  <span key={index} className="intern-filter-tag">
                    {skill}
                    <span
                      className="intern-remove-tag"
                      onClick={() => removeFilter(skill, "skill")}
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="intern-filter-section">
              <h3>Monthly Stipend (Rs)</h3>
              <div className="intern-rate-inputs">
                <input
                  type="number"
                  className="intern-rate-input"
                  placeholder="Min"
                  value={minStipend}
                  onChange={(e) => setMinStipend(e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  className="intern-rate-input"
                  placeholder="Max"
                  value={maxStipend}
                  onChange={(e) => setMaxStipend(e.target.value)}
                />
              </div>
            </div>

            <div className="intern-filter-section">
              <h3>Location</h3>
              <input
                type="text"
                className="intern-filter-input"
                placeholder="Add a location and press Enter..."
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, "location")}
              />
              <div className="intern-selected-filters">
                {selectedLocations.map((location, index) => (
                  <span key={index} className="intern-filter-tag">
                    {location}
                    <span
                      className="intern-remove-tag"
                      onClick={() => removeFilter(location, "location")}
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <button className="intern-clear-filters" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          </aside>

          <main className="intern-job-listings">
            <div className="intern-search-bar">
              <input
                type="text"
                className="intern-search-input"
                placeholder="Search by keywords (React, Node.js, Design...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="difuhtre_content intern-job-lists">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.employer_internship_post_dtls_id}
                    className="intern-job-card"
                  >
                    <div className="intern-job-header">
                      <div className="intern-job-info">
                        <h2>{job.employer_internship_post_position}</h2>
                        <div className="intern-job-meta">
                          {job.employer_organization_name} •{" "}
                          {job.employer_internship_post_location} •{" "}
                          {job.employer_internship_post_duration} months
                        </div>
                      </div>
                      <div className="intern-job-rate">
                        <div className="intern-job-rate-amount">
                          Rs {job.employer_internship_post_stipend_amount}/month
                        </div>
                        <div className="intern-job-rate-reply">
                          {formatDate(job.employer_internship_post_cr_date)}
                        </div>
                      </div>
                    </div>

                    <div className="intern-skills-list">
                      {JSON.parse(job.employer_internship_post_skills).map(
                        (skill, index) => (
                          <span key={index} className="intern-skill-tag">
                            {skill.label}
                          </span>
                        )
                      )}
                    </div>

                    <div
                      className="intern-skills-list"
                      style={{ marginTop: "8px" }}
                    >
                      {JSON.parse(job.employer_internship_post_perks).map(
                        (perk, index) => (
                          <span
                            key={index}
                            className="intern-skill-tag"
                            style={{
                              background: "#f0f9ff",
                              color: "#0369a1",
                            }}
                          >
                            {perk}
                          </span>
                        )
                      )}
                    </div>

                    <div className="intern-apply-section">
                      {job.employer_internship_post_status && (
                        <span className="intern-status-tag">
                          {job.employer_internship_post_supervision_type}
                        </span>
                      )}
                      <button
                        className={`intern-apply-btn ${
                          (appliedInternshipsID || []).includes(
                            job.employer_internship_post_dtls_id
                          )
                            ? "intern-apply-btn-applied"
                            : ""
                        }`}
                        onClick={() =>
                          handleApply(job.employer_internship_post_dtls_id)
                        }
                      >
                        {(appliedInternshipsID || []).includes(
                          job.employer_internship_post_dtls_id
                        )
                          ? "Applied"
                          : "Apply"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="intern-job-card">
                  <p className="text-center">No matching internships found.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
