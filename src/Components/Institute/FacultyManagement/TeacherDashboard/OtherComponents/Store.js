import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../../CaseStudy/CaseStudyDisplay.css";
import { ApiURL } from "../../../../../Utils/ApiURL";
import CaseStudyCard from "./CaseStudyCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CaseRequestForm from "./CaseRequestForm";

const Store = ({ userdata, setActivePage }) => {
  // State for case studies data and filters
  const [allCaseStudiesData, setAllCaseStudiesData] = useState([]);
  const [filteredCaseStudiesData, setFilteredCaseStudiesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [CaseType, setCaseType] = useState("practywiz");
  const [loading, setLoading] = useState(false);
  const facultydata = useSelector((state) => state.faculty.facultyDtls);

  const [isCaseReqFormOpem, setCaseReqFormOpem] = useState(false);

  localStorage.setItem("caseType", CaseType);

  const url = ApiURL();

  // Fetch case studies data
  useEffect(() => {
    const fetchPractywizCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/case-study/list`, {
            facultyId: facultydata?.faculty_id,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllCaseStudiesData(response.data.success);
          console.log(
            "Case studies data fetched successfully:",
            response.data.success
          );
        } else if (response.data.error) {
          setAllCaseStudiesData([]);
        }
      } catch (error) {
        setAllCaseStudiesData([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchNonPractywizCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.post(
            `${url}api/v1/faculty/case-study/list-non-practywiz-case`,
            { facultyId: facultydata?.faculty_id }
          ),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllCaseStudiesData(response.data.success);
          console.log(
            "Case studies data fetched successfully:",
            response.data.success
          );
        } else if (response.data.error) {
          setAllCaseStudiesData([]);
        }
      } catch (error) {
        setAllCaseStudiesData([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (CaseType === "practywiz") {
      fetchPractywizCaseStudies();
    }
    if (CaseType === "non-practywiz") {
      fetchNonPractywizCaseStudies();
    }
  }, [url, CaseType, facultydata?.faculty_id]);

  // Parse date function for sorting
  const parseDate = (dateString) => {
    if (!dateString) return new Date(0); // Handle missing dates

    const [day, month, year] = dateString.split("-");
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    // Handle potential parsing errors
    try {
      return new Date(parseInt(year), monthMap[month], parseInt(day));
    } catch (error) {
      console.error("Date parsing error:", error);
      return new Date(0);
    }
  };

  const handleTabChange = (tab) => {
    setCaseType(tab);
  };

  const openPopup = () => {
    setCaseReqFormOpem(true);
  };

  const closePopup = () => {
    setCaseReqFormOpem(false);
  };

  // Apply filters and sorting whenever filter values change
  useEffect(() => {
    const filterAndSortData = () => {
      // First filter by search term
      let filtered = allCaseStudiesData.filter((caseStudy) => {
        if (!searchTerm) return true; // If no search term, include all

        const searchTermLower = searchTerm.toLowerCase();

        // Handle different field names based on case type
        if (CaseType === "practywiz") {
          // For practywiz case studies

          // Check case_study_title (or fallback to caseTopic)
          const title =
            caseStudy?.case_study_title || caseStudy?.caseTopic || "";
          if (title.toLowerCase().includes(searchTermLower)) return true;

          // Check case_study_categories
          try {
            // Handle categories if they exist
            if (caseStudy?.case_study_categories) {
              // Handle both string JSON format and array format
              let categories = caseStudy.case_study_categories;

              // Parse if it's a JSON string
              if (typeof categories === "string") {
                try {
                  categories = JSON.parse(categories);
                } catch (e) {
                  // If can't parse as JSON array, just use as string
                  if (categories.toLowerCase().includes(searchTermLower))
                    return true;
                }
              }

              // If it's an array, check each category
              if (Array.isArray(categories)) {
                for (const category of categories) {
                  if (category.toLowerCase().includes(searchTermLower))
                    return true;
                }
              }
            }

            // Check author if available
            const author = caseStudy?.case_study_author || "";
            if (author.toLowerCase().includes(searchTermLower)) return true;
          } catch (error) {
            console.log("Error checking practywiz fields:", error);
          }
        } else {
          // For non-practywiz case studies

          // Check non_practywiz_case_title
          const title = caseStudy?.non_practywiz_case_title || "";
          if (title.toLowerCase().includes(searchTermLower)) return true;

          // Check non_practywiz_case_category
          try {
            // Handle categories if they exist
            if (caseStudy?.non_practywiz_case_category) {
              // Handle both string JSON format and array format
              let categories = caseStudy.non_practywiz_case_category;

              // Parse if it's a JSON string
              if (typeof categories === "string") {
                try {
                  categories = JSON.parse(categories);
                } catch (e) {
                  // If can't parse as JSON array, just use as string
                  if (categories.toLowerCase().includes(searchTermLower))
                    return true;
                }
              }

              // If it's an array, check each category
              if (Array.isArray(categories)) {
                for (const category of categories) {
                  if (category.toLowerCase().includes(searchTermLower))
                    return true;
                }
              }
            }

            // Check non_practywiz_case_author
            const author = caseStudy?.non_practywiz_case_author || "";
            if (author.toLowerCase().includes(searchTermLower)) return true;
          } catch (error) {
            console.log("Error checking non-practywiz fields:", error);
          }
        }

        return false;
      });

      // Then sort by date
      filtered = [...filtered].sort((a, b) => {
        const dateA = parseDate(a?.publicationDate);
        const dateB = parseDate(b?.publicationDate);

        return sortOrder === "newest"
          ? dateB - dateA // Newest first
          : dateA - dateB; // Oldest first
      });

      setFilteredCaseStudiesData(filtered);
    };

    filterAndSortData();
  }, [searchTerm, sortOrder, CaseType, allCaseStudiesData]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder("newest");
  };

  // Handle clearing the search input
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <div className="case-study-display-container">
        <div className="store-case-filter-container">
          {/* Tab Selection */}
          <div className="store-case-tabs">
            <button
              className={`store-tab-btn ${
                CaseType === "practywiz" ? "active" : ""
              }`}
              onClick={() => handleTabChange("practywiz")}
              style={{
                backgroundColor:
                  CaseType === "practywiz" ? "#2563eb" : "#f1f5f9",
                color: CaseType === "practywiz" ? "white" : "#333",
              }}
            >
              PRACTYWIZ CASE
            </button>
            <button
              className={`store-tab-btn ${
                CaseType === "non-practywiz" ? "active" : ""
              }`}
              onClick={() => handleTabChange("non-practywiz")}
              style={{
                backgroundColor:
                  CaseType === "non-practywiz" ? "#2563eb" : "#f1f5f9",
                color: CaseType === "non-practywiz" ? "white" : "#333",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              NON PRACTYWIZ CASE
            </button>
          </div>

          {/* Search and Sort Container */}
          <div className="store-case-filter-tabs">
            {/* Search Input */}
            <div className="store-case-search">
              <input
                type="text"
                placeholder="Search by topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="store-case-search-input"
              />
              {searchTerm ? (
                <i
                  className="fa fa-times store-search-icon"
                  onClick={clearSearch}
                  style={{ cursor: "pointer" }}
                ></i>
              ) : (
                <i className="fa fa-search store-search-icon"></i>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="store-case-sort">
              {/* <div className="store-case-dropdown">
                <button className="store-case-dropbtn">
                  {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                  <i className="fa fa-chevron-down"></i>
                </button>
                <div className="store-case-dropdown-content">
                  <button
                    className={sortOrder === "newest" ? "active" : ""}
                    onClick={() => setSortOrder("newest")}
                  >
                    Newest First
                  </button>
                  <button
                    className={sortOrder === "oldest" ? "active" : ""}
                    onClick={() => setSortOrder("oldest")}
                  >
                    Oldest First
                  </button>
                </div>
              </div> */}
              <div className="store-case-request-container">
                <button
                  className="store-case-request-btn"
                  onClick={() => {
                    setCaseReqFormOpem(true);
                  }}
                >
                  <i className="fa-solid fa-plus"></i> Request Case
                </button>
                <CaseRequestForm
                  isOpen={isCaseReqFormOpem}
                  onClose={closePopup}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="app-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading case studies...</p>
            </div>
          ) : filteredCaseStudiesData.length > 0 ? (
            <div className="case-study-grid">
              {filteredCaseStudiesData.map((caseStudy, index) => {
                if (CaseType === "practywiz") {
                  return (
                    <CaseStudyCard
                      key={index}
                      caseStudyId={
                        caseStudy?.institute_case_assign_case_study_id
                      }
                      data={caseStudy}
                      setActivePage={setActivePage}
                      CaseType={CaseType}
                    />
                  );
                } else if (CaseType === "non-practywiz") {
                  return (
                    <CaseStudyCard
                      key={index}
                      caseStudyId={caseStudy?.non_practywiz_case_dtls_id}
                      data={caseStudy}
                      setActivePage={setActivePage}
                      CaseType={CaseType}
                    />
                  );
                } else {
                  return null; // Optional: return nothing for unmatched filters
                }
              })}
            </div>
          ) : (
            <div className="no-results">
              <h3>No case studies found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Store;
