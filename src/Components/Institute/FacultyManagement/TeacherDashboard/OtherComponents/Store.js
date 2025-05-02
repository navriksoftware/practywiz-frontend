import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../../CaseStudy/CaseStudyDisplay.css";
import { ApiURL } from "../../../../../Utils/ApiURL";
import CaseStudyCard from "./CaseStudyCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Store = ({ userdata, setActivePage }) => {
  // State for case studies data and filters
  const [allCaseStudiesData, setAllCaseStudiesData] = useState([]);
  const [filteredCaseStudiesData, setFilteredCaseStudiesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [CaseType, setCaseType] = useState("practywiz");
  const [loading, setLoading] = useState(false);
  const facultydata = useSelector((state) => state.faculty.facultyDtls);
  localStorage.setItem("caseType", CaseType);
  // const [CaseType, setCaseType] = useState("practywiz");
  
  const url = ApiURL();
  // Function to render stars based on rating


  // Fetch case studies data
  useEffect(() => {

    const fetchPractywizCaseStudies = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/case-study/list`,
            { facultyId: facultydata?.faculty_id }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllCaseStudiesData(response.data.success);
          console.log("Case studies data fetched successfully:", response.data.success);
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
          axios.post(`${url}api/v1/faculty/case-study/list-non-practywiz-case`,
            { facultyId: facultydata?.faculty_id }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllCaseStudiesData(response.data.success);
          console.log("Case studies data fetched successfully:", response.data.success);
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

    if (CaseType == "practywiz") {
      fetchPractywizCaseStudies();
    }
    if (CaseType == "non-practywiz") {
      fetchNonPractywizCaseStudies();
    }
  }, [url, CaseType]);



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

  // Apply filters and sorting whenever filter values change
  useEffect(() => {
    const filterAndSortData = () => {
      // First filter by search term
      let filtered = allCaseStudiesData.filter((caseStudy) => {
        const matchesSearch = searchTerm
          ? caseStudy.caseTopic.toLowerCase().includes(searchTerm.toLowerCase())
          : true;

        // Filter by PractyWiz status
        // const matchesCaseType =
        //   CaseType === "all" ||
        //   (CaseType === "practywiz" && caseStudy.isPractyWiz) ||
        //   (CaseType === "non-practywiz" && !caseStudy.isPractyWiz);

        return matchesSearch;
      });

      // Then sort by date
      filtered = [...filtered].sort((a, b) => {
        const dateA = parseDate(a.publicationDate);
        const dateB = parseDate(b.publicationDate);

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
    // setCaseType("all");
  };

  // Render the selected sort option text
  const renderSelectedOptionText = () => {
    switch (sortOrder) {
      case "newest":
        return "Newest First";
      case "oldest":
        return "Oldest First";
      default:
        return "Sort By";
    }
  };

  // Render the selected PractyWiz filter text
  // const renderSelectedPractyWizText = () => {
  //   switch (CaseType) {
  //     case "all":
  //       return "All Cases";
  //     case "practywiz":
  //       return "PractyWiz";
  //     case "non-practywiz":
  //       return "Non-PractyWiz";
  //     default:
  //       return "Case Type";
  //   }
  // };

  return (
    <>
      <div className="case-study-display-container">
        {/* <div className="case-filter-container">
          <div className="case-search">
            <input
              type="text"
              placeholder="Search by topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="case-search-input"
            />
            <i className="fa fa-search search-icon"></i>
          </div>


         
          <div className="case-sort">
            <div className="case-dropdown">
              <button className="case-dropbtn">
              
                <i className="fa fa-chevron-down"></i>
              </button>
              <div className="case-dropdown-content">
              
                <button
                  className={CaseType === "practywiz" ? "active" : ""}
                  onClick={() => setCaseType("practywiz")}
                >
                  PractyWiz
                </button>
                <button
                  className={
                    CaseType === "non-practywiz" ? "active" : ""
                  }
                  onClick={() => setCaseType("non-practywiz")}
                >
                  Non-PractyWiz
                </button>
              </div>
            </div>
          </div>

         
          <div className="case-sort">
            <div className="case-dropdown">
              <button className="case-dropbtn">
                {renderSelectedOptionText()}
                <i className="fa fa-chevron-down"></i>
              </button>
              <div className="case-dropdown-content">
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
            </div>
          </div>

          {(searchTerm ||
            sortOrder !== "newest" ||
            CaseType !== "all") && (
              <button className="case-clear-btn" onClick={clearFilters}>
                Clear All
              </button>
            )}
        </div> */}

<div
          className="store-case-filter-container"
          style={{ justifyContent: "space-between" }}
        >
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
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                fontWeight: "500",
                cursor: "pointer",
                marginRight: "10px",
                transition: "all 0.3s ease",
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
          <div style={{ display: "flex", gap: "15px" }}>
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
                  // onClick={clearSearch}
                  style={{ cursor: "pointer" }}
                ></i>
              ) : (
                <i className="fa fa-search store-search-icon"></i>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="store-case-sort">
              <div className="store-case-dropdown">
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
              {filteredCaseStudiesData.map((caseStudy,index) => {
                if (CaseType === "practywiz") {
                  return (
                    <CaseStudyCard
                      key={index}
                      caseStudyId={caseStudy?.institute_case_assign_case_study_id}
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
              <h3>No case studies found </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Store;
