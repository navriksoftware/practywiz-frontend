import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../../CaseStudy/CaseStudyDisplay.css";
import { ApiURL } from "../../../../../Utils/ApiURL";
import CaseStudyCard from "./CaseStudyCard";
import { useSelector } from "react-redux";
const Store = ({ userdata, setActivePage }) => {
  // State for case studies data and filters
  const [allCaseStudiesData, setAllCaseStudiesData] = useState([]);
  const [filteredCaseStudiesData, setFilteredCaseStudiesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [practyWizFilter, setPractyWizFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const facultydata = useSelector((state) => state.faculty.facultyDtls);

  const url = ApiURL();
  // Function to render stars based on rating


  // Fetch case studies data
  useEffect(() => {
    const fetchCaseStudies = async () => {
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
    fetchCaseStudies();
  }, [url]);



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

  // Apply filters and sorting whenever filter values change
  useEffect(() => {
    const filterAndSortData = () => {
      // First filter by search term
      let filtered = allCaseStudiesData.filter((caseStudy) => {
        const matchesSearch = searchTerm
          ? caseStudy.caseTopic.toLowerCase().includes(searchTerm.toLowerCase())
          : true;

        // Filter by PractyWiz status
        const matchesPractyWizFilter =
          practyWizFilter === "all" ||
          (practyWizFilter === "practywiz" && caseStudy.isPractyWiz) ||
          (practyWizFilter === "non-practywiz" && !caseStudy.isPractyWiz);

        return matchesSearch && matchesPractyWizFilter;
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
  }, [searchTerm, sortOrder, practyWizFilter, allCaseStudiesData]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder("newest");
    setPractyWizFilter("all");
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
  const renderSelectedPractyWizText = () => {
    switch (practyWizFilter) {
      case "all":
        return "All Cases";
      case "practywiz":
        return "PractyWiz";
      case "non-practywiz":
        return "Non-PractyWiz";
      default:
        return "Case Type";
    }
  };

  return (
    <>
      <div className="case-study-display-container">
        <div className="case-filter-container">
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

          {/* PractyWiz Filter Dropdown */}
          <div className="case-sort">
            <div className="case-dropdown">
              <button className="case-dropbtn">
                {renderSelectedPractyWizText()}
                <i className="fa fa-chevron-down"></i>
              </button>
              <div className="case-dropdown-content">
                <button
                  className={practyWizFilter === "all" ? "active" : ""}
                  onClick={() => setPractyWizFilter("all")}
                >
                  All Cases
                </button>
                <button
                  className={practyWizFilter === "practywiz" ? "active" : ""}
                  onClick={() => setPractyWizFilter("practywiz")}
                >
                  PractyWiz
                </button>
                <button
                  className={
                    practyWizFilter === "non-practywiz" ? "active" : ""
                  }
                  onClick={() => setPractyWizFilter("non-practywiz")}
                >
                  Non-PractyWiz
                </button>
              </div>
            </div>
          </div>

          {/* Sort Dropdown */}
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
            practyWizFilter !== "all") && (
              <button className="case-clear-btn" onClick={clearFilters}>
                Clear All
              </button>
            )}
        </div>

        <div className="app-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading case studies...</p>
            </div>
          ) : filteredCaseStudiesData.length > 0 ? (
            <div className="case-study-grid">
              {filteredCaseStudiesData.map((caseStudy) => (
                <CaseStudyCard
                  key={caseStudy.id}
                  caseStudyId={caseStudy.institute_case_assign_case_study_id}
                  data={caseStudy}
                  setActivePage={setActivePage}
                />
              ))}
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
