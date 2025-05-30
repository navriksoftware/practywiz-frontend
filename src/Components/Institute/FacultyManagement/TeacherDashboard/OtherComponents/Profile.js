import { useState, useEffect, useCallback } from "react";
import "../DashboardCSS/Profile.css";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";

const ActiveCaseStudies = ({ setActivePage }) => {
  const url = ApiURL();
  const facultyid = useSelector(
    (state) => state.faculty?.facultyDtls?.faculty_id || null
  );

  const [assignedCase, setAssignedCase] = useState([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    class: "All Classes",
    type: "All Cases",
    dueDate: "Due Date",
    status: "All Status",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch assigned case studies when facultyid is available
  useEffect(() => {
    const fetchAssignCaseStudiesDetails = async () => {
      if (!facultyid) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/dashboard/get-assigned-cases`, {
            facultyid,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);

        if (response.data.success) {
          setAssignedCase(response.data.success);
          setFilteredCaseStudies(response.data.success); // Initialize filtered list with full data
        } else if (response.data.error) {
          setAssignedCase([]);
          setFilteredCaseStudies([]);
        }
      } catch (error) {
        setAssignedCase([]);
        setFilteredCaseStudies([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignCaseStudiesDetails();
  }, [facultyid, url]);

  // Calculate metrics from actual data
  const totalActiveCases = assignedCase.length;

  // Calculate Practywiz and Non-Practywiz case counts
  const practywizCount = assignedCase.filter(
    (cs) => cs.case_type?.toLowerCase() === "practywiz"
  ).length;
  const nonPractywizCount = assignedCase.filter((cs) =>
    cs.case_type?.toLowerCase().includes("non")
  ).length;

  // Calculate cases due this week (next 7 days)
  const calculateCasesDueThisWeek = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return assignedCase.filter((caseStudy) => {
      if (!caseStudy.due_date) return false;
      const dueDate = new Date(caseStudy.due_date);
      return dueDate >= today && dueDate <= nextWeek;
    }).length;
  };

  // Count total unique students across all cases
  const calculateTotalStudents = () => {
    return assignedCase.reduce((sum, caseStudy) => {
      return sum + (caseStudy.number_of_students || 0);
    }, 0);
  };

  // Count unique classes
  const calculateUniqueClasses = () => {
    const uniqueClasses = new Set();
    assignedCase.forEach((caseStudy) => {
      if (caseStudy.class_name) {
        uniqueClasses.add(caseStudy.class_name);
      }
    });
    return uniqueClasses.size;
  };

  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate) => {
    if (!dueDate) return null;
    try {
      const now = new Date();
      const due = new Date(dueDate);
      const diffTime = due - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return "Overdue";
      if (diffDays === 0) return "Due today";
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} left`;
    } catch (error) {
      return null;
    }
  };
  //calculate progress of each case study
  const calculateProgress = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now < start) return 0; // Not started yet
    if (now > end) return 100; // Completed

    const totalDuration = end - start;
    const elapsedDuration = now - start;
    return Math.round((elapsedDuration / totalDuration) * 100);
  };

  const casesDueThisWeek = calculateCasesDueThisWeek();
  const studentParticipation = calculateTotalStudents();
  const totalClass = calculateUniqueClasses();

  // Apply filters function
  const applyFilters = useCallback((currentFilters, cases) => {
    if (!cases || cases.length === 0) return [];

    let result = [...cases];

    if (currentFilters.class !== "All Classes") {
      result = result.filter((cs) => cs.class_name === currentFilters.class);
    }

    if (currentFilters.type !== "All Cases") {
      // Make sure to check for Practywiz/Non-Practywiz correctly
      // Assuming case_type might be PractyWiz or practywiz in data
      if (currentFilters.type === "Practywiz") {
        result = result.filter(
          (cs) => cs.case_type?.toLowerCase() === "practywiz"
        );
      } else if (currentFilters.type === "Non-Practywiz") {
        result = result.filter((cs) =>
          cs.case_type?.toLowerCase().includes("non")
        );
      }
    }

    if (currentFilters.status !== "All Status") {
      result = result.filter(
        (cs) => cs.status?.toLowerCase() === currentFilters.status.toLowerCase()
      );
    }

    // Due date filtering
    if (currentFilters.dueDate !== "Due Date") {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      result = result.filter((cs) => {
        if (!cs.due_date) return false;

        const dueDate = new Date(cs.due_date);

        if (currentFilters.dueDate === "This Week") {
          // Due within the next 7 days
          return dueDate >= today && dueDate <= nextWeek;
        } else if (currentFilters.dueDate === "Next Week") {
          // Due between 7 and 14 days from now
          const twoWeeks = new Date();
          twoWeeks.setDate(today.getDate() + 14);
          return dueDate > nextWeek && dueDate <= twoWeeks;
        } else if (currentFilters.dueDate === "This Month") {
          // Due before the end of the current month
          return dueDate <= endOfMonth;
        }
        return true;
      });
    }

    return result;
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term, currentFilters, cases) => {
      if (!cases || cases.length === 0) {
        setFilteredCaseStudies([]);
        return;
      }

      let filtered = [...cases];

      // Apply search term
      if (term) {
        filtered = filtered.filter(
          (caseStudy) =>
            caseStudy.case_title.toLowerCase().includes(term.toLowerCase()) ||
            caseStudy.class_name.toLowerCase().includes(term.toLowerCase())
        );
      }

      // Apply other filters
      filtered = applyFilters(currentFilters, filtered);

      setFilteredCaseStudies(filtered);
    }, 300),
    [applyFilters]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value, filters, assignedCase);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    // Cancel any pending debounce to apply filters immediately
    debouncedSearch.cancel();

    // Apply filters immediately without debounce
    let filtered = [...assignedCase];

    // Apply search term first if exists
    if (searchTerm) {
      filtered = filtered.filter(
        (caseStudy) =>
          caseStudy.case_title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          caseStudy.class_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Then apply all filters including the new one
    filtered = applyFilters(newFilters, filtered);

    // Update state with filtered results
    setFilteredCaseStudies(filtered);
  };

  // Update filtered list whenever assignedCase changes
  useEffect(() => {
    debouncedSearch(searchTerm, filters, assignedCase);

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [assignedCase, debouncedSearch, filters, searchTerm]);

  // Get progress bar color based on progress value
  const getProgressColor = (progress) => {
    if (progress >= 70) return "#4285F4";
    if (progress >= 40) return "#4285F4";
    return "#4285F4";
  };

  const formatDate = (isoDateStr) => {
    if (!isoDateStr) return "N/A";
    try {
      const date = new Date(isoDateStr);
      const iso = date.toISOString().split("T")[0]; // "2025-05-24"
      const [year, month, day] = iso.split("-");
      return `${day}-${month}-${year}`;
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="teacher-profile-home-page-container">
        <div className="teacher-profile-home-page-header">
          <h1 className="teacher-profile-home-page-title">
            Loading Case Studies...
          </h1>
        </div>
      </div>
    );
  }

  // No faculty ID state
  // if (!facultyid) {
  //   return (
  //     <div className="teacher-profile-home-page-container">
  //       <div className="teacher-profile-home-page-header">
  //         <h1 className="teacher-profile-home-page-title">
  //           Faculty information not available
  //         </h1>
  //         <p>Please log in again or contact support.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="teacher-profile-home-page-container">
      <div className="teacher-profile-home-page-header">
        <div>
          <h1 className="teacher-profile-home-page-title">
            Case Studies Dashboard
          </h1>
          <p className="teacher-profile-home-page-subtitle">
            Manage your assigned case studies and track progress.
          </p>
        </div>
        <div className="teacher-profile-home-page-actions">
          <div className="teacher-profile-home-page-search">
            <i className="fa-solid fa-magnifying-glass teacher-profile-home-page-search-icon" />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="teacher-profile-home-page-metrics">
        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-book" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              PractyWiz Cases
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {practywizCount}
            </h2>
            <p className="teacher-profile-home-page-metric-change positive">
              Assigned PractyWiz Cases
            </p>
          </div>
        </div>

        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-users" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Case Assessment
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {nonPractywizCount}
            </h2>
            <p className="teacher-profile-home-page-metric-change positive">
              Assigned Non Practywiz Cases
            </p>
          </div>
        </div>

        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-calendar-week" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Cases Due This Week
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {casesDueThisWeek}
            </h2>
            <p
              className={`teacher-profile-home-page-metric-change ${
                casesDueThisWeek > 0 ? "negative" : "positive"
              }`}
            >
              {casesDueThisWeek > 0 ? "Urgent" : "None urgent"}
            </p>
          </div>
        </div>

        {/* <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-users" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Total Case Studies
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {studentParticipation}
            </h2>
            <p className="teacher-profile-home-page-metric-change positive">
              +5% from last month
            </p>
          </div>
        </div> */}

        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-chalkboard-user"></i>
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Assigned Classes
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {totalClass}
            </h2>
          </div>
        </div>
      </div>

      <div className="teacher-profile-home-page-filters">
        <div className="teacher-profile-home-page-filter-label">
          <i className="fa-solid fa-filter " />{" "}
          <span class="teacher-profile-home-page-filter-label-data">
            Filters:
          </span>
        </div>
        <div className="teacher-profile-home-page-filter-dropdowns">
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange("class", e.target.value)}
          >
            <option>All Classes</option>
            {/* Generate class options dynamically from available data */}
            {Array.from(new Set(assignedCase.map((c) => c.class_name)))
              .filter(Boolean)
              .sort()
              .map((className) => (
                <option key={className}>{className}</option>
              ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option>All Cases</option>
            <option>Practywiz</option>
            <option>Non-Practywiz</option>
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
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        </div>
      </div>

      {filteredCaseStudies.length > 0 ? (
        <div className="teacher-profile-home-page-case-studies">
          {filteredCaseStudies.map((caseStudy) => (
            <div
              key={caseStudy.faculty_case_assign_dtls_id}
              className="teacher-profile-home-page-case-card"
            >
              <div className="teacher-profile-home-page-case-case-type">
                <span
                  className={`teacher-profile-home-page-case-case-type-tag ${
                    caseStudy?.case_type?.toLowerCase() || ""
                  }`}
                >
                  {caseStudy.case_type || "Unknown"}
                </span>
              </div>
              <div className="teacher-profile-home-page-case-header">
                <h3 className="teacher-profile-home-page-case-title">
                  {caseStudy.case_title}
                </h3>
                <button className="teacher-profile-home-page-case-menu">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              <div className="teacher-profile-home-page-case-info">
                <div className="teacher-profile-home-page-case-detail">
                  <i className="fa-solid fa-graduation-cap" />
                  <span className="teacher-profile-home-page-case-detail-subj-tag">
                    {caseStudy.class_name}
                    {caseStudy.class_code ? `(${caseStudy.class_code})` : ""}
                  </span>
                </div>

                <div className="teacher-profile-home-page-case-detail">
                  <i className="fa-solid fa-user-friends" />
                  <span>{caseStudy.number_of_students || 0} Students</span>
                </div>

                <div className="teacher-profile-home-page-case-detail">
                  <i className="fa-solid fa-clock" />
                  <span>
                    Started{" "}
                    {formatDate(caseStudy.faculty_case_assign_start_date)}
                  </span>
                  <span>Due {formatDate(caseStudy.due_date)}</span>
                </div>
              </div>

              <div className="teacher-profile-home-page-case-progress">
                <div className="teacher-profile-home-page-progress-header">
                  <span>Progress</span>
                  <span>
                    {/* {calculateProgress(
                      caseStudy.faculty_case_assign_start_date,
                      caseStudy.due_date
                    )} */}
                    {getDaysRemaining(caseStudy.due_date) || "N/A"}
                    {/* % */}
                  </span>
                </div>
                <div className="teacher-profile-home-page-progress-bar">
                  <div
                    className="teacher-profile-home-page-progress-fill"
                    style={{
                      width: `${calculateProgress(
                        caseStudy.faculty_case_assign_start_date,
                        caseStudy.due_date
                      )}%`,
                      backgroundColor: getProgressColor(
                        calculateProgress(
                          caseStudy.faculty_case_assign_start_date,
                          caseStudy.due_date
                        )
                      ),
                    }}
                  ></div>
                </div>
              </div>

              <div className="teacher-profile-home-page-case-footer">
                <button
                  onClick={() => {
                    localStorage.setItem("caseStudyId", caseStudy.case_id);
                    localStorage.setItem("ClassId", caseStudy.class_id);
                    localStorage.setItem("caseType", caseStudy.case_type);
                    localStorage.setItem("facultyCaseAssignId", caseStudy.faculty_case_assign_dtls_id);
                    setActivePage("singlecase");
                  }}
                  className="teacher-profile-home-page-view-details"
                >
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="teacher-profile-home-page-no-cases">
          <p>
            No case studies found.{" "}
            {searchTerm
              ? "Try a different search term or filter."
              : "No cases assigned yet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActiveCaseStudies;
