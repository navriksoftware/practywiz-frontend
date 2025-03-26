"use client";

import { useState, useEffect, useCallback } from "react";
import "../DashboardCSS/Profile.css";
import { debounce, set } from "lodash";
import { Link } from "react-router-dom";

// Sample data
const initialCaseStudies = [
  {
    id: 1,
    title: "Business Ethics in Modern Markets",
    department: "MBA - First Year",
    batch: "2024",
    students: 45,
    dueDate: "Feb 28, 2024",
    progress: 75,
    status: "Active",
    class: "MBA",
  },
  {
    id: 2,
    title: "Sustainable Development Goals",
    department: "Environmental Studies",
    batch: "2023",
    students: 32,
    dueDate: "Mar 05, 2024",
    progress: 60,
    status: "Active",
    class: "Environmental Studies",
  },
  {
    id: 3,
    title: "Global Supply Chain Management",
    department: "Operations Management",
    batch: "2024",
    students: 38,
    dueDate: "Mar 10, 2024",
    progress: 45,
    status: "Active",
    class: "Operations Management",
  },
  {
    id: 4,
    title: "Digital Transformation Strategy",
    department: "Information Systems",
    batch: "2024",
    students: 41,
    dueDate: "Mar 15, 2024",
    progress: 30,
    status: "Active",
    class: "Information Systems",
  },
  {
    id: 5,
    title: "Marketing Analytics Project",
    department: "Digital Marketing",
    batch: "2023",
    students: 35,
    dueDate: "Mar 20, 2024",
    progress: 25,
    status: "Active",
    class: "Digital Marketing",
  },
  {
    id: 6,
    title: "Financial Risk Assessment",
    department: "Finance Management",
    batch: "2024",
    students: 40,
    dueDate: "Mar 25, 2024",
    progress: 15,
    status: "Active",
    class: "Finance Management",
  },
];

const ActiveCaseStudies = ({ setActivePage }) => {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [filteredCaseStudies, setFilteredCaseStudies] =
    useState(initialCaseStudies);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    class: "All Classes",
    batch: "All Batches",
    dueDate: "Due Date",
    status: "All Status",
  });

  // Calculate metrics
  const totalActiveCases = caseStudies.length;
  const casesDueThisWeek = 8; // This would be calculated based on actual dates
  const studentParticipation = 87; // This would be calculated from actual data
  const completionRate = 92; // This would be calculated from actual data

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (!term) {
        applyFilters(filters, caseStudies);
        return;
      }

      const filtered = caseStudies.filter(
        (caseStudy) =>
          caseStudy.title.toLowerCase().includes(term.toLowerCase()) ||
          caseStudy.department.toLowerCase().includes(term.toLowerCase())
      );

      setFilteredCaseStudies(filtered);
    }, 300),
    [caseStudies, filters]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Apply filters function
  const applyFilters = (currentFilters, cases) => {
    let result = [...cases];

    if (currentFilters.class !== "All Classes") {
      result = result.filter((cs) => cs.class === currentFilters.class);
    }

    if (currentFilters.batch !== "All Batches") {
      result = result.filter(
        (cs) => cs.batch === currentFilters.batch.split(" ")[1]
      );
    }

    if (currentFilters.status !== "All Status") {
      result = result.filter((cs) => cs.status === currentFilters.status);
    }

    // For due date, we would implement actual date comparison logic
    // This is simplified for the example

    setFilteredCaseStudies(result);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters, caseStudies);
  };

  // Apply search when component mounts or search term changes
  useEffect(() => {
    debouncedSearch(searchTerm);

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Get progress bar color based on progress value
  const getProgressColor = (progress) => {
    if (progress >= 70) return "#4285F4";
    if (progress >= 40) return "#4285F4";
    return "#4285F4";
  };

  return (
    <div className="ye-waala-naya-h-container">
      <div className="ye-waala-naya-h-header">
        <div>
          <h1 className="ye-waala-naya-h-title">Active Case Studies</h1>
          <p className="ye-waala-naya-h-subtitle">
            Managing {totalActiveCases} active cases across different classes
          </p>
        </div>
        <div className="ye-waala-naya-h-actions">
          <div className="ye-waala-naya-h-search">
            <i className="fa-solid fa-filter ye-waala-naya-h-search-icon" />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="ye-waala-naya-h-add-button">
            <span>+</span> Add New Case
          </button>
        </div>
      </div>

      <div className="ye-waala-naya-h-metrics">
        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-book" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">Total Active Cases</p>
            <h2 className="ye-waala-naya-h-metric-value">{totalActiveCases}</h2>
            <p className="ye-waala-naya-h-metric-change positive">
              +12% from last month
            </p>
          </div>
          <div className="ye-waala-naya-h-metric-trend positive">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17L9 11L13 15L21 7"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 7V13H15"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-calendar-week" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">Cases Due This Week</p>
            <h2 className="ye-waala-naya-h-metric-value">{casesDueThisWeek}</h2>
            <p className="ye-waala-naya-h-metric-urgent">3 urgent</p>
          </div>
          <div className="ye-waala-naya-h-metric-trend warning">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 7L9 13L13 9L21 17"
                stroke="#FF9800"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 17V11H15"
                stroke="#FF9800"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-users" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">
              Student Participation
            </p>
            <h2 className="ye-waala-naya-h-metric-value">
              {studentParticipation}%
            </h2>
            <p className="ye-waala-naya-h-metric-change positive">
              +5% from last month
            </p>
          </div>
          <div className="ye-waala-naya-h-metric-trend positive">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17L9 11L13 15L21 7"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 7V13H15"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-chart-line" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">Completion Rate</p>
            <h2 className="ye-waala-naya-h-metric-value">{completionRate}%</h2>
            <p className="ye-waala-naya-h-metric-change positive">
              +8% from last month
            </p>
          </div>
          <div className="ye-waala-naya-h-metric-trend positive">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17L9 11L13 15L21 7"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 7V13H15"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="ye-waala-naya-h-filters">
        <div className="ye-waala-naya-h-filter-label">
          <i className="fa-solid fa-filter" /> Filters:
        </div>
        <div className="ye-waala-naya-h-filter-dropdowns">
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange("class", e.target.value)}
          >
            <option>All Classes</option>
            <option>MBA</option>
            <option>Environmental Studies</option>
            <option>Operations Management</option>
            <option>Information Systems</option>
            <option>Digital Marketing</option>
            <option>Finance Management</option>
          </select>

          <select
            value={filters.batch}
            onChange={(e) => handleFilterChange("batch", e.target.value)}
          >
            <option>All Batches</option>
            <option>Batch 2023</option>
            <option>Batch 2024</option>
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

      <div className="ye-waala-naya-h-case-studies">
        {filteredCaseStudies.map((caseStudy) => (
          <div key={caseStudy.id} className="ye-waala-naya-h-case-card">
            <div className="ye-waala-naya-h-case-header">
              <h3 className="ye-waala-naya-h-case-title">{caseStudy.title}</h3>
              <button className="ye-waala-naya-h-case-menu">
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

            <div className="ye-waala-naya-h-case-info">
              <div className="ye-waala-naya-h-case-detail">
                <i className="fa-solid fa-graduation-cap" />
                <span>{caseStudy.department}</span>
              </div>

              <div className="ye-waala-naya-h-case-detail">
                <i className="fa-solid fa-user-friends" />
                <span>
                  Batch {caseStudy.batch} • {caseStudy.students} Students
                </span>
              </div>

              <div className="ye-waala-naya-h-case-detail">
                <i className="fa-solid fa-clock" />
                <span>Due {caseStudy.dueDate}</span>
              </div>
            </div>

            <div className="ye-waala-naya-h-case-progress">
              <div className="ye-waala-naya-h-progress-header">
                <span>Progress</span>
                <span>{caseStudy.progress} %</span>
              </div>
              <div className="ye-waala-naya-h-progress-bar">
                <div
                  className="ye-waala-naya-h-progress-fill"
                  style={{
                    width: `${caseStudy.progress}%`,
                    backgroundColor: getProgressColor(caseStudy.progress),
                  }}
                ></div>
              </div>
            </div>

            <div className="ye-waala-naya-h-case-footer">
              <div
                className={`ye-waala-naya-h-case-status ${caseStudy.status.toLowerCase()}`}
              >
                {caseStudy.status}
              </div>
              <button
                onClick={() => setActivePage("singlecase")}
                className="ye-waala-naya-h-view-details"
              >
                View Case Study
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCaseStudies;
