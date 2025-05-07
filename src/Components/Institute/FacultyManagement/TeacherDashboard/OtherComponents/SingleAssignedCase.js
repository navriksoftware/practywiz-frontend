import React, { useState, useEffect, useRef } from "react";
import "../DashboardCSS/SingleAssignedCase.css";
import { debounce } from "lodash";

const STUDENTS_DATA = [
  {
    id: 1,
    name: "Arjun Mehta",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rollNo: "2024001",
    status: "Completed",
    progress: 100,
    score: 92,
    lastActivity: "2h ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rollNo: "2024002",
    status: "In Progress",
    progress: 65,
    score: 78,
    lastActivity: "4h ago",
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rollNo: "2024003",
    status: "Not Started",
    progress: 0,
    score: 0,
    lastActivity: "1d ago",
  },
  {
    id: 4,
    name: "Ananya Patel",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rollNo: "2024004",
    status: "Overdue",
    progress: 45,
    score: 56,
    lastActivity: "3d ago",
  },
  {
    id: 5,
    name: "Rohan Kapoor",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    rollNo: "2024005",
    status: "Completed",
    progress: 100,
    score: 88,
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("student-list");
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(
    "Global Economics - ECO 201"
  );
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNo: "",
    status: "Not Started",
    score: 0,
    progress: 0,
    lastActivity: "Just now",
  });
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredStudents.length / studentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate metrics
  const totalStudents = students.length;
  const averageScore = Math.round(
    students.reduce((acc, student) => acc + student.score, 0) / totalStudents
  );
  const completionRate = Math.round(
    (students.filter((s) => s.status === "Completed").length / totalStudents) *
      100
  );

  // Toggle dropdown
  const toggleDropdown = (studentId) => {
    setActiveDropdown(activeDropdown === studentId ? null : studentId);
  };

  // Toggle class dropdown
  const toggleClassDropdown = () => {
    setIsClassDropdownOpen(!isClassDropdownOpen);
  };

  // Select class
  const selectClass = (className) => {
    setSelectedClass(className);
    setIsClassDropdownOpen(false);
  };

  // Handle student actions
  const viewStudent = (student) => {
    console.log(`Viewing student: ${student.name}`);
    alert(`Viewing details for student: ${student.name}`); // Added alert for visual confirmation
    setActiveDropdown(null);
  };

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

  // Handle new student form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rollNo) {
      alert("Please fill in all required fields");
      return;
    }

    const newId = Math.max(...students.map((s) => s.id)) + 1;
    const gender = Math.random() > 0.5 ? "men" : "women";
    const avatarNum = Math.floor(Math.random() * 70) + 1;

    const studentToAdd = {
      ...newStudent,
      id: newId,
      avatar: `https://randomuser.me/api/portraits/${gender}/${avatarNum}.jpg`,
      progress:
        newStudent.status === "Completed"
          ? 100
          : Number.parseInt(newStudent.progress || 0),
    };

    setStudents([...students, studentToAdd]);
    setShowAddModal(false);
    setNewStudent({
      name: "",
      rollNo: "",
      status: "Not Started",
      score: 0,
      progress: 0,
      lastActivity: "Just now",
    });
  };

  return (
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
          {/* <span className="single-case-details-view-breadcrumbs-item">
            Assigned Cases
          </span>
          <span className="single-case-details-view-breadcrumbs-separator">
            &gt;
          </span> */}
          <span className="single-case-details-view-breadcrumbs-item active">
            Environmental Impact Analysis
          </span>
        </div>
      </div>
      <div className="single-case-details-view-header">
        <h1 className="single-case-details-view-title">
          Case Study: Environmental Impact Analysis
        </h1>
      </div>

      <div className="single-case-details-view-course-info">
        <div className="single-case-details-view-course-details">
          <h1 className="single-case-details-view-course-name">
            {selectedClass}
          </h1>
        </div>

        {/* <div className="single-case-details-view-class-selector">
          <label className="single-case-details-view-select-label">
            Select Class
          </label>
          <div className="single-case-details-view-dropdown">
            <button
              className="single-case-details-view-dropdown-toggle"
              onClick={toggleClassDropdown}
            >
              {selectedClass}
              <i className="fa fa-chevron-down"></i>
            </button>
            {isClassDropdownOpen && (
              <div className="single-case-details-view-dropdown-menu">
                <div
                  className="single-case-details-view-dropdown-item"
                  onClick={() => selectClass("Global Economics - ECO 201")}
                >
                  Global Economics - ECO 201
                </div>
                <div
                  className="single-case-details-view-dropdown-item"
                  onClick={() => selectClass("Microeconomics - ECO 101")}
                >
                  Microeconomics - ECO 101
                </div>
                <div
                  className="single-case-details-view-dropdown-item"
                  onClick={() => selectClass("Macroeconomics - ECO 102")}
                >
                  Macroeconomics - ECO 102
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>

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
              {totalStudents}
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
              {averageScore}%
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
              {completionRate}%
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
            <h3 className="single-case-details-view-stat-value">5 Days</h3>
          </div>
        </div>
      </div>

      <div className="single-case-details-view-tabs">
        <button
          className={`single-case-details-view-tab ${
            selectedTab === "student-list"
              ? "single-case-details-view-tab-active"
              : ""
          }`}
          onClick={() => setSelectedTab("student-list")}
        >
          Student List
        </button>
        <button
          className={`single-case-details-view-tab ${
            selectedTab === "case-study-questions"
              ? "single-case-details-view-tab-active"
              : ""
          }`}
          onClick={() => setSelectedTab("case-study-questions")}
        >
          Case Study Questions
        </button>
      </div>

      {selectedTab === "student-list" && (
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
                onClick={() => alert("Exporting data...")}
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
                {currentStudents.map((student) => (
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
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="single-case-details-view-td">
                      {student.rollNo}
                    </td>
                    <td className="single-case-details-view-td">
                      <span
                        className={`single-case-details-view-status single-case-details-view-status-${student.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="single-case-details-view-td">
                      {student.score}
                    </td>
                    <td className="single-case-details-view-td">
                      {student.lastActivity}
                    </td>
                    <td className="single-case-details-view-td single-case-details-view-actions-cell">
                      <div
                        className="single-case-details-view-action-dropdown"
                        ref={activeDropdown === student.id ? dropdownRef : null}
                      >
                        <button
                          className="single-case-details-view-action-btn"
                          onClick={() => toggleDropdown(student.id)}
                        >
                          <i className="fa-solid fa-ellipsis-v" />
                        </button>
                        {activeDropdown === student.id && (
                          <div
                            className="single-case-details-view-dropdown-menu"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => {
                                viewStudent(student);
                              }}
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
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="single-case-details-view-pagination">
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
          </div>
        </div>
      )}

      {selectedTab === "case-study-questions" && (
        <div className="single-case-details-view-questions-container">
          <h2 className="single-case-details-view-section-title">
            Case Study Questions
          </h2>
          <p className="single-case-details-view-placeholder">
            Questions content would go here
          </p>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
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
      )}
    </div>
  );
};

export default SingleAssignedCase;
