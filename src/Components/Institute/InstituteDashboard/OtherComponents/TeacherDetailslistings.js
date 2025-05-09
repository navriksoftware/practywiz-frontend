import React, { useState, useEffect } from 'react';
import "../DashboardCSS/TeacherDetailslistings.css";
import { ApiURL } from "../../../../Utils/ApiURL.js";
import axios from "axios";

const TeacherDetailslistings = ({ instituteDashboardDetails, HandleSingleTeacherDetails, setchildData }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState('');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [facultyDetails, setfacultyDetails] = useState([])
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
  }, [url,]);

  const caseStudies = facultyDetails.map((FacDtl) => ({
    teacherName: FacDtl.faculty_lastname + " " + FacDtl.faculty_firstname,
    department: FacDtl.faculty_email,
    numberOfCaseStudiesAssigned: FacDtl.faculty_phone_number,
    facultyDtls_id: FacDtl.faculty_dtls_id,
  }))


  const clearFilters = () => {
    setSearchQuery('');
    // setDepartmentFilter('');
    setDateRangeFilter('');
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
      result = result.filter(cs =>
        cs.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // if (departmentFilter) {
    //   result = result.filter(cs => cs.department === departmentFilter);
    // }

    setFilteredCaseStudies(result);
  }, [searchQuery]);


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
      {loading ?
        <div className="loading-container" >
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div >
        :
        <div className="instituteDashboard-table-container">
          <table className="teacherPage__case-studies-table">
            <thead>
              <tr>
                <th>Faculty Name</th>
                <th>Department</th>
                <th>No. of CaseStudies Assign</th>
                {/* <th>No. of Students</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.length > 0 ? (
                caseStudies.map((caseStudy, index) => (
                  <tr key={index}>
                    <td>{caseStudy.teacherName}</td>
                    <td>{caseStudy.department}</td>
                    <td>{caseStudy.numberOfCaseStudiesAssigned}</td>
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
                  <td colSpan="5" className="instituteDashboard-no-results">
                    No case studies found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>}
    </div>
  );
};

export default TeacherDetailslistings;