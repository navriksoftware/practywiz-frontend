import { useEffect, useState } from "react";
import axios from "axios";
import "../DashboardCSS/CaseAssignProcess.css";
import ConfigureCasePopup from "./ConfigureCase.js";
import { ApiURL } from "../../../../../Utils/ApiURL";
import { useSelector } from "react-redux";
import CaseStudyShowModel from "./CaseStudyShowModel.js";
import QuestionShow from "./QuestionShow.js";
import { X } from 'lucide-react';


function parseNonPractywizQuestions(nonPractywizCaseQuestion) {
  if (!nonPractywizCaseQuestion) return [];

  let parsed;
  try {
    parsed = JSON.parse(nonPractywizCaseQuestion);
  } catch (e) {
    return [];
  }

  // Old format: Array of questions
  if (Array.isArray(parsed)) {
    // Optionally, group by category if you want to show sections
    const grouped = {};
    parsed.forEach((q) => {
      const cat = (q.category || "Other").toLowerCase();
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(q);
    });
    return Object.entries(grouped).map(([type, questions]) => ({
      type,
      questions,
    }));
  }

  // New format: Object with keys
  if (typeof parsed === "object") {
    const result = [];
    if (parsed.factBasedQuestions && Array.isArray(parsed.factBasedQuestions)) {
      result.push({ type: "Fact Based", questions: parsed.factBasedQuestions });
    }
    if (
      parsed.analysisBasedQuestions &&
      Array.isArray(parsed.analysisBasedQuestions)
    ) {
      result.push({
        type: "Analysis Based",
        questions: parsed.analysisBasedQuestions,
      });
    }
    if (
      parsed.researchBasedQuestions &&
      Array.isArray(parsed.researchBasedQuestions)
    ) {
      result.push({
        type: "Research Based",
        questions: parsed.researchBasedQuestions,
      });
    }
    return result;
  }

  return [];
}

const CaseAssigneProcess = () => {
  const [openPreview, setopenPreview] = useState(false)
  const [openQuestionpage, setopenQuestionpage] = useState(false)
  const classid = localStorage.getItem("clickedClassId"); //class id from local storage
  const caseStudyId = localStorage.getItem("caseStudyId"); //case study id from local storage
  const caseType = localStorage.getItem("caseType") === "practywiz" ? 1 : 0;
  const facultyID = useSelector(
    (state) => state.faculty.facultyDtls.faculty_id
  );
  const [casestudyDetails, setcasestudyDetails] = useState([]);
  const [classDetails, setClassDetails] = useState([]); // State to store class details

  // Fetch case studies data
  const url = ApiURL();
  useEffect(() => {
    const fetchWithTimeout = (axiosPromise, timeout = 45000) => {
      return Promise.race([
        axiosPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeout)
        ),
      ]);
    };

    const fetchData = async () => {
      try {
        const [caseStudyRes, classListRes] = await Promise.all([
          fetchWithTimeout(
            axios.post(`${url}api/v1/faculty/case-studies/fetch-caseData`, {
              caseStudyId,
              caseType,
            })
          ),
          fetchWithTimeout(
            axios.post(`${url}api/v1/faculty/case-studies/fetch-classlist`, {
              facultyID,
            })
          ),
        ]);

        // Handle case study response
        if (caseStudyRes.data?.success) {
          setcasestudyDetails(caseStudyRes.data.success[0]);
          console.log(
            "Case studies fetched successfully:",
            caseStudyRes.data.success
          );
        } else {
          setcasestudyDetails([]);
          console.warn("No case studies found.");
        }

        // Handle class list response
        if (classListRes.data?.success) {
          setClassDetails(classListRes.data.success);
          console.log(
            "Class list fetched successfully:",
            classListRes.data.success
          );
        } else {
          setClassDetails([]);
          console.warn("No class list data found.");
        }
      } catch (error) {
        // Set both to empty if any request fails
        setcasestudyDetails([]);
        setClassDetails([]);

        if (error.message === "Request timed out") {
          console.error("One of the requests timed out.");
        } else {
          console.error(
            "An error occurred while fetching data:",
            error.message
          );
        }
      }
    };

    fetchData();
  }, [url]);

  // State
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setselectedClass] = useState([classid]);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  // const [caseType, setcaseType] = useState(0); //Case Created by: 0 for Practywiz case, 1 for NON-Practywiz case

  // Fetch student of the selected class by id`s
  useEffect(() => {
    // if (selectedClass) return;

    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 45000); // 45s timeout

        const response = await axios.post(
          `${url}api/v1/faculty/Student/fetch-student`,
          { selectedClass },
          { signal: controller.signal }
        );

        clearTimeout(timeout);

        if (response.data.success) {
          setFilteredStudents(response.data.success);
          setLoading(false);
        } else {
          setFilteredStudents([]);
          setLoading(false);
          console.warn("API returned an error response:", response.data.error);
        }
      } catch (error) {
        setFilteredStudents([]);
        if (error.name === "AbortError") {
          console.error("Request timed out.");
          setLoading(false);
        } else {
          console.error("An error occurred:", error.message);
          setLoading(false);
        }
      }
    };

    fetchStudentDetails();
  }, [url, selectedClass]);

  // Filter students based on search term, class filters, and other filters
  // useEffect(() => {
  //   const filterStudents = () => {
  //     let result = [...students];

  //     // Apply search filter
  //     if (searchTerm.trim() !== "") {
  //       result = result.filter(
  //         (student) =>
  //           student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //           student.email.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //     }

  //     // Apply class filters if any are selected
  //     if (selectedClass.length > 0) {
  //       result = result.filter((student) =>
  //         selectedClass.includes(student.class)
  //       );
  //     }

  //     setFilteredStudents(result);
  //   };

  //   // Debounce the filtering
  //   const debounceTimer = setTimeout(() => {
  //     filterStudents();
  //   }, 300);

  //   return () => clearTimeout(debounceTimer);
  // }, [searchTerm, selectedClass, students]);

  // Handle toggling class selection
  const handleToggleClass = (classObj) => {
    const { class_dtls_id, class_name } = classObj;

    setselectedClass((prev) => {
      if (prev.includes(class_dtls_id)) {
        // Remove both ID from selected and filter by name
        setFilters((filters) =>
          filters.filter((filter) => filter.name !== class_name)
        );
        return prev.filter((id) => id !== class_dtls_id);
      } else {
        const newFilter = {
          id: `class-${class_dtls_id}`, // use real ID to make unique
          name: class_name,
          type: "class",
        };
        setFilters((filters) => [...filters, newFilter]);
        return [...prev, class_dtls_id];
      }
    });
  };

  // Handle removing a filter
  const removeFilter = (filterId) => {
    const filterToRemove = filters.find((filter) => filter.id === filterId);

    if (filterToRemove) {
      // If removing a class filter, update the selectedClass state
      if (filterToRemove.type === "class") {
        setselectedClass(
          selectedClass.filter((c) => c !== filterToRemove.name)
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
  <>
    {openPreview && (
      <CaseStudyShowModel
        setopenPreview={setopenPreview}
        data={casestudyDetails} 
      />
    )}
    {openQuestionpage && (
      <div className="casestudyShowModel-QuestionShow-container" >
        <div className="casestudyShowModel-QuestionShow-overlay">
          <div
            onClick={() => setopenQuestionpage(false)}
            className="casestudyShowModel-QuestionShow-close-button"
          >
            <X size={24} />
          </div>
          <QuestionShow data={casestudyDetails} />
        </div>
      </div>
    )}
    <div className="case-assign-to-student-container">
      {/* <div className="ye-waala-naya-h-dusra-nevigation-indication">
        <i className="fa-solid fa-home" /> DashBoard
        <i className="fa-solid fa-chevron-right" /> case studie
        <i className="fa-solid fa-chevron-right" /> Assign Case
      </div> */}
      <div className="case-assign-to-student-dashboard">
        {/* Left Panel */}

        {caseType === 1 ? (
          <div className="case-assign-to-student-left-panel">
            <h1 className="case-assign-to-student-title">
              {casestudyDetails?.case_study_title}
            </h1>
            <div className="case-assign-to-student-tags">
              {casestudyDetails?.case_study_categories &&
                JSON.parse(casestudyDetails.case_study_categories).map(
                  (tag, index) => (
                    <span
                      key={index}
                      className="case-assign-to-student-tag case-assign-to-student-tag-business"
                    >
                      {tag}
                    </span>
                  )
                )}
            </div>
            <h2 className="case-assign-to-student-subtitle">Preview Content</h2>
            <p className="case-assign-to-student-description">
              {casestudyDetails?.case_study_content?.slice(0, 500) + "..."}
              {/* Description of the case study */}
            </p>
            <div className="case-assign-to-student-modules">
              <div className="case-assign-to-student-module">
                <p>
                  <strong>Challenge</strong>{" "}
                  {casestudyDetails?.case_study_challenge}
                </p>
              </div>
            </div>

            <button className="case-assign-to-student-view-button" onClick={() => setopenPreview(true)}>
              View Full Case Study
            </button>
          </div>
        ) : (
          <div className="case-assign-to-student-left-panel">
            <h1 className="case-assign-to-student-title">
              {casestudyDetails?.non_practywiz_case_title}
            </h1>
            <div className="case-assign-to-student-tags">
              <span className="case-assign-to-student-tag case-assign-to-student-tag-business">
                {casestudyDetails?.non_practywiz_case_category}
              </span>
            </div>
            <h2 className="case-assign-to-student-subtitle">Author</h2>
            <p className="case-assign-to-student-description">
              {casestudyDetails?.non_practywiz_case_author}{" "}
              {/* Description of the case study */}
            </p>
            {casestudyDetails?.non_practywiz_case_question && (
              <div className="Non-practywiz-case-assign-to-student-question">
                <h2 className="case-assign-to-student-subtitle">Questions</h2>
                {parseNonPractywizQuestions(
                  casestudyDetails.non_practywiz_case_question
                ).map((section, idx) => (
                  <div key={idx} style={{ marginBottom: "1em" }}>
                    <strong>
                      {section.type.charAt(0).toUpperCase() +
                        section.type.slice(1)}{" "}
                      Questions
                    </strong>
                    <ol>
                      {section.questions.map((q, qIdx) => (
                        <li key={q.id || qIdx}>
                          {/* Try to support both old and new keys */}
                          {q.question || q.Question}
                          {/* Optionally, show options if present */}
                          {q.options && Array.isArray(q.options) && (
                            <ul style={{ marginTop: "0.5em" }}>
                              {q.options.map((opt, optIdx) => (
                                <li key={optIdx}>{opt}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}

            <button
              className="case-assign-to-student-view-button"
              onClick={() => setopenQuestionpage(true)}
            >
              See all Questions
            </button>
          </div>
        )}

        {/* Right Panel */}
        <div className="case-assign-to-student-right-panel">
          <div className="case-assign-to-student-search-section">
            <div className="case-assign-to-student-search-container">
              {/* <input
                type="text"
                placeholder="Search students..."
                className="case-assign-to-student-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /> */}
              {/* <div
                className="case-assign-to-student-class-filter"
                onClick={() => setShowClassDropdown(!showClassDropdown)}
              >
                {selectedClass.length === 0
                  ? "All Classes"
                  : selectedClass.length === 1
                    ? "1 class"
                    : `${selectedClass.length} Classes`}
                <i className="fa-solid fa-chevron-down" />
                {showClassDropdown && (
                  <div className="case-assign-to-student-class-dropdown">
                    <div
                      className="case-assign-to-student-class-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        setselectedClass([]);
                        setFilters(
                          filters.filter((filter) => filter.type !== "class")
                        );
                        setShowClassDropdown(false);
                      }}
                    >
                      All Classes
                    </div>
                    {classDetails?.map((cls) => (
                      <div
                        key={cls?.class_dtls_id}
                        className="case-assign-to-student-class-option"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleClass(cls); // pass whole object
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedClass.includes(cls.class_dtls_id)}
                          onChange={() => { }} // Prevent React warning
                          onClick={(e) => e.stopPropagation()}
                        />
                        {cls?.class_name}
                      </div>
                    ))}

                  </div>
                )}


              </div> */}
              <select
                className="case-assign-to-student-class-dropdown"
                value={selectedClass}
                onChange={(e) => {
                  setselectedClass(e.target.value);
                }}
              >
                <option value="">Select Class</option>
                {classDetails?.map((cls) => (
                  <option
                    className="case-assign-to-student-class-option"
                    key={cls?.class_dtls_id}
                    value={cls?.class_dtls_id}
                  >
                    {cls?.class_name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="case-assign-to-student-active-filters">
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
            </div> */}

            {/* <button className="case-assign-to-student-add-button">
              <i className="fa-solid fa-plus" /> Add Student
            </button> */}
          </div>

          <div className="case-assign-to-student-students-table">
            <div className="case-assign-to-student-table-header">
              <div className="case-assign-to-student-checkbox-cell">
                {/* <input
                  type="checkbox"
                  checked={
                    selectedStudents.length === filteredStudents.length &&
                    filteredStudents.length > 0
                  }
                  onChange={handleSelectAll}
                /> */}
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
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  {" "}
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className="case-assign-to-student-table-row"
                      >
                        <div className="case-assign-to-student-checkbox-cell">
                          {/* <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      /> */}
                        </div>
                        <div className="case-assign-to-student-name-cell">
                          {student?.user_firstname} {student?.user_lastname}
                        </div>
                        <div className="case-assign-to-student-id-cell">
                          {student.mentee_roll_no}
                        </div>
                        <div className="case-assign-to-student-class-cell">
                          {student.class_name}
                        </div>
                        <div className="case-assign-to-student-email-cell">
                          {student.user_email}
                        </div>
                        {/* <div className="case-assign-to-student-action-cell">
                      <i
                        className="fa-solid fa-trash case-assign-to-student-delete-icon"
                        onClick={() => deleteStudent(student.id)}
                      />
                    </div> */}
                      </div>
                    ))
                  ) : (
                    <div className="case-assign-to-student-no-students">
                      No students match the current filters.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="case-assign-to-student-table-footer">
            <div className="case-assign-to-student-selection-info">
              Total students : {filteredStudents.length}{" "}
            </div>

            <button
              className="case-assign-to-student-assign-button"
              onClick={() => setOpen(true)}
            >
              Assign Case Study
            </button>

            {open && (
              <ConfigureCasePopup
                setOpen={setOpen}
                caseType={caseType}
                caseStudyId={caseStudyId}
                facultyID={facultyID}
                selectedClass={selectedClass}
              />
            )}
          </div>
        </div>
      </div>

    </div>
  </>
  );
};

export default CaseAssigneProcess;
