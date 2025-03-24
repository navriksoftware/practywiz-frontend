// "use client";

// import { useEffect, useState } from "react";
// import "../DashboardCSS/CaseAssignProcess.css";

// const CaseAssigneProcess = () => {
//   // State
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [filters, setFilters] = useState([]);
//   const [availableClasses, setAvailableClasses] = useState([
//     "Class A",
//     "Class B",
//     "Class C",
//   ]);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [showClassDropdown, setShowClassDropdown] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentsPerPage] = useState(7);

//   // Initial data
//   useEffect(() => {
//     const initialStudents = [
//       {
//         id: "STU001",
//         name: "Alice Johnson",
//         class: "Class A",
//         email: "alice.j@example.com",
//       },
//       {
//         id: "STU002",
//         name: "Bob Smith",
//         class: "Class A",
//         email: "bob.s@example.com",
//       },
//       {
//         id: "STU003",
//         name: "Carol Williams",
//         class: "Class B",
//         email: "carol.w@example.com",
//       },
//       {
//         id: "STU004",
//         name: "David Brown",
//         class: "Class B",
//         email: "david.b@example.com",
//       },
//       {
//         id: "STU005",
//         name: "Emma Davis",
//         class: "Class C",
//         email: "emma.d@example.com",
//       },
//       {
//         id: "STU006",
//         name: "Alice Johnson",
//         class: "Class A",
//         email: "alice.j@example.com",
//       },
//       {
//         id: "STU007",
//         name: "Bob Smith",
//         class: "Class A",
//         email: "bob.s@example.com",
//       },
//       {
//         id: "STU008",
//         name: "Carol Williams",
//         class: "Class B",
//         email: "carol.w@example.com",
//       },
//       {
//         id: "STU009",
//         name: "David Brown",
//         class: "Class B",
//         email: "david.b@example.com",
//       },
//       {
//         id: "STU010",
//         name: "Emma Davis",
//         class: "Class C",
//         email: "emma.d@example.com",
//       },
//       {
//         id: "STU011",
//         name: "Frank Jones",
//         class: "Class C",
//         email: "frank.j@example.com",
//       },
//       {
//         id: "STU012",
//         name: "Grace Lee",
//         class: "Class C",
//         email: "grace.l@example.com",
//       },
//       {
//         id: "STU013",
//         name: "Henry Miller",
//         class: "Class C",
//         email: "henry.m@example.com",
//       },
//       {
//         id: "STU014",
//         name: "Isla Parker",
//         class: "Class C",
//         email: "isla.p@example.com",
//       },
//       {
//         id: "STU015",
//         name: "Jack Wilson",
//         class: "Class C",
//         email: "jack.w@example.com",
//       },
//       {
//         id: "STU016",
//         name: "Katie Adams",
//         class: "Class C",
//         email: "katie.a@example.com",
//       },
//     ];
//     setStudents(initialStudents);
//     setFilteredStudents(initialStudents);

//     // Set initial filters
//     setFilters([]);
//   }, []);

//   // Filter students based on search term, class filters, and other filters
//   useEffect(() => {
//     const filterStudents = () => {
//       let result = [...students];

//       // Apply search filter
//       if (searchTerm.trim() !== "") {
//         result = result.filter(
//           (student) =>
//             student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             student.email.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       // Apply class filters if any are selected
//       if (selectedClasses.length > 0) {
//         result = result.filter((student) =>
//           selectedClasses.includes(student.class)
//         );
//       }

//       setFilteredStudents(result);
//       setCurrentPage(1); // Reset to first page when filters change
//     };

//     // Debounce the filtering
//     const debounceTimer = setTimeout(() => {
//       filterStudents();
//     }, 300);

//     return () => clearTimeout(debounceTimer);
//   }, [searchTerm, selectedClasses, students]);

//   // Handle toggling class selection
//   const handleToggleClass = (className) => {
//     setSelectedClasses((prev) => {
//       // If the class is already selected, remove it
//       if (prev.includes(className)) {
//         // Remove the class filter
//         setFilters(filters.filter((filter) => filter.name !== className));
//         return prev.filter((c) => c !== className);
//       } else {
//         // Add the class as a filter
//         const newFilter = {
//           id: `class-${Date.now()}`,
//           name: className,
//           type: "class",
//         };
//         setFilters([...filters, newFilter]);
//         return [...prev, className];
//       }
//     });
//   };

//   // Handle removing a filter
//   const removeFilter = (filterId) => {
//     const filterToRemove = filters.find((filter) => filter.id === filterId);

//     if (filterToRemove) {
//       // If removing a class filter, update the selectedClasses state
//       if (filterToRemove.type === "class") {
//         setSelectedClasses(
//           selectedClasses.filter((c) => c !== filterToRemove.name)
//         );
//       }

//       // Remove the filter from the filters list
//       setFilters(filters.filter((filter) => filter.id !== filterId));
//     }
//   };

//   // Handle checkbox selection for students
//   const handleSelectStudent = (studentId) => {
//     setSelectedStudents((prev) => {
//       if (prev.includes(studentId)) {
//         return prev.filter((id) => id !== studentId);
//       } else {
//         return [...prev, studentId];
//       }
//     });
//   };

//   // Handle select all checkbox
//   const handleSelectAll = () => {
//     if (
//       selectedStudents.length === currentStudents.length &&
//       currentStudents.length > 0
//     ) {
//       setSelectedStudents([]);
//     } else {
//       setSelectedStudents(currentStudents.map((student) => student.id));
//     }
//   };

//   // Delete student
//   const deleteStudent = (studentId) => {
//     setStudents(students.filter((student) => student.id !== studentId));
//     setFilteredStudents(
//       filteredStudents.filter((student) => student.id !== studentId)
//     );
//     setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
//   };

//   // Pagination logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(
//     indexOfFirstStudent,
//     indexOfLastStudent
//   );
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="ye-waala-final-assign-container">
//       <div className="ye-waala-final-assign-dashboard">
//         {/* Left Panel */}
//         <div className="ye-waala-final-assign-left-panel">
//           <h1 className="ye-waala-final-assign-title">
//             Marketing Strategy Analysis
//           </h1>

//           <div className="ye-waala-final-assign-tags">
//             <span className="ye-waala-final-assign-tag ye-waala-final-assign-tag-business">
//               Business
//             </span>
//             <span className="ye-waala-final-assign-tag ye-waala-final-assign-tag-strategy">
//               Strategy
//             </span>
//             <span className="ye-waala-final-assign-tag ye-waala-final-assign-tag-marketing">
//               Marketing
//             </span>
//           </div>

//           <p className="ye-waala-final-assign-description">
//             A comprehensive analysis of modern marketing strategies in the
//             digital age. Students will learn about customer acquisition,
//             retention, and brand building through real-world examples and
//             practical exercises.
//           </p>

//           <div className="ye-waala-final-assign-course-info">
//             <div className="ye-waala-final-assign-info-item">
//               <i className="fa-solid fa-clock ye-waala-final-assign-icon" />
//               <span>2 weeks</span>
//             </div>
//             <div className="ye-waala-final-assign-info-item">
//               <i className="fa-solid fa-signal ye-waala-final-assign-icon" />
//               <span>Intermediate</span>
//             </div>
//             <div className="ye-waala-final-assign-info-item">
//               <i className="fa-solid fa-book ye-waala-final-assign-icon" />
//               <span>5 modules</span>
//             </div>
//           </div>

//           <h2 className="ye-waala-final-assign-subtitle">Preview Content</h2>

//           <div className="ye-waala-final-assign-modules">
//             <div className="ye-waala-final-assign-module">
//               <p>
//                 <strong>Key Learning Objective</strong> Learn the fundamentals
//                 of contemporary marketing strategies and how they've evolved in
//                 the digital age. Understand key concepts and frameworks that
//                 drive successful marketing campaigns.
//               </p>
//             </div>
//           </div>

//           <button className="ye-waala-final-assign-view-button">
//             View Full Case Study
//           </button>
//         </div>

//         {/* Right Panel */}
//         <div className="ye-waala-final-assign-right-panel">
//           <div className="ye-waala-final-assign-search-section">
//             <div className="ye-waala-final-assign-search-container">
//               <input
//                 type="text"
//                 placeholder="Search students..."
//                 className="ye-waala-final-assign-search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <div
//                 className="ye-waala-final-assign-class-filter"
//                 onClick={() => setShowClassDropdown(!showClassDropdown)}
//               >
//                 {selectedClasses.length === 0
//                   ? "All Classes"
//                   : selectedClasses.length === 1
//                   ? selectedClasses[0]
//                   : `${selectedClasses.length} Classes`}
//                 <i className="fa-solid fa-chevron-down" />
//                 {showClassDropdown && (
//                   <div className="ye-waala-final-assign-class-dropdown">
//                     <div
//                       className="ye-waala-final-assign-class-option"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedClasses([]);
//                         setFilters(
//                           filters.filter((filter) => filter.type !== "class")
//                         );
//                         setShowClassDropdown(false);
//                       }}
//                     >
//                       All Classes
//                     </div>
//                     {availableClasses.map((cls) => (
//                       <div
//                         key={cls}
//                         className="ye-waala-final-assign-class-option"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleToggleClass(cls);
//                         }}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedClasses.includes(cls)}
//                           onChange={() => {}}
//                           onClick={(e) => e.stopPropagation()}
//                         />
//                         {cls}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="ye-waala-final-assign-active-filters">
//               {filters.map((filter) => (
//                 <div
//                   key={filter.id}
//                   className="ye-waala-final-assign-filter-tag"
//                 >
//                   {filter.name}
//                   <i
//                     className="fa-solid fa-times ye-waala-final-assign-remove-filter"
//                     onClick={() => removeFilter(filter.id)}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* <button className="ye-waala-final-assign-add-button">
//               <i className="fa-solid fa-plus" /> Add Student
//             </button> */}
//           </div>

//           <div className="ye-waala-final-assign-students-table">
//             <div className="ye-waala-final-assign-table-header">
//               <div className="ye-waala-final-assign-checkbox-cell">
//                 <input
//                   type="checkbox"
//                   checked={
//                     selectedStudents.length === currentStudents.length &&
//                     currentStudents.length > 0
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </div>
//               <div className="ye-waala-final-assign-name-cell">
//                 Student Name
//               </div>
//               <div className="ye-waala-final-assign-id-cell">Student ID</div>
//               <div className="ye-waala-final-assign-class-cell">Class</div>
//               <div className="ye-waala-final-assign-email-cell">Email</div>
//               <div className="ye-waala-final-assign-action-cell"></div>
//             </div>

//             <div className="ye-waala-final-assign-table-body">
//               {currentStudents.length > 0 ? (
//                 currentStudents.map((student) => (
//                   <div
//                     key={student.id}
//                     className="ye-waala-final-assign-table-row"
//                   >
//                     <div className="ye-waala-final-assign-checkbox-cell">
//                       <input
//                         type="checkbox"
//                         checked={selectedStudents.includes(student.id)}
//                         onChange={() => handleSelectStudent(student.id)}
//                       />
//                     </div>
//                     <div className="ye-waala-final-assign-name-cell">
//                       {student.name}
//                     </div>
//                     <div className="ye-waala-final-assign-id-cell">
//                       {student.id}
//                     </div>
//                     <div className="ye-waala-final-assign-class-cell">
//                       {student.class}
//                     </div>
//                     <div className="ye-waala-final-assign-email-cell">
//                       {student.email}
//                     </div>
//                     <div className="ye-waala-final-assign-action-cell">
//                       <i
//                         className="fa-solid fa-trash ye-waala-final-assign-delete-icon"
//                         onClick={() => deleteStudent(student.id)}
//                       />
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="ye-waala-final-assign-no-students">
//                   No students match the current filters.
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="ye-waala-final-assign-table-footer">
//             <div className="ye-waala-final-assign-selection-info">
//               {selectedStudents.length} students selected
//             </div>

//             <div className="ye-waala-final-assign-pagination">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i + 1}
//                   className={`ye-waala-final-assign-page-button ${
//                     currentPage === i + 1
//                       ? "ye-waala-final-assign-active-page"
//                       : ""
//                   }`}
//                   onClick={() => paginate(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>

//             <button className="ye-waala-final-assign-assign-button">
//               Assign Case Study
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaseAssigneProcess;

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
    "Class A",
    "Class B",
    "Class C",
  ]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  // Initial data
  useEffect(() => {
    const initialStudents = [
      {
        id: "STU001",
        name: "Alice Johnson",
        class: "Class A",
        email: "alice.j@example.com",
      },
      {
        id: "STU002",
        name: "Bob Smith",
        class: "Class A",
        email: "bob.s@example.com",
      },
      {
        id: "STU003",
        name: "Carol Williams",
        class: "Class B",
        email: "carol.w@example.com",
      },
      {
        id: "STU004",
        name: "David Brown",
        class: "Class B",
        email: "david.b@example.com",
      },
      {
        id: "STU005",
        name: "Emma Davis",
        class: "Class C",
        email: "emma.d@example.com",
      },
      {
        id: "STU006",
        name: "Alice Johnson",
        class: "Class A",
        email: "alice.j@example.com",
      },
      {
        id: "STU007",
        name: "Bob Smith",
        class: "Class A",
        email: "bob.s@example.com",
      },
      {
        id: "STU008",
        name: "Carol Williams",
        class: "Class B",
        email: "carol.w@example.com",
      },
      {
        id: "STU009",
        name: "David Brown",
        class: "Class B",
        email: "david.b@example.com",
      },
      {
        id: "STU010",
        name: "Emma Davis",
        class: "Class C",
        email: "emma.d@example.com",
      },
      {
        id: "STU011",
        name: "Frank Jones",
        class: "Class C",
        email: "frank.j@example.com",
      },
      {
        id: "STU012",
        name: "Grace Lee",
        class: "Class C",
        email: "grace.l@example.com",
      },
      {
        id: "STU013",
        name: "Henry Miller",
        class: "Class C",
        email: "henry.m@example.com",
      },
      {
        id: "STU014",
        name: "Isla Parker",
        class: "Class C",
        email: "isla.p@example.com",
      },
      {
        id: "STU015",
        name: "Jack Wilson",
        class: "Class C",
        email: "jack.w@example.com",
      },
      {
        id: "STU016",
        name: "Katie Adams",
        class: "Class C",
        email: "katie.a@example.com",
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
    <div className="ye-waala-final-assign-container">
      <div className="ye-waala-naya-h-dusra-nevigation-indication">
        <i className="fa-solid fa-home" /> DashBoard
        <i className="fa-solid fa-chevron-right" /> case studie
        <i className="fa-solid fa-chevron-right" /> Assign Case
      </div>
      <div className="ye-waala-final-assign-dashboard">
        {/* Left Panel */}
        <div className="ye-waala-final-assign-left-panel">
          <h1 className="ye-waala-final-assign-title">
            Marketing Strategy Analysis
          </h1>

          <div className="ye-waala-final-assign-tags">
            <span className="ye-waala-final-assign-tag ye-waala-final-assign-tag-business">
              Business
            </span>
            <span className="ye-waala-final-assign-tag ye-waala-final-assign-tag-strategy">
              Strategy
            </span>
            <span className="ye-waala-final-assign-tag ye-waala-final-assign-tag-marketing">
              Marketing
            </span>
          </div>

          <p className="ye-waala-final-assign-description">
            A comprehensive analysis of modern marketing strategies in the
            digital age. Students will learn about customer acquisition,
            retention, and brand building through real-world examples and
            practical exercises.
          </p>

          <div className="ye-waala-final-assign-course-info">
            <div className="ye-waala-final-assign-info-item">
              <i className="fa-solid fa-clock ye-waala-final-assign-icon" />
              <span>2 weeks</span>
            </div>
            <div className="ye-waala-final-assign-info-item">
              <i className="fa-solid fa-signal ye-waala-final-assign-icon" />
              <span>Intermediate</span>
            </div>
            <div className="ye-waala-final-assign-info-item">
              <i className="fa-solid fa-book ye-waala-final-assign-icon" />
              <span>5 modules</span>
            </div>
          </div>

          <h2 className="ye-waala-final-assign-subtitle">Preview Content</h2>

          <div className="ye-waala-final-assign-modules">
            <div className="ye-waala-final-assign-module">
              <p>
                <strong>Key Learning Objective</strong> Learn the fundamentals
                of contemporary marketing strategies and how they've evolved in
                the digital age. Understand key concepts and frameworks that
                drive successful marketing campaigns.
              </p>
            </div>
          </div>

          <button className="ye-waala-final-assign-view-button">
            View Full Case Study
          </button>
        </div>

        {/* Right Panel */}
        <div className="ye-waala-final-assign-right-panel">
          <div className="ye-waala-final-assign-search-section">
            <div className="ye-waala-final-assign-search-container">
              <input
                type="text"
                placeholder="Search students..."
                className="ye-waala-final-assign-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div
                className="ye-waala-final-assign-class-filter"
                onClick={() => setShowClassDropdown(!showClassDropdown)}
              >
                {selectedClasses.length === 0
                  ? "All Classes"
                  : selectedClasses.length === 1
                  ? selectedClasses[0]
                  : `${selectedClasses.length} Classes`}
                <i className="fa-solid fa-chevron-down" />
                {showClassDropdown && (
                  <div className="ye-waala-final-assign-class-dropdown">
                    <div
                      className="ye-waala-final-assign-class-option"
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
                        className="ye-waala-final-assign-class-option"
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

            <div className="ye-waala-final-assign-active-filters">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className="ye-waala-final-assign-filter-tag"
                >
                  {filter.name}
                  <i
                    className="fa-solid fa-times ye-waala-final-assign-remove-filter"
                    onClick={() => removeFilter(filter.id)}
                  />
                </div>
              ))}
            </div>

            {/* <button className="ye-waala-final-assign-add-button">
              <i className="fa-solid fa-plus" /> Add Student
            </button> */}
          </div>

          <div className="ye-waala-final-assign-students-table">
            <div className="ye-waala-final-assign-table-header">
              <div className="ye-waala-final-assign-checkbox-cell">
                <input
                  type="checkbox"
                  checked={
                    selectedStudents.length === filteredStudents.length &&
                    filteredStudents.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </div>
              <div className="ye-waala-final-assign-name-cell">
                Student Name
              </div>
              <div className="ye-waala-final-assign-id-cell">Student ID</div>
              <div className="ye-waala-final-assign-class-cell">Class</div>
              <div className="ye-waala-final-assign-email-cell">Email</div>
              <div className="ye-waala-final-assign-action-cell"></div>
            </div>

            <div
              className="ye-waala-final-assign-table-body"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="ye-waala-final-assign-table-row"
                  >
                    <div className="ye-waala-final-assign-checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </div>
                    <div className="ye-waala-final-assign-name-cell">
                      {student.name}
                    </div>
                    <div className="ye-waala-final-assign-id-cell">
                      {student.id}
                    </div>
                    <div className="ye-waala-final-assign-class-cell">
                      {student.class}
                    </div>
                    <div className="ye-waala-final-assign-email-cell">
                      {student.email}
                    </div>
                    <div className="ye-waala-final-assign-action-cell">
                      <i
                        className="fa-solid fa-trash ye-waala-final-assign-delete-icon"
                        onClick={() => deleteStudent(student.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="ye-waala-final-assign-no-students">
                  No students match the current filters.
                </div>
              )}
            </div>
          </div>

          <div className="ye-waala-final-assign-table-footer">
            <div className="ye-waala-final-assign-selection-info">
              {selectedStudents.length} students selected
            </div>

            <button className="ye-waala-final-assign-assign-button">
              Assign Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseAssigneProcess;
