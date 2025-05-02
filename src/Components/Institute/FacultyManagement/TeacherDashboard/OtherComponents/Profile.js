import { useState, useEffect, useCallback } from "react";
import "../DashboardCSS/Profile.css";
import { debounce, set } from "lodash";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";
// Sample data
// const assignedCase = [
//   {
//     id: 1,
//     title: "Competing Against A Product Leader",
//     department: "FIN 301, BUS 202",
//     batch: "2024",
//     students: 45,
//     dueDate: "Feb 28, 2024",
//     progress: 75,
//     status: "Active",
//     class: "MBA",
//     type: "PractyWiz",
//   },
//   {
//     id: 2,
//     title: "Sustainable Development Goals",
//     department: "ECO 101, ENV 202",
//     batch: "2023",
//     students: 32,
//     dueDate: "Mar 05, 2024",
//     progress: 60,
//     status: "Active",
//     class: "Environmental Studies",
//     type: "PractyWiz",
//   },
//   {
//     id: 3,
//     title: "Global Supply Chain Management",
//     department: "MKT 101",
//     batch: "2024",
//     students: 38,
//     dueDate: "Mar 10, 2024",
//     progress: 45,
//     status: "Active",
//     class: "Operations Management",
//     type: "Non-PractyWiz",
//   },
//   {
//     id: 4,
//     title: "Digital Transformation Strategy",
//     department: "ENT 401",
//     batch: "2024",
//     students: 41,
//     dueDate: "Mar 15, 2024",
//     progress: 30,
//     status: "Active",
//     class: "Information Systems",
//     type: "PractyWiz",
//   },
//   {
//     id: 5,
//     title: "Marketing Analytics Project",
//     department: "BUS 202",
//     batch: "2023",
//     students: 35,
//     dueDate: "Mar 20, 2024",
//     progress: 25,
//     status: "Completed",
//     class: "Digital Marketing",
//     type: "Non-PractyWiz",
//   },
//   {
//     id: 6,
//     title: "Financial Risk Assessment",
//     department: "ENT 401",
//     batch: "2024",
//     students: 40,
//     dueDate: "Mar 25, 2024",
//     progress: 15,
//     status: "Active",
//     class: "Finance Management",
//     type: "Non-PractyWiz",
//   },
// ];



const ActiveCaseStudies = ({ setActivePage }) => {

  const url = ApiURL();

  const facultyid = useSelector((state) => state.faculty.facultyDtls.faculty_id);
  const [assignedCase, setassignedCase] = useState([]);
  useEffect(() => {
    const fetchAssignCaseStudiesDetails = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/dashboard/get-assigned-cases`, {
            facultyid
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setassignedCase(response.data.success);
        } else if (response.data.error) {
          setassignedCase([]);
        }
      } catch (error) {
        setassignedCase([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        console.log("Request completed");
      }
    };
    fetchAssignCaseStudiesDetails();
  }, [url]);


 
  const [filteredCaseStudies, setFilteredCaseStudies] =
    useState(assignedCase);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    class: "All Classes",
    type: "All Cases",
    dueDate: "Due Date",
    status: "All Status",
  });

  // Calculate metrics
  const totalActiveCases = assignedCase.length;
  const casesDueThisWeek = 8; // This would be calculated based on actual dates
  const studentParticipation = 17; // This would be calculated from actual data
  const completionRate = 6; // This would be calculated from actual data

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      if (!term) {
        applyFilters(filters, assignedCase);
        return;
      }

      const filtered = assignedCase.filter(
        (caseStudy) =>
          caseStudy.case_title.toLowerCase().includes(term.toLowerCase()) ||
          caseStudy.class_name.toLowerCase().includes(term.toLowerCase())
      );

      setFilteredCaseStudies(filtered);
    }, 300),
    [assignedCase, filters]
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

    if (currentFilters.type !== "All Cases") {
      result = result.filter((cs) => cs.type === currentFilters.type);
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
    applyFilters(newFilters, assignedCase);
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

  const formatDate = (isoDateStr) => {
    const date = new Date(isoDateStr);
    const iso = date.toISOString().split('T')[0]; // "2025-05-24"
    const [year, month, day] = iso.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="teacher-profile-home-page-container">
      <div className="teacher-profile-home-page-header">
        <div>
          <h1 className="teacher-profile-home-page-title">
            Active Case Studies
          </h1>
          <p className="teacher-profile-home-page-subtitle">
            Managing {totalActiveCases} active cases across different classes
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
          {/* <button className="teacher-profile-home-page-add-button">
            <span>+</span> Assign New Case Study
          </button> */}
        </div>
      </div>

      <div className="teacher-profile-home-page-metrics">
        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-book" />
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">
              Total Active Cases
            </p>
            <h2 className="teacher-profile-home-page-metric-value">
              {totalActiveCases}
            </h2>
            <p className="teacher-profile-home-page-metric-change positive">
              +12% from last month
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
            <p className="teacher-profile-home-page-metric-urgent">3 urgent</p>
          </div>
          {/* <div className="teacher-profile-home-page-metric-trend warning">
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
          </div> */}
        </div>

        <div className="teacher-profile-home-page-metric-card">
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
        </div>

        <div className="teacher-profile-home-page-metric-card">
          <div className="teacher-profile-home-page-metric-icon">
            <i className="fa-solid fa-chalkboard-user"></i>
          </div>
          <div className="teacher-profile-home-page-metric-content">
            <p className="teacher-profile-home-page-metric-label">My Classes</p>
            <h2 className="teacher-profile-home-page-metric-value">
              {completionRate}
            </h2>
          </div>
        </div>
      </div>

      <div className="teacher-profile-home-page-filters">
        <div className="teacher-profile-home-page-filter-label">
          <i className="fa-solid fa-filter" /> Filters:
        </div>
        <div className="teacher-profile-home-page-filter-dropdowns">
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

      <div className="teacher-profile-home-page-case-studies">
        {filteredCaseStudies.map((caseStudy) => (
          <div
            key={caseStudy.case_id}
            className="teacher-profile-home-page-case-card"
          >
            <div className="teacher-profile-home-page-case-case-type">
              <span
                className={`teacher-profile-home-page-case-case-type-tag ${caseStudy?.case_type.toLowerCase()}`}
              >
                {caseStudy.case_type}
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
                {/* <span>{caseStudy.department}</span> */}
                {/* {caseStudy.department.split(", ").map((dept, index) => (
                  <span
                    className="teacher-profile-home-page-case-detail-subj-tag"
                    key={index}
                  >
                    {dept}
                  </span>
                ))} */}
                <span
                  className="teacher-profile-home-page-case-detail-subj-tag"

                >
                  {caseStudy.class_name}({caseStudy.class_code})
                </span>

              </div>

              <div className="teacher-profile-home-page-case-detail">
                <i className="fa-solid fa-user-friends" />
                <span>{caseStudy.number_of_students} Students</span>
              </div>

              <div className="teacher-profile-home-page-case-detail">
                <i className="fa-solid fa-clock" />
                <span>Due {formatDate(caseStudy.due_date)}</span>
              </div>
            </div>

            <div className="teacher-profile-home-page-case-progress">
              <div className="teacher-profile-home-page-progress-header">
                <span>Progress</span>
                <span>50 %</span>
              </div>
              <div className="teacher-profile-home-page-progress-bar">
                <div
                  className="teacher-profile-home-page-progress-fill"
                  style={{
                    width: `${50}%`,
                    backgroundColor: getProgressColor(50),
                  }}
                ></div>
              </div>
            </div>

            <div className="teacher-profile-home-page-case-footer">
              {/* <div
                className={`teacher-profile-home-page-case-status ${caseStudy.status.toLowerCase()}`}
              >
                {caseStudy.status}
              </div> */}
              <button
                onClick={() => setActivePage("singlecase")}
                className="teacher-profile-home-page-view-details"
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
