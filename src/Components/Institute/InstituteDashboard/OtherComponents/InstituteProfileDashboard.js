import React, { useState, useEffect } from "react";
import "../DashboardCSS/InstituteProfileDashboard.css";

const InstituteProfileDashboard = ({ HandleSingleTeacherDetails,setchildData}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("");
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Sample data
  const caseStudies = [
    {
      id: 1,
      title: "Handling Mid to Senior Management Attrition",
      subject: "Management Studies",
      assignedTo: "Dr. Ramani",
      assignedDate: "May 09, 2025",
      status: "Active",
    },
    {
      id: 2,
      title: "Renewable Energy Solutions",
      subject: "Environmental Science",
      assignedTo: "Dr. Ravi",
      assignedDate: "Oct 12, 2023",
      status: "Completed",
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      subject: "Marketing",
      assignedTo: "Tushar",
      assignedDate: "Oct 10, 2023",
      status: "Pending",
    },
    {
      id: 4,
      title: "Healthcare Innovation",
      subject: "Healthcare Management",
      assignedTo: "Gagan verma",
      assignedDate: "Oct 8, 2023",
      status: "Active",
    },
    // { id: 5, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    // { id: 6, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    // { id: 7, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    // { id: 8, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    // { id: 9, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    // { id: 10, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
  ];

  // Dashboard metrics
  const totalCases = 30;
  const activeCases = 24;
  const completedCases = 6;
  const pendingReview = 7;

  // Get unique subjects
  const subjects = [...new Set(caseStudies.map((cs) => cs.subject))];

  // Get unique statuses
  const statuses = [...new Set(caseStudies.map((cs) => cs.status))];

  // Date range options
  const dateRanges = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "This year",
  ];

  const InstituteDashboardCaseStudyCard = ({
    title,
    subject,
    assignedTo,
    assignedDate,
    onView,
  }) => {
    return (
      <div className="institute-dashboard-case-study-card">
        <div className="institute-dashboard-case-study-header">
          <h3 className="institute-dashboard-case-study-title">{title}</h3>
          <p className="institute-dashboard-case-study-subject">{subject}</p>
        </div>

        <div className="institute-dashboard-case-study-details">
          <div className="institute-dashboard-case-study-detail-item">
            <span className="institute-dashboard-case-study-label">
              Assigned To
            </span>
            <span className="institute-dashboard-case-study-value">
              {assignedTo}
            </span>
          </div>

          <div className="institute-dashboard-case-study-detail-item">
            <span className="institute-dashboard-case-study-label">Date</span>
            <span className="institute-dashboard-case-study-value">
              {assignedDate}
            </span>
          </div>
        </div>

        <div className="institute-dashboard-case-study-actions">
          <button
            className="institute-dashboard-case-study-view-btn"
            onClick={onView}
          >
            View
            <i className="fa-solid fa-chevron-right institute-dashboard-case-study-arrow-icon"></i>
          </button>
        </div>
      </div>
    );
  };

  // Filter case studies
  useEffect(() => {
    let result = [...caseStudies];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (cs) =>
          cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cs.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((cs) => cs.status === statusFilter);
    }

    // Apply subject filter
    if (subjectFilter) {
      result = result.filter((cs) => cs.subject === subjectFilter);
    }

    // Apply date range filter
    if (dateRangeFilter) {
      // For demo purposes, we'll just filter but in a real app
      // you would implement actual date filtering logic
      const today = new Date();
      const dates = {
        "Last 7 days": new Date(today.setDate(today.getDate() - 7)),
        "Last 30 days": new Date(today.setDate(today.getDate() - 30)),
        "Last 90 days": new Date(today.setDate(today.getDate() - 90)),
        "This year": new Date(today.getFullYear(), 0, 1),
      };

      // Simple simulation of date filtering
      if (dateRangeFilter === "Last 7 days") {
        result = result.filter(
          (cs) =>
            cs.assignedDate.includes("Oct 10") ||
            cs.assignedDate.includes("Oct 12") ||
            cs.assignedDate.includes("Oct 15")
        );
      } else if (dateRangeFilter === "Last 30 days") {
        result = result.filter((cs) => true); // All are within last 30 days in our example
      }
    }

    setFilteredCaseStudies(result);
  }, [searchQuery, statusFilter, subjectFilter, dateRangeFilter]);

  // Status label styling
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "instituteDashboard-status-active";
      case "Completed":
        return "instituteDashboard-status-completed";
      case "Pending":
        return "instituteDashboard-status-pending";
      default:
        return "";
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setSubjectFilter("");
    setDateRangeFilter("");
  };

  // Toggle dropdowns
  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
    setShowSubjectDropdown(false);
    setShowDateDropdown(false);
  };

  const toggleSubjectDropdown = () => {
    setShowSubjectDropdown(!showSubjectDropdown);
    setShowStatusDropdown(false);
    setShowDateDropdown(false);
  };

  const toggleDateDropdown = () => {
    setShowDateDropdown(!showDateDropdown);
    setShowStatusDropdown(false);
    setShowSubjectDropdown(false);
  };

  return (
    <div className="instituteDashboard-container">
      <div className="instituteDashboard-breadcrumb">Institute Dashboard</div>

      <div className="teacher-profile-home-page-metrics">
        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-book" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Purchased Case Studies
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {totalCases}
            </h2>
            {/* <p className="teacher-profile-home-page-metric-change positive">
             PractyWiz & Non-PractyWiz
            </p> */}
          </div>
        </div>

        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-calendar-week" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Utilized Case Studies
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {activeCases}
            </h2>
          </div>
        </div>

        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-users" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Unutilized Case Studies
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {completedCases}
            </h2>
          </div>
        </div>

        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-chalkboard-user"></i>
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Total Faculty member
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {pendingReview}
            </h2>
          </div>
        </div>
      </div>

      <div className="instituteDashboard-filters-container">
        <div className="teacher-profile-home-page-actions">
          <div className="teacher-profile-home-page-search">
            <i className="fa-solid fa-magnifying-glass teacher-profile-home-page-search-icon" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <button className="teacher-profile-home-page-add-button">
            <span>+</span> Assign New Case Study
          </button> */}
        </div>
        <div className="instituteDashboard-filter-buttons">
          <div className="instituteDashboard-filter-dropdown">
            <button
              className="instituteDashboard-filter-btn"
              onClick={toggleStatusDropdown}
            >
              <span className="instituteDashboard-filter-icon">
                <i className="fa-solid fa-caret-down"></i>
              </span>
              {statusFilter || "Status"}
            </button>
            {showStatusDropdown && (
              <div className="instituteDashboard-dropdown-content">
                <div
                  className="instituteDashboard-dropdown-item"
                  onClick={() => {
                    setStatusFilter("");
                    setShowStatusDropdown(false);
                  }}
                >
                  All Statuses
                </div>
                {statuses.map((status) => (
                  <div
                    key={status}
                    className="instituteDashboard-dropdown-item"
                    onClick={() => {
                      setStatusFilter(status);
                      setShowStatusDropdown(false);
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="instituteDashboard-filter-dropdown">
            <button
              className="instituteDashboard-filter-btn"
              onClick={toggleSubjectDropdown}
            >
              <span className="instituteDashboard-filter-icon">☰</span>
              {subjectFilter || "Subject"}
            </button>
            {showSubjectDropdown && (
              <div className="instituteDashboard-dropdown-content">
                <div
                  className="instituteDashboard-dropdown-item"
                  onClick={() => {
                    setSubjectFilter("");
                    setShowSubjectDropdown(false);
                  }}
                >
                  All Subjects
                </div>
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="instituteDashboard-dropdown-item"
                    onClick={() => {
                      setSubjectFilter(subject);
                      setShowSubjectDropdown(false);
                    }}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="instituteDashboard-filter-dropdown">
            <button
              className="instituteDashboard-filter-btn"
              onClick={toggleDateDropdown}
            >
              <span className="instituteDashboard-filter-icon">
                <i class="fa-solid fa-calendar-week"></i>
              </span>
              {dateRangeFilter || "Date Range"}
            </button>
            {showDateDropdown && (
              <div className="instituteDashboard-dropdown-content">
                <div
                  className="instituteDashboard-dropdown-item"
                  onClick={() => {
                    setDateRangeFilter("");
                    setShowDateDropdown(false);
                  }}
                >
                  All Dates
                </div>
                {dateRanges.map((range) => (
                  <div
                    key={range}
                    className="instituteDashboard-dropdown-item"
                    onClick={() => {
                      setDateRangeFilter(range);
                      setShowDateDropdown(false);
                    }}
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
          </div>

          {(statusFilter || subjectFilter || dateRangeFilter) && (
            <button
              className="instituteDashboard-clear-filter-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      <div className="instituteDashboard-table-container">
        <table className="instituteDashboard-case-studies-table">
          <thead>
            <tr>
              <th>Case Study Title</th>
              <th>Subject Area</th>
              <th>Assigned To</th>
              <th>Assigned Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCaseStudies.length > 0 ? (
              filteredCaseStudies.map((caseStudy) => (
                <tr key={caseStudy.id}>
                  <td>{caseStudy.title}</td>
                  <td>{caseStudy.subject}</td>
                  <td>{caseStudy.assignedTo}</td>
                  <td>{caseStudy.assignedDate}</td>
                  {/* <td>
                    <span className={`instituteDashboard-status-badge ${getStatusClass(caseStudy.status)}`}>
                      {caseStudy.status}
                    </span>
                  </td> */}
                  <td className="instituteDashboard-actions-cell">
                    <button
                      className="instituteDashboard-action-btn instituteDashboard-view-btn"
                      onClick={()=>{HandleSingleTeacherDetails()
                        setchildData(caseStudy.id)
                      }}
                    >
                      View
                    </button>
                    {/* <button className="instituteDashboard-action-btn instituteDashboard-edit-btn">Edit</button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="instituteDashboard-no-results">
                  No case studies found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view (tablet and mobile) */}
      {/* <div className="institute-dashboard-case-study-cards-container">
        {filteredCaseStudies.length > 0 ? (
          filteredCaseStudies.map((caseStudy) => (
            <InstituteDashboardCaseStudyCard
              key={caseStudy.id}
              title={caseStudy.title}
              subject={caseStudy.subject}
              assignedTo={caseStudy.assignedTo}
              assignedDate={caseStudy.assignedDate}
              onView={HandleSingleTeacherDetails}
            />
          ))
        ) : (
          <div className="institute-dashboard-case-study-no-results">
            No case studies found matching your filters.
          </div>
        )}
      </div> */}
    </div>
  );
};

export default InstituteProfileDashboard;
