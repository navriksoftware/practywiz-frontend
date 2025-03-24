import React, { useState, useEffect, useRef } from "react";
import "../DashboardCSS/SingleAssignedCase.css";
import { debounce } from "lodash";

// Sample data
const STUDENTS_DATA = [
  {
    id: 1,
    name: "student 1",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rollNo: "2024001",
    status: "Completed",
    progress: 100,
    score: 92,
    lastActivity: "2h ago",
  },
  {
    id: 2,
    name: "tushar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rollNo: "2024002",
    status: "In Progress",
    progress: 65,
    score: 78,
    lastActivity: "4h ago",
  },
  {
    id: 3,
    name: "gagan",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rollNo: "2024003",
    status: "Not Started",
    progress: 0,
    score: 0,
    lastActivity: "1d ago",
  },
  {
    id: 4,
    name: "aman",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rollNo: "2024004",
    status: "Overdue",
    progress: 45,
    score: 56,
    lastActivity: "3d ago",
  },
  {
    id: 5,
    name: "tarun singh",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    rollNo: "2024005",
    status: "Completed",
    progress: 100,
    score: 88,
    lastActivity: "1d ago",
  },
  // Additional students to demonstrate pagination
  ...Array.from({ length: 60 }, (_, i) => ({
    id: i + 6,
    name: `Student ${i + 6}`,
    avatar: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? "women" : "men"
    }/${(i % 70) + 1}.jpg`,
    rollNo: `2024${String(i + 6).padStart(3, "0")}`,
    status: ["Completed", "In Progress", "Not Started", "Overdue"][
      Math.floor(Math.random() * 4)
    ],
    progress: Math.floor(Math.random() * 101),
    score: Math.floor(Math.random() * 101),
    lastActivity: ["1h ago", "2h ago", "1d ago", "2d ago", "3d ago"][
      Math.floor(Math.random() * 5)
    ],
  })),
];

// Score distribution data
const SCORE_DISTRIBUTION = [
  { range: "0-20", count: 5 },
  { range: "21-40", count: 8 },
  { range: "41-60", count: 15 },
  { range: "61-80", count: 24 },
  { range: "81-100", count: 13 },
];

// Progress overview data
const PROGRESS_OVERVIEW = [
  { status: "Completed", count: 35, color: "#4CD964" },
  { status: "In Progress", count: 20, color: "#2979FF" },
  { status: "Not Started", count: 5, color: "#9E9E9E" },
  { status: "Overdue", count: 5, color: "#FF3B30" },
];

// Time spent data
const TIME_SPENT = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 52 },
  { day: "Wed", minutes: 48 },
  { day: "Thu", minutes: 60 },
  { day: "Fri", minutes: 55 },
];

const SingleAssignedCase = () => {
  const [students, setStudents] = useState(STUDENTS_DATA);
  const [filteredStudents, setFilteredStudents] = useState(STUDENTS_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
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

  // Handle student actions
  const viewStudent = (student) => {
    alert(`Viewing student: ${student.name}`);
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
          : parseInt(newStudent.progress || 0),
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
    <div className="ye-waala-naya-h-dusra-container">
      <div className="ye-waala-naya-h-dusra-nevigation-indication">
        <i className="fa-solid fa-home" /> DashBoard
        <i className="fa-solid fa-chevron-right" /> case studie
      </div>
      <div className="ye-waala-naya-h-dusra-header">
        <h1 className="ye-waala-naya-h-dusra-title">
          Case Study: Environmental Impact Analysis
        </h1>
        <div className="ye-waala-naya-h-dusra-meta">
          <span>Duration: 4 weeks</span>
          <span className="ye-waala-naya-h-dusra-dot">•</span>
          <span>Subject: Environmental Science</span>
          <span className="ye-waala-naya-h-dusra-dot">•</span>
          <span>Grade: 10th</span>
        </div>
      </div>

      <div className="ye-waala-naya-h-dusra-metrics">
        <div className="ye-waala-naya-h-dusra-metric">
          <div className="ye-waala-naya-h-dusra-metric-icon ye-waala-naya-h-dusra-blue">
            <i className="fa-solid fa-graduation-cap" />
          </div>
          <div className="ye-waala-naya-h-dusra-metric-content">
            <h3>Total Students</h3>
            <div className="ye-waala-naya-h-dusra-metric-value">
              {totalStudents}
            </div>
          </div>
        </div>

        <div className="ye-waala-naya-h-dusra-metric">
          <div className="ye-waala-naya-h-dusra-metric-icon ye-waala-naya-h-dusra-green">
            <i className="fa-solid fa-chart-line" />
          </div>
          <div className="ye-waala-naya-h-dusra-metric-content">
            <h3>Average Score</h3>
            <div className="ye-waala-naya-h-dusra-metric-value">
              {averageScore}%
            </div>
          </div>
        </div>

        <div className="ye-waala-naya-h-dusra-metric">
          <div className="ye-waala-naya-h-dusra-metric-icon ye-waala-naya-h-dusra-purple">
            <i className="fa-solid fa-check-circle" />
          </div>
          <div className="ye-waala-naya-h-dusra-metric-content">
            <h3>Completion Rate</h3>
            <div className="ye-waala-naya-h-dusra-metric-value">
              {completionRate}%
            </div>
          </div>
        </div>

        <div className="ye-waala-naya-h-dusra-metric">
          <div className="ye-waala-naya-h-dusra-metric-icon ye-waala-naya-h-dusra-orange">
            <i className="fa-solid fa-clock" />
          </div>
          <div className="ye-waala-naya-h-dusra-metric-content">
            <h3>Time Remaining</h3>
            <div className="ye-waala-naya-h-dusra-metric-value">5 Days</div>
          </div>
        </div>
      </div>

      <div className="ye-waala-naya-h-dusra-student-list">
        <div className="ye-waala-naya-h-dusra-list-header">
          <h2>Student List</h2>
          <div className="ye-waala-naya-h-dusra-search-export">
            <div className="ye-waala-naya-h-dusra-search">
              <i className="fa-solid fa-search ye-waala-naya-h-dusra-search-icon" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button
              className="ye-waala-naya-h-dusra-add-btn"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fa-solid fa-user-plus" />
              Add Student
            </button>
            <button className="ye-waala-naya-h-dusra-export-btn">
              <i className="fa-solid fa-graduation-cap" />
              Export Data
            </button>
          </div>
        </div>

        <div className="ye-waala-naya-h-dusra-table-container">
          <table className="ye-waala-naya-h-dusra-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Status</th>
                <th>Score</th>
                <th>Last Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="ye-waala-naya-h-dusra-student-info">
                      <img
                        src={student.avatar || "/placeholder.svg"}
                        alt={student.name}
                        className="ye-waala-naya-h-dusra-avatar"
                      />
                      <span>{student.name}</span>
                    </div>
                  </td>
                  <td>{student.rollNo}</td>
                  <td>
                    <span
                      className={`ye-waala-naya-h-dusra-status ye-waala-naya-h-dusra-status-${student.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>{student.score}</td>
                  <td>{student.lastActivity}</td>
                  <td>
                    <div
                      className="ye-waala-naya-h-dusra-action-dropdown"
                      ref={dropdownRef}
                    >
                      <button
                        className="ye-waala-naya-h-dusra-action-btn"
                        onClick={() => toggleDropdown(student.id)}
                      >
                        <i className="fa-solid fa-ellipsis-v" />
                      </button>
                      {activeDropdown === student.id && (
                        <div className="ye-waala-naya-h-dusra-dropdown-menu">
                          <button onClick={() => viewStudent(student)}>
                            <i className="fa-solid fa-eye" />
                            <span>View</span>
                          </button>
                          <button onClick={() => editStudent(student)}>
                            <i className="fa-solid fa-edit" />
                            <span>Edit</span>
                          </button>
                          <button onClick={() => deleteStudent(student)}>
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

        <div className="ye-waala-naya-h-dusra-pagination">
          <div className="ye-waala-naya-h-dusra-pagination-info">
            Showing {indexOfFirstStudent + 1} to{" "}
            {Math.min(indexOfLastStudent, filteredStudents.length)} of{" "}
            {filteredStudents.length} students
          </div>
          <div className="ye-waala-naya-h-dusra-pagination-controls">
            <button
              className="ye-waala-naya-h-dusra-pagination-btn"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="ye-waala-naya-h-dusra-pagination-btn ye-waala-naya-h-dusra-pagination-btn-primary"
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

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="ye-waala-naya-h-dusra-modal-overlay">
          <div className="ye-waala-naya-h-dusra-modal">
            <div className="ye-waala-naya-h-dusra-modal-header">
              <h3>Add New Student</h3>
              <button
                className="ye-waala-naya-h-dusra-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fa-solid fa-times" />
              </button>
            </div>
            <div className="ye-waala-naya-h-dusra-modal-body">
              <div className="ye-waala-naya-h-dusra-form-group">
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
              <div className="ye-waala-naya-h-dusra-form-group">
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
              <div className="ye-waala-naya-h-dusra-form-group">
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
              <div className="ye-waala-naya-h-dusra-form-group">
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
            <div className="ye-waala-naya-h-dusra-modal-footer">
              <button
                className="ye-waala-naya-h-dusra-btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="ye-waala-naya-h-dusra-btn-primary"
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
