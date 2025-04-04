import React, { useState, useEffect } from 'react';
import "../DashboardCSS/TeacherDetailslistings.css";

const TeacherDetailslistings = ({ HandleSingleTeacherDetails }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState('');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const caseStudies = [
    { teacherName: 'Ananya Sharma', department: 'Business Studies', numberOfCaseStudiesAssigned: 4, numberOfStudents: 5, actions: 'View Details' },
    { teacherName: 'Rajesh Kumar', department: 'Environmental Science', numberOfCaseStudiesAssigned: 6, numberOfStudents: 3, actions: 'View Details' },
    { teacherName: 'Meera Joshi', department: 'Marketing', numberOfCaseStudiesAssigned: 3, numberOfStudents: 4, actions: 'View Details' },
    { teacherName: 'Amit Singh', department: 'Healthcare Management', numberOfCaseStudiesAssigned: 2, numberOfStudents: 2, actions: 'View Details' },
    { teacherName: 'Neha Patel', department: 'Computer Science', numberOfCaseStudiesAssigned: 4, numberOfStudents: 6, actions: 'View Details' },
    { teacherName: 'Neha Patel', department: 'Computer Science', numberOfCaseStudiesAssigned: 4, numberOfStudents: 6, actions: 'View Details' },
    { teacherName: 'Neha Patel', department: 'Computer Science', numberOfCaseStudiesAssigned: 4, numberOfStudents: 6, actions: 'View Details' },
    { teacherName: 'Neha Patel', department: 'Computer Science', numberOfCaseStudiesAssigned: 4, numberOfStudents: 6, actions: 'View Details' },
    { teacherName: 'Neha Patel', department: 'Computer Science', numberOfCaseStudiesAssigned: 4, numberOfStudents: 6, actions: 'View Details' },
  ];

  const departments = [...new Set(caseStudies.map(cs => cs.department))];

  const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year'];

  useEffect(() => {
    let result = [...caseStudies];

    if (searchQuery) {
      result = result.filter(cs =>
        cs.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter) {
      result = result.filter(cs => cs.department === departmentFilter);
    }

    setFilteredCaseStudies(result);
  }, [searchQuery, departmentFilter, dateRangeFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
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

        <div className="ye-waala-naya-h-actions">
          <div className="ye-waala-naya-h-search">
            <i class="fa-solid fa-magnifying-glass search-iconsPosition" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="instituteDashboard-filter-buttons">
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
        </div>
      </div>

      <div className="instituteDashboard-table-container">
        <table className="instituteDashboard-case-studies-table">
          <thead>
            <tr>
              <th>Assigned To</th>
              <th>Department</th>
              <th>No. of CaseStudies Assign</th>
              <th>No. of Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCaseStudies.length > 0 ? (
              filteredCaseStudies.map((caseStudy, index) => (
                <tr key={index}>
                  <td>{caseStudy.teacherName}</td>
                  <td>{caseStudy.department}</td>
                  <td>{caseStudy.numberOfCaseStudiesAssigned}</td>
                  <td>{caseStudy.numberOfStudents}</td>
                  <td>
                    <button
                      className="instituteDashboard-action-btn instituteDashboard-view-btn"
                      onClick={HandleSingleTeacherDetails}
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
      </div>
    </div>
  );
};

export default TeacherDetailslistings;