import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { ApiURL } from "../../../../Utils/ApiURL";
import { useSelector } from "react-redux";
import "../DashboardCSS/CaseStudyAssignList.css";
import CaseStudyDetail from "./CaseStudyDetail";

const CaseStudyAssignList = () => {
  const menteeId = useSelector(
    (state) => state.mentee.singleMentee[0]?.mentee_dtls_id
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [fetchAssignCaseStudiesDetails, setfetchAssignCaseStudiesDetails] =
    useState([]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    class: "All Classes",
    type: "All Cases",
    dueDate: "Due Date",
    status: "All Status",
    time: "Newest First",
  });

  const formatDate = (isoDateStr) => {
    if (!isoDateStr) return "N/A";
    try {
      const date = new Date(isoDateStr);
      const iso = date.toISOString().split("T")[0];
      const [year, month, day] = iso.split("-");
      return `${day}-${month}-${year}`;
    } catch (error) {
      return "Invalid Date";
    }
  };

  const url = ApiURL();
  useEffect(() => {
    setIsLoading(true);
    const fetchAssignCaseStudiesDetailsCall = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/mentee/dashboard/case-studies-details`, {
            menteeId,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);

        if (response.data.success) {
          setfetchAssignCaseStudiesDetails(response.data.success);
        } else if (response.data.error) {
          setfetchAssignCaseStudiesDetails([]);
        }
      } catch (error) {
        setfetchAssignCaseStudiesDetails([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
        console.log("Request completed");
      }
    };
    fetchAssignCaseStudiesDetailsCall();
  }, [url, menteeId]);

  // Get unique class names for filter dropdown
  const uniqueClasses = [
    ...new Set(fetchAssignCaseStudiesDetails.map((cs) => cs.class_name)),
  ];

  // Helper: Determine if a case is active (due date >= today)
  const isCaseActive = (caseStudy) => {
    if (!caseStudy.faculty_case_assign_end_date) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueDate = new Date(caseStudy.faculty_case_assign_end_date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate >= now;
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (!term) {
        applyFilters(filters, fetchAssignCaseStudiesDetails);
        return;
      }

      const filtered = fetchAssignCaseStudiesDetails.filter((caseStudy) => {
        const title = caseStudy.faculty_case_assign_owned_by_practywiz
          ? caseStudy.case_study_title
          : caseStudy.non_practywiz_case_title;

        return (
          (title && title.toLowerCase().includes(term.toLowerCase())) ||
          (caseStudy.class_name &&
            caseStudy.class_name.toLowerCase().includes(term.toLowerCase())) ||
          (caseStudy.class_subject &&
            caseStudy.class_subject.toLowerCase().includes(term.toLowerCase()))
        );
      });

      setFilteredCaseStudies(filtered);
    }, 300),
    [fetchAssignCaseStudiesDetails, filters]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Apply filters function (status logic changed)
  const applyFilters = (currentFilters, cases) => {
    let result = [...cases];

    if (currentFilters.class !== "All Classes") {
      result = result.filter((cs) => cs.class_name === currentFilters.class);
    }

    if (currentFilters.type !== "All Cases") {
      if (currentFilters.type === "PractyWiz") {
        result = result.filter(
          (cs) =>
            cs.faculty_case_assign_owned_by_practywiz === true ||
            cs.faculty_case_assign_owned_by_practywiz === 1
        );
      } else if (currentFilters.type === "Non-PractyWiz") {
        result = result.filter(
          (cs) =>
            cs.faculty_case_assign_owned_by_practywiz === false ||
            cs.faculty_case_assign_owned_by_practywiz === 0
        );
      }
    }

    // Status filter based on due date
    if (currentFilters.status !== "All Status") {
      if (currentFilters.status === "Active") {
        result = result.filter((cs) => isCaseActive(cs));
      } else if (currentFilters.status === "Inactive") {
        result = result.filter((cs) => !isCaseActive(cs));
      }
    }

    if (currentFilters.dueDate !== "Due Date") {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const oneMonth = 30 * 24 * 60 * 60 * 1000;

      if (currentFilters.dueDate === "This Week") {
        result = result.filter((cs) => {
          const dueDate = new Date(cs.faculty_case_assign_end_date);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate - now <= oneWeek && dueDate >= now;
        });
      } else if (currentFilters.dueDate === "Next Week") {
        result = result.filter((cs) => {
          const dueDate = new Date(cs.faculty_case_assign_end_date);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate - now > oneWeek && dueDate - now <= 2 * oneWeek;
        });
      } else if (currentFilters.dueDate === "This Month") {
        result = result.filter((cs) => {
          const dueDate = new Date(cs.faculty_case_assign_end_date);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate - now <= oneMonth && dueDate >= now;
        });
      }
    }
    if (currentFilters.time == "Newest First") {
      result.sort((a, b) => {
        return (
          new Date(b.faculty_case_assign_start_date) -
          new Date(a.faculty_case_assign_start_date)
        );
      });
    } else {
      result.sort((a, b) => {
        return (
          new Date(a.faculty_case_assign_start_date) -
          new Date(b.faculty_case_assign_start_date)
        );
      });
    }

    setFilteredCaseStudies(result);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters, fetchAssignCaseStudiesDetails);
  };

  // Initialize filtered case studies
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);

  // Apply filters when fetchAssignCaseStudiesDetails changes
  useEffect(() => {
    if (fetchAssignCaseStudiesDetails.length > 0) {
      applyFilters(filters, fetchAssignCaseStudiesDetails);
    }
  }, [fetchAssignCaseStudiesDetails]);

  // Apply search when component mounts or search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Handle view case study button click
  const handleViewCaseStudy = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setShowDetailView(true);
  };

  // Handle back button click in detail view
  const handleBackToList = () => {
    setShowDetailView(false);
    setSelectedCaseStudy(null);
  };

  // If detail view is active, show the case study detail component
  if (showDetailView && selectedCaseStudy) {
    return (
      <CaseStudyDetail
        caseStudy={selectedCaseStudy}
        onBackClick={handleBackToList}
      />
    );
  }

  // Render case study cards (status logic changed)
  const renderCaseStudyCards = () => {
    if (isLoading) {
      return (
        <div className="CaseShow-Mentee-loader-wrapper">
          <div className="CaseShow-Mentee-loader"></div>
          <p>Loading case studies...</p>
        </div>
      );
    }

    if (filteredCaseStudies.length === 0) {
      return (
        <div className="CaseShow-Mentee-no-results-wrapper">
          <i className="fa-solid fa-search"></i>
          <p>No case studies found matching your criteria</p>
        </div>
      );
    }

    return filteredCaseStudies.map((caseStudy) => {
      const active = isCaseActive(caseStudy);
      return (
        <div
          key={caseStudy.faculty_case_assign_dtls_id}
          className="CaseShow-Mentee-case-card"
        >
          <div className="CaseShow-Mentee-case-case-type">
            <span
              className={`CaseShow-Mentee-case-case-type-tag ${
                caseStudy.faculty_case_assign_owned_by_practywiz
                  ? "practywiz"
                  : "non-practywiz"
              }`}
            >
              {caseStudy.faculty_case_assign_owned_by_practywiz
                ? "PractyWiz"
                : "Non-PractyWiz"}
            </span>
          </div>
          <div className="CaseShow-Mentee-case-header">
            <h3 className="CaseShow-Mentee-case-title">
              {caseStudy.faculty_case_assign_owned_by_practywiz
                ? caseStudy.case_study_title
                : caseStudy.non_practywiz_case_title}
            </h3>
          </div>

          <div className="CaseShow-Mentee-case-info">
            <div className="CaseShow-Mentee-case-detail">
              <i className="fa-solid fa-graduation-cap" />
              <span>{caseStudy.class_name}</span>
            </div>

            <div className="CaseShow-Mentee-case-detail">
              <i className="fa-solid fa-clock" />
              <span>
                Due {formatDate(caseStudy.faculty_case_assign_end_date)}
              </span>
            </div>
          </div>

          <div className="CaseShow-Mentee-case-footer">
            <div
              className={`CaseShow-Mentee-case-status ${
                active ? "active" : "inactive"
              }`}
            >
              {active ? "Active" : "Inactive"}
            </div>
            <button
              className="CaseShow-Mentee-view-details"
              onClick={() => handleViewCaseStudy(caseStudy)}
            >
              View Case Study
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="CaseShow-Mentee-container">
      <div className="CaseShow-Mentee-header">
        <div>
          <h1 className="CaseShow-Mentee-title">Case Studies</h1>
          <p className="CaseShow-Mentee-subtitle">
            View and manage your assigned case studies
          </p>
        </div>
        <div className="CaseShow-Mentee-actions">
          <div className="CaseShow-Mentee-search">
            <i className="fa-solid fa-search CaseShow-Mentee-search-icon"></i>
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="CaseShow-Mentee-filters">
        <div className="CaseShow-Mentee-filter-label">
          <i className="fa-solid fa-filter" /> Filters:
        </div>
        <div className="CaseShow-Mentee-filter-dropdowns">
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange("class", e.target.value)}
          >
            <option>All Classes</option>
            {uniqueClasses.map((className, index) => (
              <option key={index}>{className}</option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option>All Cases</option>
            <option>PractyWiz</option>
            <option>Non-PractyWiz</option>
          </select>

          <select
            value={filters.dueDate}
            onChange={(e) => handleFilterChange("dueDate", e.target.value)}
          >
            <option>Due Date</option>
            <option>This Week</option>
            <option>Next Week</option>
            <option>This Month</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select
            value={filters.time}
            onChange={(e) => handleFilterChange("time", e.target.value)}
          >
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      <div className="CaseShow-Mentee-case-studies">
        {renderCaseStudyCards()}
      </div>
    </div>
  );
};

export default CaseStudyAssignList;
