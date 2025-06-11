import React, { useState, useEffect, useRef } from "react";
import "../DashboardCSS/SingleAssignedCase.css";
import { debounce } from "lodash";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL";
import QuestionShow from "./QuestionShow";
import { exportMenteeDataToExcel } from "../../../../../Utils/exportMenteeDataToExcel";


const STUDENTS_DATA = [
  {
    id: 1,
    name: "Arjun Mehta",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rollNo: "2024001",
    status: "Completed",
    progress: 100,
    score: 90.33,
    lastActivity: "2h ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rollNo: "2024002",
    status: "Completed",
    progress: 100,
    score: 50.33,
    lastActivity: "4h ago",
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rollNo: "2024003",
    status: "In Progress",
    progress: 70,
    score: 20.5,
    lastActivity: "1d ago",
  },
  {
    id: 4,
    name: "Ananya Patel",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rollNo: "2024004",
    status: "completed",
    progress: 100,
    score: 70.33,
    lastActivity: "3d ago",
  },
  {
    id: 5,
    name: "Rohan Kapoor",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    rollNo: "2024005",
    status: "In Progress",
    progress: 50,
    score: 10.5,
    lastActivity: "1d ago",
  },
];

const SingleAssignedCase = ({ setActivePage }) => {


  const [students, setStudents] = useState(STUDENTS_DATA);
  const [filteredStudents, setFilteredStudents] = useState(STUDENTS_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedTab, setSelectedTab] = useState("student-list");
  const [resultdata, setresultdata] = useState();
  const caseStudyId = localStorage.getItem("caseStudyId");
  const class_id = localStorage.getItem("ClassId");
  const caseType = localStorage.getItem("caseType");
  const faculty_case_assign_dtls_id = localStorage.getItem("facultyCaseAssignId");
  const url = ApiURL();
  const [isLoading, setIsLoading] = useState(false);
  const [studentlist, setstudentlist] = useState([])

  // Fetch assigned case studies when facultyid is available
  useEffect(() => {
    const fetchAssignCaseStudiesDetails = async () => {
      setIsLoading(true);
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/dashboard/get-assigned-single-cases`, {

            class_id: class_id,
            case_study_id: caseStudyId,
            case_type: caseType,
            faculty_case_assign_dtls_id: faculty_case_assign_dtls_id

          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);

        if (response.data.success) {
          setresultdata(response.data.success[0]);
          console.log("response.data.success[0]", response.data.success[0]);

        } else if (response.data.error) {
          setresultdata([]);

        }
      } catch (error) {
        setresultdata([]);

        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    const fetchstudentListScoreData = async () => {

      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/student-score/list`, {
            class_id: class_id,
            faculty_caseassign_id: faculty_case_assign_dtls_id
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);

        if (response.data.success) {
          setstudentlist(response.data.success);

        } else if (response.data.error) {
          setstudentlist([]);

        }
      } catch (error) {
        setstudentlist([]);

        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.", error);
        }
      } finally {

      }
    };
    fetchAssignCaseStudiesDetails();
    fetchstudentListScoreData();
  }, [url]);

  // const [newStudent, setNewStudent] = useState({
  //   name: "",
  //   rollNo: "",
  //   status: "Not Started",
  //   score: 0,
  //   progress: 0,
  //   lastActivity: "Just now",
  // });
  const studentsPerPage = 5;
  const dropdownRef = useRef(null);

  // Create a debounced search function
  const debouncedSearch = useRef(
    debounce((term) => {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(term.toLowerCase()) ||
          student.rollNo.includes(term)
      );
      setFilteredStudents(filtered);
      setCurrentPage(1);
    }, 300)
  ).current;

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  // Filter by status
  useEffect(() => {
    let filtered = students;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.rollNo.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((student) => student.status === statusFilter);
    }

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [statusFilter, students, searchTerm]);

  // Close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setActiveDropdown(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  // const currentStudents = filteredStudents.slice(
  //   indexOfFirstStudent,
  //   indexOfLastStudent
  // );

  // Change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const nextPage = () => {
  //   if (currentPage < Math.ceil(filteredStudents.length / studentsPerPage)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const prevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };



  // Toggle dropdown
  const toggleDropdown = (studentId) => {
    setActiveDropdown(activeDropdown === studentId ? null : studentId);
  };

  // // Toggle class dropdown
  // const toggleClassDropdown = () => {
  //   setIsClassDropdownOpen(!isClassDropdownOpen);
  // };

  // // Select class
  // const selectClass = (className) => {
  //   setSelectedClass(className);
  //   setIsClassDropdownOpen(false);
  // };

  // // Handle student actions
  // const viewStudent = (student) => {
  //   console.log(`Viewing student: ${student.name}`);
  //   const caseStudyId = 2;
  //   setActiveDropdown(null);
  //   // Navigate to result page with student ID and case study ID
  //   navigate(`/result/${student.id}/${caseStudyId || 'default'}`);
  // };

  const editStudent = (student) => {
    alert(`Editing student: ${student.name}`);
    setActiveDropdown(null);
  };

  const deleteStudent = (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      const updatedStudents = students.filter((s) => s.id !== student.id);
      setStudents(updatedStudents);
      setActiveDropdown(null);
    }
  };

  // // Handle new student form
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewStudent({ ...newStudent, [name]: value });
  // };

  // const handleAddStudent = () => {
  //   if (!newStudent.name || !newStudent.rollNo) {
  //     alert("Please fill in all required fields");
  //     return;
  //   }

  //   const newId = Math.max(...students.map((s) => s.id)) + 1;
  //   const gender = Math.random() > 0.5 ? "men" : "women";
  //   const avatarNum = Math.floor(Math.random() * 70) + 1;

  //   const studentToAdd = {
  //     ...newStudent,
  //     id: newId,
  //     avatar: `https://randomuser.me/api/portraits/${gender}/${avatarNum}.jpg`,
  //     progress:
  //       newStudent.status === "Completed"
  //         ? 100
  //         : Number.parseInt(newStudent.progress || 0),
  //   };

  //   setStudents([...students, studentToAdd]);
  //   setShowAddModal(false);
  //   setNewStudent({
  //     name: "",
  //     rollNo: "",
  //     status: "Not Started",
  //     score: 0,
  //     progress: 0,
  //     lastActivity: "Just now",
  //   });
  // };



  const handleCalculateMetrics = () => {
    const totalStudents = studentlist.length;

    // Ensure we don't divide by zero if there are no students
    if (totalStudents === 0) {
      return { totalStudents: 0, averageScore: 0, completionRate: 0 };
    }

    // Calculate average score
    const averageScore = Math.round(
      studentlist.reduce((acc, student) => acc + (student.mentee_result_total_score || 0), 0) / totalStudents
    );

    // Calculate completion rate
    const completionRate = Math.round(
      (studentlist.filter((s) => s.mentee_result_status === "Completed").length / totalStudents) * 100
    );

    // Return the calculated metrics
    return { totalStudents, averageScore, completionRate };
  };



  const handleUpdatedDate = (dateString) => {
    if (!dateString) return "NA";

    const now = new Date();
    const updatedDate = new Date(dateString);
    const diffInMs = now - updatedDate;
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }

    // fallback to absolute format for older dates
    return updatedDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getDaysRemaining = (futureDateString) => {
    if (!futureDateString) return "Invalid date";

    const now = new Date();
    const futureDate = new Date(futureDateString);

    // Get difference in milliseconds
    const diffInMs = futureDate - now;

    // If date is in the past
    if (diffInMs <= 0) return "Date has passed";

    // Convert milliseconds to full days
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
  };

   const handleExport = () => {
    exportMenteeDataToExcel(studentlist); // ✅ instant download
  };
  return (
    <>
      {isLoading ? <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading page...</p>
      </div>
        :
        <div className="single-case-details-view-container">


          <div className="single-case-details-view-navigation">
            <div className="single-case-details-view-breadcrumbs">
              <span
                onClick={() => {
                  setActivePage("profile");
                }}
                className="single-case-details-view-breadcrumbs-item"
              >
                <i className="fa fa-home"></i> Dashboard
              </span>
              <span className="single-case-details-view-breadcrumbs-separator">
                &gt;
              </span>


              <span className="single-case-details-view-breadcrumbs-item active">
                {resultdata?.case_study_title ? resultdata?.case_study_title : resultdata?.non_practywiz_case_title}
              </span>
            </div>
          </div>
          <div className="single-case-details-view-header">
            <h1 className="single-case-details-view-title">
              {resultdata?.case_study_title ? resultdata?.case_study_title : <>{resultdata?.non_practywiz_case_title} ({resultdata?.non_practywiz_case_author}) </>}
            </h1>
          </div>

          <div className="single-case-details-view-course-info">
            <div className="single-case-details-view-course-details">
              <h1 className="single-case-details-view-course-name">
                {resultdata?.class_name}
              </h1>
            </div>
            {/* Tabs for Student List and Case Study Questions */}
            <div className="single-case-details-view-tabs">
              <button
                className={`single-case-details-view-tab ${selectedTab === "student-list"
                  ? "single-case-details-view-tab-active"
                  : ""
                  }`}
                onClick={() => setSelectedTab("student-list")}
              >
                Student List
              </button>
              {/* only show non practywiz case study questions */}
              {resultdata?.non_practywiz_case_question &&
                resultdata.non_practywiz_case_question.length > 0 && (
                  <button
                    className={`single-case-details-view-tab ${selectedTab === "case-study-questions"
                      ? "single-case-details-view-tab-active"
                      : ""}`}
                    onClick={() => setSelectedTab("case-study-questions")}
                  >
                    Case Study Questions
                  </button>
                )}

            </div>


          </div>



          {selectedTab === "student-list" && (
            <>
              <div className="single-case-details-view-stats">
                <div className="single-case-details-view-stat-card">
                  <div className="single-case-details-view-stat-icon">
                    <i className="fa fa-graduation-cap"></i>
                  </div>
                  <div className="single-case-details-view-stat-content">
                    <p className="single-case-details-view-stat-label">
                      Total Students
                    </p>
                    <h3 className="single-case-details-view-stat-value">
                      {/* {studentlist.length} */}
                      {handleCalculateMetrics().totalStudents}
                    </h3>
                  </div>
                </div>

                <div className="single-case-details-view-stat-card">
                  <div className="single-case-details-view-stat-icon">
                    <i className="fa fa-chart-bar"></i>
                  </div>
                  <div className="single-case-details-view-stat-content">
                    <p className="single-case-details-view-stat-label">Average Score</p>
                    <h3 className="single-case-details-view-stat-value">
                      {/* {averageScore}% */}
                      {handleCalculateMetrics().averageScore}%
                    </h3>
                  </div>
                </div>

                <div className="single-case-details-view-stat-card">
                  <div className="single-case-details-view-stat-icon">
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <div className="single-case-details-view-stat-content">
                    <p className="single-case-details-view-stat-label">
                      Completion Rate
                    </p>
                    <h3 className="single-case-details-view-stat-value">
                      {/* {completionRate}% */}
                      {handleCalculateMetrics().completionRate}%
                    </h3>
                  </div>
                </div>

                <div className="single-case-details-view-stat-card">
                  <div className="single-case-details-view-stat-icon">
                    <i className="fa fa-clock"></i>
                  </div>
                  <div className="single-case-details-view-stat-content">
                    <p className="single-case-details-view-stat-label">
                      Time Remaining
                    </p>
                    <h3 className="single-case-details-view-stat-value">{getDaysRemaining(resultdata?.faculty_case_assign_end_date)}</h3>
                  </div>
                </div>
              </div>
              <div className="single-case-details-view-student-list-container">
                <div className="single-case-details-view-list-header">
                  <h2 className="single-case-details-view-list-title">
                    Student List
                  </h2>
                  <div className="single-case-details-view-list-actions">
                    <div className="single-case-details-view-search">
                      <i className="fa fa-search"></i>
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="single-case-details-view-search-input"
                      />
                    </div>
                    <button
                      className="single-case-details-view-export-btn"
                      onClick={handleExport}
                    >
                      <i className="fa fa-file-export"></i>
                      Export Data
                    </button>
                  </div>
                </div>

                <div className="single-case-details-view-table-container">
                  <table className="single-case-details-view-table">
                    <thead>
                      <tr>
                        <th className="single-case-details-view-th">Student</th>
                        <th className="single-case-details-view-th">Roll No.</th>
                        <th className="single-case-details-view-th">Status</th>
                        <th className="single-case-details-view-th">Score</th>
                        <th className="single-case-details-view-th">Last Activity</th>
                        <th className="single-case-details-view-th">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentlist.map((student) => {

                        const status = student?.mentee_result_total_score === null ? "not-started" : "completed";

                        return (

                          <tr key={student.id} className="single-case-details-view-tr">
                            <td className="single-case-details-view-td single-case-details-view-student-cell">
                              <div className="single-case-details-view-student-info">
                                {/* <div className="single-case-details-view-avatar">
                          <img
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                          />
                        </div> */}
                                <span className="single-case-details-view-student-name">
                                  {student.user_firstname} {student?.user_lastname}
                                </span>
                              </div>
                            </td>
                            <td className="single-case-details-view-td">
                              {student.mentee_roll_no}
                            </td>
                            <td className="single-case-details-view-td">
                              <span
                                className={`single-case-details-view-status single-case-details-view-status-${status
                                  .toLowerCase()
                                  .replace(" ", "-")}`}
                              >
                                {status}

                              </span>
                            </td>
                            <td className="single-case-details-view-td">
                              {student?.mentee_result_total_score ? student?.mentee_result_total_score : "NA"}
                            </td>
                            <td className="single-case-details-view-td">
                              {handleUpdatedDate(student.mentee_result_update_date)}
                            </td>
                            <td className="single-case-details-view-td single-case-details-view-actions-cell">
                              <div
                                className="single-case-details-view-action-dropdown"
                                ref={activeDropdown === student.mentee_dtls_id ? dropdownRef : null}
                              >
                                <div
                                  className="single-case-details-view-dropdown-menu"

                                >
                                  <button
                                    // onClick={() => {
                                    //   viewStudent(student);
                                    // }}
                                    disabled={student?.mentee_result_total_score === null}
                                    onClick={() => window.open(`/faculty/Single-Student-Assessment-Page/mentee/${student?.mentee_dtls_id}/assignedCase/${faculty_case_assign_dtls_id}`, '_blank')}
                                  >
                                    <i className="fa-solid fa-eye" />
                                    <span>View</span>
                                  </button>
                                </div>
                                {/* <button
                              className="single-case-details-view-action-btn"
                              onClick={() => toggleDropdown(student.mentee_dtls_id)}
                            >
                              <i className="fa-solid fa-ellipsis-v" />
                            </button>
                            
                            {activeDropdown === student.mentee_dtls_id && (
                              <div
                                className="single-case-details-view-dropdown-menu"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  // onClick={() => {
                                  //   viewStudent(student);
                                  // }}
                                  onClick={() => window.open(`/faculty/Single-Student-Assessment-Page/mentee/${student?.mentee_dtls_id}/assignedCase/${faculty_case_assign_dtls_id}`, '_blank')}
                                >
                                  <i className="fa-solid fa-eye" />
                                  <span>View</span>
                                </button>
                                <button
                                  onClick={() => {
                                    editStudent(student);
                                  }}

                                >
                                  <i className="fa-solid fa-edit" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => {
                                    deleteStudent(student);
                                  }}
                                >
                                  <i className="fa-solid fa-trash" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )} */}
                              </div>
                            </td>
                          </tr>

                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* <div className="single-case-details-view-pagination">
              <div className="single-case-details-view-pagination-info">
                Showing {indexOfFirstStudent + 1} to{" "}
                {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
                {filteredStudents.length} students
              </div>
              <div className="single-case-details-view-pagination-controls">
                <button
                  className="single-case-details-view-pagination-btn"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="single-case-details-view-pagination-btn single-case-details-view-pagination-btn-primary"
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredStudents.length / studentsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            </div> */}
              </div>
            </>
          )}

          {selectedTab === "case-study-questions" && (
            <div className="single-case-details-view-questions-container">

              {!resultdata?.non_practywiz_case_question || resultdata.non_practywiz_case_question.length === 0
                ? "hello"
                : <QuestionShow data={resultdata} />}


            </div>
          )}

          {/* Add Student Modal */}
          {/* {showAddModal && (
        <div className="single-case-details-view-modal-overlay">
          <div className="single-case-details-view-modal">
            <div className="single-case-details-view-modal-header">
              <h3>Add New Student</h3>
              <button
                className="single-case-details-view-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="single-case-details-view-modal-body">
              <div className="single-case-details-view-form-group">
                <label>Student Name*</label>
                <input
                  type="text"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div className="single-case-details-view-form-group">
                <label>Roll Number*</label>
                <input
                  type="text"
                  name="rollNo"
                  value={newStudent.rollNo}
                  onChange={handleInputChange}
                  placeholder="Enter roll number"
                  required
                />
              </div>
              <div className="single-case-details-view-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={newStudent.status}
                  onChange={handleInputChange}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
              <div className="single-case-details-view-form-group">
                <label>Score</label>
                <input
                  type="number"
                  name="score"
                  value={newStudent.score}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="single-case-details-view-modal-footer">
              <button
                className="single-case-details-view-btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="single-case-details-view-btn-primary"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )} */}
        </div>
      }</>


  );
};

export default SingleAssignedCase;
