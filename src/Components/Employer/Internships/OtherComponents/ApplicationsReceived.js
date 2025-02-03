// // Date: 11-11-24 Tushar
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../InternshipCss/ApplicationReceived.css";
// import axios from "axios";
// import { ApiURL } from "../../../../Utils/ApiURL";

// const dummyData = [
//   {
//     id: 1,
//     name: "Tushar Khanagwal",
//     education: "B.Tech Delhi Technological University",
//     graduationYear: "2019-2023",
//     skills: ["React", "TypeScript", "Node.js", "GraphQL"],
//     location: "Delhi",
//     isShortlisted: false,
//   },
//   {
//     id: 2,
//     name: "Rahul Sharma",
//     education: "B.Tech Indian Institute of Technology",
//     graduationYear: "2018-2022",
//     skills: ["Angular", "JavaScript", "Express.js", "MongoDB"],
//     location: "Mumbai",
//     isShortlisted: false,
//   },
//   {
//     id: 3,
//     name: "Priya Singh",
//     education: "B.Tech Netaji Subhas University of Technology",
//     graduationYear: "2020-2024",
//     skills: ["React", "JavaScript", "Python", "Django"],
//     location: "Bangalore",
//     isShortlisted: false,
//   },

//   {
//     id: 4,
//     name: "Rahul Sharma",
//     education: "B.Tech Indian Institute of Technology",
//     graduationYear: "2018-2022",
//     skills: ["Angular", "JavaScript", "Express.js", "MongoDB"],
//     location: "Mumbai",
//     isShortlisted: false,
//   },
// ];

// const ApplicationsReceived = () => {
//   const { id } = useParams();
//   console.log("this is id", id);
//   const url = ApiURL();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [skillInput, setSkillInput] = useState("");
//   const [locationInput, setLocationInput] = useState("");
//   const [showShortlistedOnly, setShowShortlistedOnly] = useState(false);

//   // New state for mobile filter visibility
//   const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);

//   const [applicants, setApplicants] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     const fetchAppliedInternships = async () => {
//       try {
//         const response = await axios.post(
//           `${url}api/v1/employer/dashboard/applicants-list`,
//           {
//             internshipId: id,
//           }
//         );
//         setApplicants(response.data.success);
//         setFilteredData(response.data.success);
//       } catch (err) {
//         setApplicants([]);
//         console.error("Error fetching applied internships:", err);
//       }
//     };
//     fetchAppliedInternships();
//   }, [id, url]);
//   console.log(applicants);

//   const clearFilters = () => {
//     setSelectedSkills([]);
//     setSelectedLocations([]);
//     setSearchTerm("");
//     setSkillInput("");
//     setLocationInput("");
//     setShowShortlistedOnly(false);
//   };

//   const handleKeyPress = (e, type) => {
//     if (e.key === "Enter" && e.target.value.trim()) {
//       if (type === "skill") {
//         if (!selectedSkills.includes(e.target.value.trim())) {
//           setSelectedSkills([...selectedSkills, e.target.value.trim()]);
//         }
//         setSkillInput("");
//       } else if (type === "location") {
//         if (!selectedLocations.includes(e.target.value.trim())) {
//           setSelectedLocations([...selectedLocations, e.target.value.trim()]);
//         }
//         setLocationInput("");
//       }
//     }
//   };

//   const removeFilter = (value, type) => {
//     if (type === "skill") {
//       setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
//     } else if (type === "location") {
//       setSelectedLocations(
//         selectedLocations.filter((location) => location !== value)
//       );
//     }
//   };

//   const handleVewProfile = (Id) => {
//     navigate(`/internships/applicants/${Id}`);
//   };

//   const handleShortlist = (applicantId) => {
//     const updatedApplicants = applicants.map((applicant) => {
//       if (applicant.id === applicantId) {
//         return { ...applicant, isShortlisted: true };
//       }
//       return applicant;
//     });
//     setApplicants(updatedApplicants);
//     setShowShortlistedOnly(false);
//   };

//   console.log("selectedSkills", selectedSkills);

//   // Filter applicants based on various criteria
//   useEffect(() => {
//     let result = applicants;

//     // Filter by skills
//     if (selectedSkills.length > 0) {
//       result = result.filter((applicant) =>
//         selectedSkills.every((skill) =>
//           JSON.parse(applicant.mentee_skills).some((applicantSkill) =>
//             applicantSkill.toLowerCase().includes(skill.toLowerCase())
//           )
//         )
//       );
//     }

//     // Filter by location
//     if (selectedLocations.length > 0) {
//       result = result.filter((applicant) =>
//         selectedLocations.some((location) =>
//           applicant.employer_internship_post_location
//             .toLowerCase()
//             .includes(location.toLowerCase())
//         )
//       );
//     }

//     // Filter by search term
//     if (searchTerm) {
//       result = result.filter((applicant) => {
//         const searchString = searchTerm.toLowerCase();
//         const skills = JSON.parse(applicant.mentee_skills).map((skill) =>
//           skill.toLowerCase()
//         );
//         const qualification = JSON.parse(
//           applicant.mentee_institute_details
//         )[0].mentee_courseName.toLowerCase();

//         return (
//           applicant.mentee_firstname.toLowerCase().includes(searchString) ||
//           applicant.mentee_lastname.toLowerCase().includes(searchString) ||
//           skills.some((skill) => skill.includes(searchString)) ||
//           qualification.includes(searchString)
//         );
//       });
//     }

//     setFilteredData(result);
//   }, [applicants, selectedSkills, selectedLocations, searchTerm]);
//   console.log(filteredData);
//   console.log(
//     "edu",
//     applicants.map((applicant) =>
//       JSON.parse(applicant.mentee_institute_details)
//     )
//   );

//   return (
//     <div className="col-lg-10 ps-0">
//       <div className="gtyfdgfgf">
//         <div className="applications-received-board">
//           <div className="applications-outer-container">
//             <div style={{ textAlign: "center" }}>
//               <h2>Front end Intern</h2>{" "}
//               {/* Internship Title take from parent */}
//             </div>
//             <div className="applications-type">
//               <div
//                 className={`applications-type-header ${
//                   !showShortlistedOnly ? "active" : "inactive"
//                 }`}
//                 onClick={() => {
//                   setShowShortlistedOnly(false);
//                   setApplicants(applicants);
//                 }}
//               >
//                 All Applicants
//               </div>
//               <div
//                 className={`applications-type-header ${
//                   showShortlistedOnly ? "active" : "inactive"
//                 }`}
//                 onClick={() => {
//                   setShowShortlistedOnly(true);
//                   setApplicants(
//                     filteredData.filter((data) => data.isShortlisted)
//                   );
//                 }}
//               >
//                 Shortlisted
//               </div>
//             </div>

//             <div className="applications-main-content">
//               {/* <aside className="applications-filters"> */}
//               <aside
//                 className={`applications-filters ${
//                   isMobileFiltersVisible ? "mobile-filters-visible" : ""
//                 }`}
//               >
//                 {isMobileFiltersVisible && (
//                   <div className="applications-filter-overlay">
//                     <span
//                       className="applications-close-filters"
//                       onClick={() => setIsMobileFiltersVisible(false)}
//                     >
//                       X
//                     </span>
//                     <h2 className="applications-filter-overlay-lable">
//                       Filters
//                     </h2>
//                     <div
//                       className={`applications-search-bar ${
//                         isMobileFiltersVisible ? "mobile-filters-visible" : ""
//                       }`}
//                     >
//                       <input
//                         type="text"
//                         className="applications-search-input"
//                         placeholder="Search by keywords (React, Node.js, Design...)"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                       <button
//                         className="applications-search-btn"
//                         onClick={() => setIsMobileFiltersVisible(false)}
//                       >
//                         Search
//                       </button>
//                     </div>
//                   </div>
//                 )}
//                 <div className="applications-filter-section">
//                   <h3>Skills</h3>
//                   <input
//                     type="text"
//                     className="applications-filter-input"
//                     placeholder="Add a skill and press Enter..."
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, "skill")}
//                   />
//                   <div className="applications-selected-filters">
//                     {selectedSkills.map((skill, index) => (
//                       <span key={index} className="applications-filter-tag">
//                         {skill}
//                         <span
//                           className="applications-remove-tag"
//                           onClick={() => removeFilter(skill, "skill")}
//                         >
//                           ×
//                         </span>
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="applications-filter-section">
//                   <h3>Location</h3>
//                   <input
//                     type="text"
//                     className="applications-filter-input"
//                     placeholder="Add a location and press Enter..."
//                     value={locationInput}
//                     onChange={(e) => setLocationInput(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, "location")}
//                   />
//                   <div className="applications-selected-filters">
//                     {selectedLocations.map((location, index) => (
//                       <span key={index} className="applications-filter-tag">
//                         {location}
//                         <span
//                           className="applications-remove-tag"
//                           onClick={() => removeFilter(location, "location")}
//                         >
//                           ×
//                         </span>
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   className="applications-clear-filters"
//                   onClick={clearFilters}
//                 >
//                   Clear All Filters
//                 </button>
//               </aside>

//               <main className="applications-listings">
//                 <div
//                   className={`applications-search-bar ${
//                     isMobileFiltersVisible ? "mobile-filters-visible" : ""
//                   }`}
//                 >
//                   <input
//                     type="text"
//                     className="applications-search-input"
//                     placeholder="Search by keywords (React, Node.js, Design...)"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 {/* Mobile Filter Toggle Button */}
//                 <div className="applications-mobile-filter-toggle">
//                   <button
//                     className="applications-filter-mobile-btn"
//                     onClick={() =>
//                       setIsMobileFiltersVisible(!isMobileFiltersVisible)
//                     }
//                   >
//                     {isMobileFiltersVisible ? "Close Filters" : "Open Filters"}
//                   </button>
//                 </div>
//                 {/* test */}

//                 <div className="difuhtre_content applications-job-lists">
//                   {filteredData.length > 0 ? (
//                     filteredData.map((applicant) => (
//                       <div
//                         key={applicant.mentee_dtls_id}
//                         className="applications-card"
//                       >
//                         <div className="applications-header">
//                           <div className="applications-info">
//                             <h2>{`${applicant.mentee_firstname} ${applicant.mentee_lastname}`}</h2>
//                             <div className="applications-meta">
//                               <div className="applications-education">
//                                 {
//                                   JSON.parse(
//                                     applicant.mentee_institute_details
//                                   )[0].mentee_courseName
//                                 }
//                                 {" | "}
//                                 {
//                                   JSON.parse(
//                                     applicant.mentee_institute_details
//                                   )[0].mentee_instituteName
//                                 }
//                               </div>
//                               <div className="applications-graduation-year">
//                                 {
//                                   JSON.parse(
//                                     applicant.mentee_institute_details
//                                   )[0].mentee_institute_End_Year
//                                 }
//                               </div>
//                             </div>
//                           </div>
//                           <div className="applications-location">
//                             <div className="applications-location-amount">
//                               {applicant.employer_internship_post_location}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="applications-skills-list">
//                           {JSON.parse(applicant.mentee_skills)
//                             .slice(0, 6)
//                             .map((skill, index) => (
//                               <span
//                                 key={index}
//                                 className="applications-skill-tag"
//                               >
//                                 {skill}
//                               </span>
//                             ))}
//                         </div>

//                         <div className="applications-action-section">
//                           <span
//                             className="applications-view-profile-btn"
//                             onClick={() => handleVewProfile(applicant.id)}
//                           >
//                             View Profile
//                           </span>
//                           {!applicant.isShortlisted && (
//                             <button
//                               className="applications-shortlist-btn"
//                               onClick={() => handleShortlist(applicant.id)}
//                             >
//                               Shortlist
//                             </button>
//                           )}
//                           {applicant.isShortlisted && (
//                             <span className="applications-status-tag shortlisted">
//                               Shortlisted
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="applications-card">
//                       <p className="text-center">
//                         No applications received for the selected filters
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </main>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationsReceived;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../InternshipCss/ApplicationReceived.css";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ApplicationsReceived = () => {
  const { id } = useParams();
  const { profile } = useParams();
  console.log("this is id", profile);
  const location = useLocation();
  // const { roleProfile } = location.state || {};
  const url = ApiURL();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [showShortlistedOnly, setShowShortlistedOnly] = useState(false);
  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch applicants data
  useEffect(() => {
    const fetchAppliedInternships = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${url}api/v1/employer/dashboard/applicants-list`,
          { internshipId: id }
        );
        setApplicants(response.data.success);
        setFilteredData(response.data.success);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applicants");
        setApplicants([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppliedInternships();
  }, [id, url]);

  // Handle shortlisting
  const handleShortlist = async (applicantId) => {
    try {
      // Make POST request to update status
      const response = await axios.post(
        `${url}api/v1/employer/dashboard/update-applicant-status`,
        {
          internshipId: id,
          applicantId: applicantId,
          status: "shortlisted",
        }
      );
      if (!response.data.success) {
        toast.error("Failed to shortlist applicant. Please try again.");
        throw new Error("Failed to shortlist applicant. Please try again.");
      }

      // Update local state
      const updatedApplicants = applicants.map((applicant) => {
        if (applicant.mentee_dtls_id === applicantId) {
          return {
            ...applicant,
            mentee_internship_applied_status: "shortlisted",
            isShortlisted: true,
          };
        }
        return applicant;
      });

      setApplicants(updatedApplicants);
      setFilteredData(updatedApplicants);
    } catch (err) {
      setError("Failed to shortlist applicant. Please try again.");
    }
  };

  // Debounced search function
  const debouncedSearch = (value) => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  };

  // Filter handlers
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
      const value = e.target.value.trim();
      if (type === "skill" && !selectedSkills.includes(value)) {
        setSelectedSkills([...selectedSkills, value]);
        setSkillInput("");
      } else if (type === "location" && !selectedLocations.includes(value)) {
        setSelectedLocations([...selectedLocations, value]);
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

  // Filter applicants based on criteria
  useEffect(() => {
    let result = applicants;

    if (showShortlistedOnly) {
      result = result.filter(
        (applicant) =>
          applicant.mentee_internship_applied_status === "shortlisted"
      );
    }

    if (selectedSkills.length > 0) {
      result = result.filter((applicant) =>
        selectedSkills.every((skill) =>
          JSON.parse(applicant.mentee_skills).some((applicantSkill) =>
            applicantSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    if (selectedLocations.length > 0) {
      result = result.filter((applicant) =>
        selectedLocations.some((location) =>
          applicant.employer_internship_post_location
            .toLowerCase()
            .includes(location.toLowerCase())
        )
      );
    }

    if (searchTerm) {
      result = result.filter((applicant) => {
        const searchString = searchTerm.toLowerCase();
        const skills = JSON.parse(applicant.mentee_skills).map((skill) =>
          skill.toLowerCase()
        );
        const instituteDetails = JSON.parse(
          applicant.mentee_institute_details
        )[0];

        return (
          applicant.mentee_firstname.toLowerCase().includes(searchString) ||
          applicant.mentee_lastname.toLowerCase().includes(searchString) ||
          skills.some((skill) => skill.includes(searchString)) ||
          instituteDetails.mentee_courseName
            .toLowerCase()
            .includes(searchString) ||
          instituteDetails.mentee_instituteName
            .toLowerCase()
            .includes(searchString)
        );
      });
    }

    setFilteredData(result);
  }, [
    applicants,
    selectedSkills,
    selectedLocations,
    searchTerm,
    showShortlistedOnly,
  ]);

  if (isLoading) {
    return <div className="applications-card">Loading applicants...</div>;
  }

  return (
    <div className="col-lg-10 ps-0">
      <div className="gtyfdgfgf">
        <div className="applications-received-board">
          <div className="applications-outer-container">
            <div style={{ textAlign: "center" }}>
              <h2>{profile}</h2>
            </div>

            <div className="applications-type">
              <div
                className={`applications-type-header ${
                  !showShortlistedOnly ? "active" : "inactive"
                }`}
                onClick={() => setShowShortlistedOnly(false)}
              >
                All Applicants
              </div>
              <div
                className={`applications-type-header ${
                  showShortlistedOnly ? "active" : "inactive"
                }`}
                onClick={() => setShowShortlistedOnly(true)}
              >
                Shortlisted
              </div>
            </div>

            <div className="applications-main-content">
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
                      ×
                    </span>
                    <h2 className="applications-filter-overlay-lable">
                      Filters
                    </h2>
                    <div className="applications-search-bar">
                      <input
                        type="text"
                        className="applications-search-input"
                        placeholder="Search by keywords..."
                        onChange={(e) => debouncedSearch(e.target.value)}
                      />
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
                <div className="applications-search-bar">
                  <input
                    type="text"
                    className="applications-search-input"
                    placeholder="Search by keywords (React, Node.js, Design...)"
                    onChange={(e) => debouncedSearch(e.target.value)}
                  />
                </div>

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

                <div className="difuhtre_content applications-job-lists">
                  {applicants && filteredData?.length > 0 ? (
                    filteredData.map((applicant) => (
                      <div
                        key={applicant.mentee_dtls_id}
                        className="applications-card"
                      >
                        <div className="applications-header">
                          <div className="applications-info">
                            <h2>{`${applicant.mentee_firstname} ${applicant.mentee_lastname}`}</h2>
                            <div className="applications-meta">
                              <div className="applications-education">
                                {
                                  JSON.parse(
                                    applicant.mentee_institute_details
                                  )[0].mentee_courseName
                                }
                                {" | "}
                                {
                                  JSON.parse(
                                    applicant.mentee_institute_details
                                  )[0].mentee_instituteName
                                }
                              </div>
                              <div className="applications-graduation-year">
                                {
                                  JSON.parse(
                                    applicant.mentee_institute_details
                                  )[0].mentee_institute_End_Year
                                }
                              </div>
                            </div>
                          </div>
                          <div className="applications-location">
                            <div className="applications-location-amount">
                              {applicant.employer_internship_post_location}
                            </div>
                          </div>
                        </div>

                        <div className="applications-skills-list">
                          {JSON.parse(applicant.mentee_skills)
                            .slice(0, 6)
                            .map((skill, index) => (
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
                            onClick={() =>
                              navigate(
                                `/internships/applicants/${applicant.mentee_dtls_id}`
                              )
                            }
                          >
                            View Profile
                          </span>
                          {applicant.mentee_internship_applied_status !==
                            "shortlisted" && (
                            <button
                              className="applications-shortlist-btn"
                              onClick={() =>
                                handleShortlist(applicant.mentee_dtls_id)
                              }
                            >
                              Shortlist
                            </button>
                          )}
                          {applicant.mentee_internship_applied_status ===
                            "shortlisted" && (
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
