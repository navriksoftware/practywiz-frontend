"use client";

import { useEffect, useState } from "react";
import "../DashboardCSS/CaseAssignProcess.css";

const CaseAssigneProcess = () => {
  // State
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filters, setFilters] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([
    "ECO 201",
    "ECO 101",
    "ECO 102",
  ]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  // Initial data
  useEffect(() => {
    // const initialStudents = [
    //   {
    //     id: "STU001",
    //     name: "Alice Johnson",
    //     class: "ECO 201",
    //     email: "alice.j@example.com",
    //   },
    //   {
    //     id: "STU002",
    //     name: "Bob Smith",
    //     class: "ECO 201",
    //     email: "bob.s@example.com",
    //   },
    //   {
    //     id: "STU003",
    //     name: "Carol Williams",
    //     class: "ECO 101",
    //     email: "carol.w@example.com",
    //   },
    //   {
    //     id: "STU004",
    //     name: "David Brown",
    //     class: "ECO 101",
    //     email: "david.b@example.com",
    //   },
    //   {
    //     id: "STU005",
    //     name: "Emma Davis",
    //     class: "ECO 102",
    //     email: "emma.d@example.com",
    //   },
    //   {
    //     id: "STU006",
    //     name: "Alice Johnson",
    //     class: "ECO 201",
    //     email: "alice.j@example.com",
    //   },
    //   {
    //     id: "STU007",
    //     name: "Bob Smith",
    //     class: "ECO 201",
    //     email: "bob.s@example.com",
    //   },
    //   {
    //     id: "STU008",
    //     name: "Carol Williams",
    //     class: "ECO 101",
    //     email: "carol.w@example.com",
    //   },
    //   {
    //     id: "STU009",
    //     name: "David Brown",
    //     class: "ECO 101",
    //     email: "david.b@example.com",
    //   },
    //   {
    //     id: "STU010",
    //     name: "Emma Davis",
    //     class: "ECO 102",
    //     email: "emma.d@example.com",
    //   },
    //   {
    //     id: "STU011",
    //     name: "Frank Jones",
    //     class: "ECO 102",
    //     email: "frank.j@example.com",
    //   },
    //   {
    //     id: "STU012",
    //     name: "Grace Lee",
    //     class: "ECO 102",
    //     email: "grace.l@example.com",
    //   },
    //   {
    //     id: "STU013",
    //     name: "Henry Miller",
    //     class: "ECO 102",
    //     email: "henry.m@example.com",
    //   },
    //   {
    //     id: "STU014",
    //     name: "Isla Parker",
    //     class: "ECO 102",
    //     email: "isla.p@example.com",
    //   },
    //   {
    //     id: "STU015",
    //     name: "Jack Wilson",
    //     class: "ECO 102",
    //     email: "jack.w@example.com",
    //   },
    //   {
    //     id: "STU016",
    //     name: "Katie Adams",
    //     class: "ECO 102",
    //     email: "katie.a@example.com",
    //   },
    // ];
    const initialStudents = [
      {
        id: "STU001",
        name: "Aarav Sharma",
        class: "ECO 201",
        email: "aarav.s@example.in",
      },
      {
        id: "STU002",
        name: "Bhavya Patel",
        class: "ECO 201",
        email: "bhavya.p@example.in",
      },
      {
        id: "STU003",
        name: "Chirag Verma",
        class: "ECO 101",
        email: "chirag.v@example.in",
      },
      {
        id: "STU004",
        name: "Deepak Yadav",
        class: "ECO 101",
        email: "deepak.y@example.in",
      },
      {
        id: "STU005",
        name: "Esha Mehta",
        class: "ECO 102",
        email: "esha.m@example.in",
      },
      {
        id: "STU006",
        name: "Aarav Sharma",
        class: "ECO 201",
        email: "aarav.s@example.in",
      },
      {
        id: "STU007",
        name: "Bhavya Patel",
        class: "ECO 201",
        email: "bhavya.p@example.in",
      },
      {
        id: "STU008",
        name: "Chirag Verma",
        class: "ECO 101",
        email: "chirag.v@example.in",
      },
      {
        id: "STU009",
        name: "Deepak Yadav",
        class: "ECO 101",
        email: "deepak.y@example.in",
      },
      {
        id: "STU010",
        name: "Esha Mehta",
        class: "ECO 102",
        email: "esha.m@example.in",
      },
      {
        id: "STU011",
        name: "Farhan Khan",
        class: "ECO 102",
        email: "farhan.k@example.in",
      },
      {
        id: "STU012",
        name: "Gauri Iyer",
        class: "ECO 102",
        email: "gauri.i@example.in",
      },
      {
        id: "STU013",
        name: "Harsh Tiwari",
        class: "ECO 102",
        email: "harsh.t@example.in",
      },
      {
        id: "STU014",
        name: "Ishita Reddy",
        class: "ECO 102",
        email: "ishita.r@example.in",
      },
      {
        id: "STU015",
        name: "Jayant Deshmukh",
        class: "ECO 102",
        email: "jayant.d@example.in",
      },
      {
        id: "STU016",
        name: "Kavya Nair",
        class: "ECO 102",
        email: "kavya.n@example.in",
      },
    ];

    setStudents(initialStudents);
    setFilteredStudents(initialStudents);

    // Set initial filters
    setFilters([]);
  }, []);

  // Filter students based on search term, class filters, and other filters
  useEffect(() => {
    const filterStudents = () => {
      let result = [...students];

      // Apply search filter
      if (searchTerm.trim() !== "") {
        result = result.filter(
          (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply class filters if any are selected
      if (selectedClasses.length > 0) {
        result = result.filter((student) =>
          selectedClasses.includes(student.class)
        );
      }

      setFilteredStudents(result);
    };

    // Debounce the filtering
    const debounceTimer = setTimeout(() => {
      filterStudents();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedClasses, students]);

  // Handle toggling class selection
  const handleToggleClass = (className) => {
    setSelectedClasses((prev) => {
      // If the class is already selected, remove it
      if (prev.includes(className)) {
        // Remove the class filter
        setFilters(filters.filter((filter) => filter.name !== className));
        return prev.filter((c) => c !== className);
      } else {
        // Add the class as a filter
        const newFilter = {
          id: `class-${Date.now()}`,
          name: className,
          type: "class",
        };
        setFilters([...filters, newFilter]);
        return [...prev, className];
      }
    });
  };

  // Handle removing a filter
  const removeFilter = (filterId) => {
    const filterToRemove = filters.find((filter) => filter.id === filterId);

    if (filterToRemove) {
      // If removing a class filter, update the selectedClasses state
      if (filterToRemove.type === "class") {
        setSelectedClasses(
          selectedClasses.filter((c) => c !== filterToRemove.name)
        );
      }

      // Remove the filter from the filters list
      setFilters(filters.filter((filter) => filter.id !== filterId));
    }
  };

  // Handle checkbox selection for students
  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (
      selectedStudents.length === filteredStudents.length &&
      filteredStudents.length > 0
    ) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((student) => student.id));
    }
  };

  // Delete student
  const deleteStudent = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
    setFilteredStudents(
      filteredStudents.filter((student) => student.id !== studentId)
    );
    setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
  };

  return (
    <div className="case-assign-to-student-container">
      {/* <div className="ye-waala-naya-h-dusra-nevigation-indication">
        <i className="fa-solid fa-home" /> DashBoard
        <i className="fa-solid fa-chevron-right" /> case studie
        <i className="fa-solid fa-chevron-right" /> Assign Case
      </div> */}
      <div className="case-assign-to-student-dashboard">
        {/* Left Panel */}
        <div className="case-assign-to-student-left-panel">
          <h1 className="case-assign-to-student-title">
            Marketing Strategy Analysis
          </h1>

          <div className="case-assign-to-student-tags">
            <span className="case-assign-to-student-tag case-assign-to-student-tag-business">
              Business
            </span>
            <span className="case-assign-to-student-tag case-assign-to-student-tag-strategy">
              Strategy
            </span>
            <span className="case-assign-to-student-tag case-assign-to-student-tag-marketing">
              Marketing
            </span>
          </div>

          <p className="case-assign-to-student-description">
            A comprehensive analysis of modern marketing strategies in the
            digital age. Students will learn about customer acquisition,
            retention, and brand building through real-world examples and
            practical exercises.
          </p>

          <div className="case-assign-to-student-course-info">
            <div className="case-assign-to-student-info-item">
              <i className="fa-solid fa-clock case-assign-to-student-icon" />
              <span>2 weeks</span>
            </div>
            <div className="case-assign-to-student-info-item">
              <i className="fa-solid fa-signal case-assign-to-student-icon" />
              <span>Intermediate</span>
            </div>
            <div className="case-assign-to-student-info-item">
              <i className="fa-solid fa-book case-assign-to-student-icon" />
              <span>5 modules</span>
            </div>
          </div>

          <h2 className="case-assign-to-student-subtitle">Preview Content</h2>

          <div className="case-assign-to-student-modules">
            <div className="case-assign-to-student-module">
              <p>
                <strong>Key Learning Objective</strong> Learn the fundamentals
                of contemporary marketing strategies and how they've evolved in
                the digital age. Understand key concepts and frameworks that
                drive successful marketing campaigns.
              </p>
            </div>
          </div>

          <button className="case-assign-to-student-view-button">
            View Full Case Study
          </button>
        </div>

        {/* Right Panel */}
        <div className="case-assign-to-student-right-panel">
          <div className="case-assign-to-student-search-section">
            <div className="case-assign-to-student-search-container">
              <input
                type="text"
                placeholder="Search students..."
                className="case-assign-to-student-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                className="case-assign-to-student-class-filter"
                onClick={() => setShowClassDropdown(!showClassDropdown)}
              >
                {selectedClasses.length === 0
                  ? "All Classes"
                  : selectedClasses.length === 1
                  ? selectedClasses[0]
                  : `${selectedClasses.length} Classes`}
                <i className="fa-solid fa-chevron-down" />
                {showClassDropdown && (
                  <div className="case-assign-to-student-class-dropdown">
                    <div
                      className="case-assign-to-student-class-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClasses([]);
                        setFilters(
                          filters.filter((filter) => filter.type !== "class")
                        );
                        setShowClassDropdown(false);
                      }}
                    >
                      All Classes
                    </div>
                    {availableClasses.map((cls) => (
                      <div
                        key={cls}
                        className="case-assign-to-student-class-option"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleClass(cls);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedClasses.includes(cls)}
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {cls}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="case-assign-to-student-active-filters">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className="case-assign-to-student-filter-tag"
                >
                  {filter.name}
                  <i
                    className="fa-solid fa-times case-assign-to-student-remove-filter"
                    onClick={() => removeFilter(filter.id)}
                  />
                </div>
              ))}
            </div>

            {/* <button className="case-assign-to-student-add-button">
              <i className="fa-solid fa-plus" /> Add Student
            </button> */}
          </div>

          <div className="case-assign-to-student-students-table">
            <div className="case-assign-to-student-table-header">
              <div className="case-assign-to-student-checkbox-cell">
                <input
                  type="checkbox"
                  checked={
                    selectedStudents.length === filteredStudents.length &&
                    filteredStudents.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </div>
              <div className="case-assign-to-student-name-cell">
                Student Name
              </div>
              <div className="case-assign-to-student-id-cell">Student ID</div>
              <div className="case-assign-to-student-class-cell">Class</div>
              <div className="case-assign-to-student-email-cell">Email</div>
              <div className="case-assign-to-student-action-cell"></div>
            </div>

            <div
              className="case-assign-to-student-table-body"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="case-assign-to-student-table-row"
                  >
                    <div className="case-assign-to-student-checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </div>
                    <div className="case-assign-to-student-name-cell">
                      {student.name}
                    </div>
                    <div className="case-assign-to-student-id-cell">
                      {student.id}
                    </div>
                    <div className="case-assign-to-student-class-cell">
                      {student.class}
                    </div>
                    <div className="case-assign-to-student-email-cell">
                      {student.email}
                    </div>
                    <div className="case-assign-to-student-action-cell">
                      <i
                        className="fa-solid fa-trash case-assign-to-student-delete-icon"
                        onClick={() => deleteStudent(student.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="case-assign-to-student-no-students">
                  No students match the current filters.
                </div>
              )}
            </div>
          </div>

          <div className="case-assign-to-student-table-footer">
            <div className="case-assign-to-student-selection-info">
              {selectedStudents.length} students selected
            </div>

            <button className="case-assign-to-student-assign-button">
              Assign Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseAssigneProcess;
