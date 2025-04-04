import React, { useState, useEffect } from 'react';
import '../DashboardCSS/InstituteProfileDashboard.css';

const InstituteProfileDashboard = ({ HandleSingleTeacherDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState('');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Sample data
  const caseStudies = [
    { id: 1, title: 'Global Supply Chain Management', subject: 'Business Studies', assignedTo: 'Gagan verma', assignedDate: 'Oct 15, 2023', status: 'Active' },
    { id: 2, title: 'Renewable Energy Solutions', subject: 'Environmental Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 12, 2023', status: 'Completed' },
    { id: 3, title: 'Digital Marketing Strategy', subject: 'Marketing', assignedTo: 'Gagan verma', assignedDate: 'Oct 10, 2023', status: 'Pending' },
    { id: 4, title: 'Healthcare Innovation', subject: 'Healthcare Management', assignedTo: 'Gagan verma', assignedDate: 'Oct 8, 2023', status: 'Active' },
    { id: 5, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    { id: 6, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    { id: 7, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    { id: 8, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    { id: 9, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
    { id: 10, title: 'Artificial Intelligence Ethics', subject: 'Computer Science', assignedTo: 'Gagan verma', assignedDate: 'Oct 5, 2023', status: 'Completed' },
  ];

  // Dashboard metrics
  const totalCases = 24;
  const activeCases = 12;
  const completedCases = 290;
  const pendingReview = 23;

  // Get unique subjects
  const subjects = [...new Set(caseStudies.map(cs => cs.subject))];

  // Get unique statuses
  const statuses = [...new Set(caseStudies.map(cs => cs.status))];

  // Date range options
  const dateRanges = [
    'Last 7 days',
    'Last 30 days',
    'Last 90 days',
    'This year'
  ];

  // Filter case studies
  useEffect(() => {
    let result = [...caseStudies];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(cs =>
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cs.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter(cs => cs.status === statusFilter);
    }

    // Apply subject filter
    if (subjectFilter) {
      result = result.filter(cs => cs.subject === subjectFilter);
    }

    // Apply date range filter
    if (dateRangeFilter) {
      // For demo purposes, we'll just filter but in a real app
      // you would implement actual date filtering logic
      const today = new Date();
      const dates = {
        'Last 7 days': new Date(today.setDate(today.getDate() - 7)),
        'Last 30 days': new Date(today.setDate(today.getDate() - 30)),
        'Last 90 days': new Date(today.setDate(today.getDate() - 90)),
        'This year': new Date(today.getFullYear(), 0, 1)
      };

      // Simple simulation of date filtering
      if (dateRangeFilter === 'Last 7 days') {
        result = result.filter(cs => cs.assignedDate.includes('Oct 10') || cs.assignedDate.includes('Oct 12') || cs.assignedDate.includes('Oct 15'));
      } else if (dateRangeFilter === 'Last 30 days') {
        result = result.filter(cs => true); // All are within last 30 days in our example
      }
    }

    setFilteredCaseStudies(result);
  }, [searchQuery, statusFilter, subjectFilter, dateRangeFilter]);

  // Status label styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'instituteDashboard-status-active';
      case 'Completed': return 'instituteDashboard-status-completed';
      case 'Pending': return 'instituteDashboard-status-pending';
      default: return '';
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setSubjectFilter('');
    setDateRangeFilter('');
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
      <div className="instituteDashboard-breadcrumb">
        Institute Dashboard
      </div>

      {/* <h1 className="instituteDashboard-title">Teacher Case Studies Dashboard</h1> */}

      {/* <div className="instituteDashboard-metrics-container">
        <div className="instituteDashboard-metric-card">
          <div className="instituteDashboard-metric-icon instituteDashboard-document-icon">
            <i className="fa-solid fa-book"></i>
          </div>
          <div className="instituteDashboard-metric-value">{totalCases}</div>
          <div className="instituteDashboard-metric-label">Total Cases Studies</div>
        </div>

        <div className="instituteDashboard-metric-card">
          <div className="instituteDashboard-metric-icon instituteDashboard-clock-icon">
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="instituteDashboard-metric-value">{activeCases}</div>
          <div className="instituteDashboard-metric-label">Assigned Cases studies</div>
        </div>

        <div className="instituteDashboard-metric-card">
          <div className="instituteDashboard-metric-icon instituteDashboard-check-icon">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div className="instituteDashboard-metric-value">{completedCases}</div>
          <div className="instituteDashboard-metric-label">Total Students</div>
        </div>

        <div className="instituteDashboard-metric-card">
          <div className="instituteDashboard-metric-icon instituteDashboard-pending-icon">
            <i className="fa-solid fa-chalkboard-user"></i>
          </div>
          <div className="instituteDashboard-metric-value">{pendingReview}</div>
          <div className="instituteDashboard-metric-label">Total Teacher</div>
        </div>
      </div> */}
      <div className="ye-waala-naya-h-metrics">
        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-book" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">Total Cases Studies</p>
            <h2 className="ye-waala-naya-h-metric-value">{totalCases}</h2>
            {/* <p className="ye-waala-naya-h-metric-change positive">
              +12% from last month
            </p> */}
          </div>
          <div className="ye-waala-naya-h-metric-trend positive">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <path
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
              /> */}
            </svg>
          </div>
        </div>

        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-calendar-week" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">Assigned Cases studies</p>
            <h2 className="ye-waala-naya-h-metric-value">{activeCases}</h2>
            {/* <p className="ye-waala-naya-h-metric-urgent">3 urgent</p> */}
          </div>
          <div className="ye-waala-naya-h-metric-trend warning">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <path
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
              /> */}
            </svg>
          </div>
        </div>

        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-users" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">
              Total Students
            </p>
            <h2 className="ye-waala-naya-h-metric-value">
              {completedCases}
            </h2>
            {/* <p className="ye-waala-naya-h-metric-change positive">
              +5% from last month
            </p> */}
          </div>
          <div className="ye-waala-naya-h-metric-trend positive">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <path
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
              /> */}
            </svg>
          </div>
        </div>

        <div className="ye-waala-naya-h-metric-card">
          <div className="ye-waala-naya-h-metric-icon">
            <i className="fa-solid fa-chart-line" />
          </div>
          <div className="ye-waala-naya-h-metric-content">
            <p className="ye-waala-naya-h-metric-label">Total Teacher</p>
            <h2 className="ye-waala-naya-h-metric-value">{pendingReview}</h2>
            {/* <p className="ye-waala-naya-h-metric-change positive">
              +8% from last month
            </p> */}
          </div>
          <div className="ye-waala-naya-h-metric-trend positive">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <path
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
              /> */}
            </svg>
          </div>
        </div>
      </div>



      <div className="instituteDashboard-filters-container">
        {/* <div className="instituteDashboard-search-container">
          <i class="fa-solid fa-magnifying-glass search-iconsPosition"></i>
          <input
            type="text"
            placeholder="          Search case studies..."
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
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>










        <div className="instituteDashboard-filter-buttons">
          <div className="instituteDashboard-filter-dropdown">
            <button
              className="instituteDashboard-filter-btn"
              onClick={toggleStatusDropdown}
            >
              <span className="instituteDashboard-filter-icon"><i className="fa-solid fa-caret-down"></i></span>
              {statusFilter || 'Status'}
            </button>
            {showStatusDropdown && (
              <div className="instituteDashboard-dropdown-content">
                <div
                  className="instituteDashboard-dropdown-item"
                  onClick={() => {
                    setStatusFilter('');
                    setShowStatusDropdown(false);
                  }}
                >
                  All Statuses
                </div>
                {statuses.map(status => (
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
              {subjectFilter || 'Subject'}
            </button>
            {showSubjectDropdown && (
              <div className="instituteDashboard-dropdown-content">
                <div
                  className="instituteDashboard-dropdown-item"
                  onClick={() => {
                    setSubjectFilter('');
                    setShowSubjectDropdown(false);
                  }}
                >
                  All Subjects
                </div>
                {subjects.map(subject => (
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
              <span className="instituteDashboard-filter-icon"><i class="fa-solid fa-calendar-week"></i></span>
              {dateRangeFilter || 'Date Range'}
            </button>
            {showDateDropdown && (
              <div className="instituteDashboard-dropdown-content">
                <div
                  className="instituteDashboard-dropdown-item"
                  onClick={() => {
                    setDateRangeFilter('');
                    setShowDateDropdown(false);
                  }}
                >
                  All Dates
                </div>
                {dateRanges.map(range => (
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
              filteredCaseStudies.map(caseStudy => (
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
                    <button className="instituteDashboard-action-btn instituteDashboard-view-btn" onClick={HandleSingleTeacherDetails}>View</button>
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
    </div>
  );
};

export default InstituteProfileDashboard;