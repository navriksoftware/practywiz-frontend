import React, { useState, useEffect } from "react";
import "../DashboardCSS/TeacherDetailslistings.css";
import { ApiURL } from "../../../../Utils/ApiURL.js";
import axios from "axios";

const TeacherDetailslistings = ({
  instituteDashboardDetails,
  HandleSingleTeacherDetails,
  setchildData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("");
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [facultyDetails, setfacultyDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.post(`${url}api/v1/institute/dashboard/faculty-list`, {
            instituteCode: instituteDashboardDetails[0]?.institute_code,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setfacultyDetails(response.data.success);
        } else if (response.data.error) {
          setfacultyDetails([]);
        }
      } catch (error) {
        setfacultyDetails([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [url]);

  const caseStudies = facultyDetails.map((FacDtl) => ({
    teacherName: FacDtl.faculty_firstname + " " + FacDtl.faculty_lastname,
    teacherEmail: FacDtl.faculty_email,
    teacherPhone: FacDtl.faculty_phone_number,
    facultyDtls_id: FacDtl.faculty_dtls_id,
  }));

  const clearFilters = () => {
    setSearchQuery("");
    // setDepartmentFilter('');
    setDateRangeFilter("");
  };

  const toggleDepartmentDropdown = () => {
    setShowDepartmentDropdown(!showDepartmentDropdown);
    setShowDateDropdown(false);
  };

  const toggleDateDropdown = () => {
    setShowDateDropdown(!showDateDropdown);
    setShowDepartmentDropdown(false);
  };

  useEffect(() => {
    let result = [...caseStudies];

    if (searchQuery) {
      result = result.filter(
        (cs) =>
          cs.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cs.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // if (departmentFilter) {
    //   result = result.filter(cs => cs.department === departmentFilter);
    // }

    setFilteredCaseStudies(result);
  }, [searchQuery]);

  const InstituteDashboardFacultyCard = ({
    key,
    teacherName,
    teacherEmail,
    teacherPhone,
    facultyDtls_id,
  }) => {
    return (
      <div className="institute-dashboard-faculty-card">
        <div className="institute-dashboard-faculty-card-header">
          <h3 className="institute-dashboard-faculty-title">{teacherName}</h3>
          <p className="institute-dashboard-faculty-name">{teacherEmail}</p>
          <span className="institute-dashboard-faculty-label">
            {teacherPhone}
          </span>
        </div>

        <div className="institute-dashboard-case-study-details">
          <div className="institute-dashboard-faculty-detail-item">
            <button
              className="institute-dashboard-faculty-view-btn"
              onClick={() => {
                HandleSingleTeacherDetails();
                setchildData(facultyDtls_id);
              }}
            >
              View
            </button>
          </div>
        </div>

        {/* <div className="institute-dashboard-case-study-actions">
          <button
            className="institute-dashboard-case-study-view-btn"
            onClick={onView}
          >
            View
            <i className="fa-solid fa-chevron-right institute-dashboard-case-study-arrow-icon"></i>
          </button>
        </div> */}
      </div>
    );
  };

  return (
    <div className="instituteDashboard-container">
      <div className="instituteDashboard-filters-container">
        {/* <div className="instituteDashboard-search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="instituteDashboard-search-input"
          />
        </div> */}

        <div className="teacher-profile-home-page-actions">
          <div className="teacher-profile-home-page-search">
            <i className="fa-solid fa-magnifying-glass teacher-profile-home-page-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <button className="teacher-profile-home-page-add-button">
            <span>+</span> Assign New Case Study
          </button> */}
        </div>

        {/* <div className="instituteDashboard-filter-buttons">
          <div className="instituteDashboard-filter-dropdown">
            <button
              className="instituteDashboard-filter-btn"
              onClick={toggleDepartmentDropdown}
            >
              {departmentFilter || 'Department'}
            </button>
            {showDepartmentDropdown && (
              <div className="instituteDashboard-dropdown-content">
                <div
                  className="instituteDashboard-dropdown-item"
                  onClick={() => {
                    setDepartmentFilter('');
                    setShowDepartmentDropdown(false);
                  }}
                >
                  All Departments
                </div>
                {departments.map(department => (
                  <div
                    key={department}
                    className="instituteDashboard-dropdown-item"
                    onClick={() => {
                      setDepartmentFilter(department);
                      setShowDepartmentDropdown(false);
                    }}
                  >
                    {department}
                  </div>
                ))}
              </div>
            )}
          </div>

          {(departmentFilter || dateRangeFilter) && (
            <button
              className="instituteDashboard-clear-filter-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div> */}
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Table view (desktop) */}
          <div className="instituteDashboard-teacher-table-container">
            <table className="teacherPage__case-studies-table">
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Faculty Email Id</th>
                  <th>Faculty Phone number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseStudies.length > 0 ? (
                  [...caseStudies].reverse().map((caseStudy, index) => (
                    <tr key={index}>
                      <td>{caseStudy.teacherName}</td>
                      <td>{caseStudy.teacherEmail}</td>
                      <td>{caseStudy.teacherPhone}</td>
                      <td>
                        <button
                          className="instituteDashboard-action-btn instituteDashboard-view-btn"
                          onClick={() => {
                            HandleSingleTeacherDetails();
                            setchildData(caseStudy.facultyDtls_id);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="instituteDashboard-no-results">
                      No case studies found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card view (tablet and mobile) */}
          <div className="institute-dashboard-teacher-case-study-cards-container">
            {caseStudies.length > 0 ? (
              [...caseStudies]
                .reverse()
                .map((caseStudy, index) => (
                  <InstituteDashboardFacultyCard
                    key={index}
                    teacherName={caseStudy.teacherName}
                    teacherEmail={caseStudy.teacherEmail}
                    teacherPhone={caseStudy.teacherPhone}
                    facultyDtls_id={caseStudy.facultyDtls_id}
                  />
                ))
            ) : (
              <div className="institute-dashboard-case-study-no-results">
                No case studies found matching your filters.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherDetailslistings;
