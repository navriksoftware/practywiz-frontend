import { useState, useEffect } from 'react';
import '../DashboardCSS/InstsAssignCaseToFaculty.css';
import { ApiURL } from "../../../../Utils/ApiURL.js";
import axios from "axios";
import { useSelector } from 'react-redux';
const InstsAssignCaseToFaculty = ({ SingleCaseStudydata, HandleShowInstsAssignCaseToFacultyPage }) => {
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [loading, setLoading] = useState(false);
  const institutecode = useSelector((state) => state.institute.instituteDtls[0].institute_code);
  const instituteId = useSelector((state) => state.institute.instituteDtls[0].institute_dtls_id);
  // const facultyMembers = [
  //   { id: 1, name: 'Dr. Sarah Johnson', department: 'Business', email: 's.johnson@university.edu', cases: 2 },
  //   { id: 2, name: 'Prof. Michael Chen', department: 'Economics', email: 'm.chen@university.edu', cases: 1 },
  //   { id: 3, name: 'Dr. Emily Williams', department: 'Management', email: 'e.williams@university.edu', cases: 3 },
  //   { id: 4, name: 'Prof. David Brown', department: 'Business', email: 'd.brown@university.edu', cases: 0 },
  //   { id: 5, name: 'Dr. Lisa Martinez', department: 'Economics', email: 'l.martinez@university.edu', cases: 2 },
  // ];
  const [facultyMembers, setfacultyMembers] = useState([])
  console.log("facultyMembers", institutecode)
  const url = ApiURL();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await Promise.race([
          axios.post(`${url}api/v1/institute/dashboard/faculty-list`, {
            instituteCode: institutecode,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setfacultyMembers(response.data.success);
        } else if (response.data.error) {
          setfacultyMembers([]);
        }
      } catch (error) {
        setfacultyMembers([]);
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
  const departments = ['All Departments', 'Business', 'Economics', 'Management'];

  const handleFacultySelect = (facultyId) => {
    if (selectedFaculty.includes(facultyId)) {
      setSelectedFaculty(selectedFaculty.filter(faculty_dtls_id => faculty_dtls_id !== facultyId));
    } else {
      setSelectedFaculty([...selectedFaculty, facultyId]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const filteredFaculty = filteredFacultyMembers.map(faculty => faculty.faculty_dtls_id);
      setSelectedFaculty(filteredFaculty);
    } else {
      setSelectedFaculty([]);
    }
  };

  const clearSelection = () => {
    setSelectedFaculty([]);
  };

  const handleAssignCase = async () => {
  if (!selectedFaculty.length) {
    alert("Please select at least one faculty member.");
    return;
  }


  setLoading(true);

  try {
    const response = await Promise.race([
      axios.post(`${url}api/v1/institute/dashboard/assignCase-ToFaculty`, {
        InstituteId: instituteId,
        FacultyIds: selectedFaculty,
        CaseStudyId: SingleCaseStudydata.case_study_id,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 45000)
      ),
    ]);

    if (response.data.success) {
      alert("Case study successfully assigned!");
    } else if (response.data.error) {
      alert(`Error: ${response.data.error}`);
    }
  } catch (error) {
    if (error.message === "Request timed out") {
      alert("Request timed out. Please try again.");
    } else {
      alert("An unexpected error occurred.");
      console.error("Assignment error:", error);
    }
  } finally {
    setLoading(false);
  }
};


  const filteredFacultyMembers = facultyMembers.filter(faculty => {
    const matchesSearch = faculty.faculty_firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.faculty_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All Departments' || faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="IntAssignCaseFaculty-modal-overlay">
      <div className="IntAssignCaseFaculty-container">
        <div className="IntAssignCaseFaculty-breadcrumb">
          <span className="IntAssignCaseFaculty-breadcrumb-item" onClick={HandleShowInstsAssignCaseToFacultyPage}><i className="fa-solid fa-xmark fa-lg"></i></span>
        </div>

        <h1 className="IntAssignCaseFaculty-title">Case Study Assignment</h1>

        <div className="IntAssignCaseFaculty-content">
          <div className="IntAssignCaseFaculty-case-details">
            {/* <div className="IntAssignCaseFaculty-status-label">Unassigned</div> */}

            <h2 className="IntAssignCaseFaculty-case-title">{SingleCaseStudydata?.case_study_title}</h2>
            {/* <div className="IntAssignCaseFaculty-case-meta">
            <span>Case ID: CS-2024-001</span>
            <span className="IntAssignCaseFaculty-date">March 15, 2024</span>
          </div> */}

            <div className="IntAssignCaseFaculty-section">
              {/* <h3>Description</h3> */}
              <p>{SingleCaseStudydata?.case_study_content?.slice(0, 500) + '...'}</p>
            </div>

            <div className="IntAssignCaseFaculty-section">
              <h3>Challenge</h3>
              <ul className="IntAssignCaseFaculty-objectives">
                <li>{SingleCaseStudydata?.case_study_challenge}</li>
              </ul>
            </div>
            {SingleCaseStudydata?.case_study_categories &&
              JSON.parse(SingleCaseStudydata.case_study_categories).map((tag, index) => (
                <span
                  key={index}
                  className="case-assign-to-student-tag case-assign-to-student-tag-business"
                >
                  {tag}
                </span>
              ))}

            {/* <div className="IntAssignCaseFaculty-section">
            <h3>Case Information</h3>
            <div className="IntAssignCaseFaculty-info-grid">
              <div className="IntAssignCaseFaculty-info-item">
                <i className="IntAssignCaseFaculty-icon IntAssignCaseFaculty-icon-document"></i>
                15 pages
              </div>
              <div className="IntAssignCaseFaculty-info-item">
                <i className="IntAssignCaseFaculty-icon IntAssignCaseFaculty-icon-calendar"></i>
                2024 Edition
              </div>
              <div className="IntAssignCaseFaculty-info-item">
                <i className="IntAssignCaseFaculty-icon IntAssignCaseFaculty-icon-industry"></i>
                Retail Industry
              </div>
              <div className="IntAssignCaseFaculty-info-item">
                <i className="IntAssignCaseFaculty-icon IntAssignCaseFaculty-icon-graduate"></i>
                Graduate Level
              </div>
            </div>
          </div> */}

            {/* <div className="IntAssignCaseFaculty-section">
            <h3>Attached Resources</h3>
            <div className="IntAssignCaseFaculty-resources">
              <div className="IntAssignCaseFaculty-resource">
                <span>Case Study PDF</span>
                <span className="IntAssignCaseFaculty-file-size">2.4 MB</span>
              </div>
              <div className="IntAssignCaseFaculty-resource">
                <span>Teaching Note</span>
                <span className="IntAssignCaseFaculty-file-size">1.1 MB</span>
              </div>
            </div>
          </div> */}
          </div>

          <div className="IntAssignCaseFaculty-faculty-selection">
            <div className="IntAssignCaseFaculty-search-bar">
              <div className="IntAssignCaseFaculty-search-input">
                <i className="IntAssignCaseFaculty-icon IntAssignCaseFaculty-icon-search"></i>
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* <select 
              className="IntAssignCaseFaculty-department-filter"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select> */}
            </div>

            <div className="IntAssignCaseFaculty-faculty-table">
              <div className="IntAssignCaseFaculty-table-header">
                <div className="IntAssignCaseFaculty-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedFaculty.length === filteredFacultyMembers.length && filteredFacultyMembers.length > 0}
                    onChange={handleSelectAll}
                  />
                </div>
                <div className="IntAssignCaseFaculty-name-cell">Name</div>
                {/* <div className="IntAssignCaseFaculty-department-cell">Department</div> */}
                <div className="IntAssignCaseFaculty-email-cell">Email</div>
                {/* <div className="IntAssignCaseFaculty-cases-cell">Cases</div> */}
              </div>

              {filteredFacultyMembers.map((faculty) => (
                <div
                  key={faculty.id}
                  className="IntAssignCaseFaculty-table-row"
                >
                  <div className="IntAssignCaseFaculty-checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedFaculty.includes(faculty.faculty_dtls_id)}
                      onChange={() => handleFacultySelect(faculty.faculty_dtls_id)}
                    />
                  </div>
                  <div className="IntAssignCaseFaculty-name-cell">{faculty.faculty_firstname}</div>
                  {/* <div className="IntAssignCaseFaculty-department-cell">{faculty.department}</div> */}
                  <div className="IntAssignCaseFaculty-email-cell">{faculty.faculty_email}</div>
                  {/* <div className="IntAssignCaseFaculty-cases-cell">{faculty.cases}</div> */}
                </div>
              ))}
            </div>

            <div className="IntAssignCaseFaculty-selection-info">
              <div className="IntAssignCaseFaculty-selected-count">
                {selectedFaculty.length} faculty members selected
              </div>
              <div className="IntAssignCaseFaculty-action-buttons">
                <button
                  className="IntAssignCaseFaculty-clear-button"
                  onClick={clearSelection}
                  disabled={selectedFaculty.length === 0}
                >
                  Clear Selection
                </button>
                <button
                  className="IntAssignCaseFaculty-assign-button"
                  onClick={handleAssignCase}
                  disabled={selectedFaculty.length === 0}
                >
                  Assign Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstsAssignCaseToFaculty;