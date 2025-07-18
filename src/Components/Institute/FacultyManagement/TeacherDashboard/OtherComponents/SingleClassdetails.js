import React, { useState, useEffect } from "react";
import "../DashboardCSS/SingleClassdetails.css";
import { toast } from "react-toastify";
import AddSingleStudent from "./AddSingleStudent.js";
import AddBulkStudents from "./AddBulkStudents.js";
import axios from "axios";
import { ApiURL } from "../../../../../Utils/ApiURL.js";
import { useDispatch } from "react-redux";
const SingleClassdetails = ({ setActivePage, clickedClassId }) => {
  const dispatch = useDispatch();
  const url = ApiURL();
  const [SignleClassDetails, setSignleClassDetails] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [CaseStudiesList, setCaseStudiesList] = useState([]);

  const fetchStudentlistOfClass = async () => {
    try {
      const response = await Promise.race([
        axios.post(`${url}api/v1/faculty/class/studentlist`, {
          classId: clickedClassId,
        }),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
        ),
      ]);
      if (response.data.success) {
        setStudentsList(response.data.success);
      } else if (response.data.error) {
        setStudentsList([]);
      }
    } catch (error) {
      setStudentsList([]);
      if (error.message === "Request timed out") {
        console.log("Request timed out. Please try again.");
      } else {
        console.log("An error occurred. Please try again.");
      }
    } finally {
      console.log("Request completed");
    }
  };
  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/class/singledetail`, {
            singleClassId: clickedClassId,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setSignleClassDetails(response.data.success);
        } else if (response.data.error) {
          setSignleClassDetails([]);
        }
      } catch (error) {
        setSignleClassDetails([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        console.log("Request completed");
      }
    };
    const fetchCaseStudiesListOfClass = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/class/CaseStudiesList`, {
            classId: clickedClassId,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);
        if (response.data.success) {
          setCaseStudiesList(response.data.success);
        } else if (response.data.error) {
          setCaseStudiesList([]);
        }
      } catch (error) {
        setCaseStudiesList([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        console.log("Request completed");
      }
    };

    fetchStudentlistOfClass();
    fetchClassDetails();
    fetchCaseStudiesListOfClass();
  }, [url, clickedClassId]);

  // const [activeCases, setActiveCases] = useState([
  //   {
  //     id: 1,
  //     title: "Global Supply Chain Analysis",
  //     dueDate: "Oct 15",
  //     submitted: "18/28",
  //   },
  //   {
  //     id: 2,
  //     title: "Market Entry Strategy",
  //     dueDate: "Oct 20",
  //     submitted: "12/28",
  //   },
  //   {
  //     id: 3,
  //     title: "Corporate Sustainability",
  //     dueDate: "Oct 25",
  //     submitted: "8/28",
  //   },
  // ]);

  // const [pastCases, setPastCases] = useState([
  //   {
  //     id: 1,
  //     title: "Business Ethics Case",
  //     date: "Sep 30, 2023",
  //     average: "88%",
  //   },
  //   {
  //     id: 2,
  //     title: "Financial Analysis",
  //     date: "Sep 15, 2023",
  //     average: "85%",
  //   },
  // ]);
  // console.log("SignleClassDetails", CaseStudiesList);
  // TODO: Create an endpoint for removing student from class
  // const handleRemoveStudent = (studentId) => {
  // };

  const [showAddSingleform, setshowAddSingleform] = useState(false);
  const [showAddBulkStudent, setshowAddBulkStudent] = useState(false);

  const handleAddSingleStudent = () => {
    setshowAddSingleform(true);
  };
  const handleAddBulkStudents = () => {
    setshowAddBulkStudent(true);
  };

  const formatDate = (isoDateStr) => {
    if (!isoDateStr) return "N/A";
    try {
      const date = new Date(isoDateStr);
      const iso = date.toISOString().split("T")[0]; // "2025-05-24"
      const [year, month, day] = iso.split("-");
      return `${day}-${month}-${year}`;
    } catch (error) {
      return "Invalid Date";
    }
  };

  const [activeCases, setActiveCases] = useState([]);
  const [pastCases, setPastCases] = useState([]);

  useEffect(() => {
    if (!Array.isArray(CaseStudiesList) || CaseStudiesList.length === 0) {
      setActiveCases([]);
      setPastCases([]);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const active = [];
    const past = [];

    CaseStudiesList.forEach((caseItem) => {
      const dueDate = new Date(caseItem.faculty_case_assign_end_date);
      dueDate.setHours(0, 0, 0, 0);

      if (dueDate >= today) {
        active.push(caseItem);
      } else {
        past.push({
          id: caseItem.id,
          title: caseItem.faculty_case_assign_owned_by_practywiz
            ? caseItem.case_study_title
            : caseItem.non_practywiz_case_title,
          date: formatDate(caseItem.faculty_case_assign_end_date),
          average: caseItem.class_average || "N/A",
        });
      }
    });

    setActiveCases(active);
    setPastCases(past);
  }, [CaseStudiesList]);

  const handleRemove = async (student) => {
    const classMappingId = student?.class_mentee_mapping_id;

    if (!classMappingId) {
      toast.error("Invalid student data. Cannot remove student.");
      return;
    }

    const confirmRemove = window.confirm(
      `Are you sure you want to remove ${student?.user_firstname} ${student?.user_lastname} from the class?`
    );

    if (!confirmRemove) return;

    try {
      const response = await axios.post(
        `${url}api/v1/faculty/class/remove-student`,
        { classMappingId }
      );

      if (response?.data?.success) {
        toast.success(
          `${student?.user_firstname} ${student?.user_lastname} removed from the class successfully.`
        );
        fetchStudentlistOfClass(); // Refresh the student list after removal
      } else {
        toast.error(
          response?.data?.message ||
            "Failed to remove the student. Please try again."
        );
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "An error occurred while removing the student. Please try again.";
      toast.error(message);
    }
  };

  const handleMoreOptions = (student) => {
    console.log("More options for:", student);
    // Open modal or menu
  };

  return (
    <div className="single-class-details-container">
      {showAddSingleform && (
        <AddSingleStudent
          setshowAddSingleform={setshowAddSingleform}
          clickedClassId={clickedClassId}
          fetchStudentlistOfClass={fetchStudentlistOfClass}
        />
      )}
      {showAddBulkStudent && (
        <AddBulkStudents
          setshowAddBulkStudent={setshowAddBulkStudent}
          clickedClassId={clickedClassId}
          fetchStudentlistOfClass={fetchStudentlistOfClass}
        />
      )}

      <div className="single-class-details">
        <main className="main-content">
          <div className="class-header">
            <div className="class-info">
              <h1>{SignleClassDetails[0]?.class_name}</h1>
              <div className="class-details">
                {/* <span className="instructor">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Dr. Sarah Mitchell
                </span> */}

                <span className="room">
                  {SignleClassDetails[0]?.class_subject}
                </span>
                <span className="term">
                  {SignleClassDetails[0]?.class_subject_code}
                </span>
                <span className="schedule">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {formatDate(SignleClassDetails[0]?.class_sem_end_date)}
                </span>
              </div>
            </div>
            <div className="action-buttons">
              <button
                className="assigned-case"
                onClick={() => setActivePage("store")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                ASSIGN CASE
              </button>
            </div>
          </div>

          <div className="content-container">
            <div className="students-section">
              <div className="section-header">
                <h2>Students</h2>
                <div className="student-actions">
                  <button
                    className="add-student"
                    onClick={handleAddSingleStudent}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    Add Student
                  </button>
                  <button
                    className="import-students"
                    onClick={handleAddBulkStudents}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Import Students
                  </button>
                </div>
              </div>
              <div className="students-table">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>STUDENT ID</th>
                      {/* <th>Status</th> */}
                      <th>ACTION</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsList.length > 0 ? (
                      studentsList.map((student) => (
                        <tr key={student.mentee_user_dtls_id}>
                          <td>{`${student.user_firstname} ${student.user_lastname}`}</td>
                          <td>{student.mentee_roll_no}</td>
                          {/* <td>
              <span className="status-active">
                {student.status}
              </span>
            </td> */}
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemove(student)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              Remove
                            </button>
                          </td>
                          <td>
                            <button
                              className="more-options"
                              onClick={() => handleMoreOptions(student)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          style={{ textAlign: "center", padding: "1rem" }}
                        >
                          No students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Mobile Cards View */}
              <div className="students-cards-container mobile-view">
                {studentsList.length > 0 ? (
                  studentsList.map((student) => (
                    <div
                      key={student.mentee_user_dtls_id}
                      className="student-card"
                    >
                      <div className="student-card-header">
                        <div className="student-info">
                          <h3 className="student-name">
                            {`${student.user_firstname} ${student.user_lastname}`.trim()}
                          </h3>
                          <p className="student-id">
                            ID: {student.mentee_roll_no}
                          </p>
                        </div>
                        <button
                          className="remove-btn-mobile"
                          onClick={() => handleRemove(student)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          Remove
                        </button>
                        <button
                          className="more-options-mobile"
                          onClick={() => handleMoreOptions(student)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                      <div className="student-card-actions"></div>
                    </div>
                  ))
                ) : (
                  <div className="no-students-message">
                    <p>No students found.</p>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>

            <div className="case-studies-section">
              <div className="active-cases">
                <h2>Active Case Studies</h2>
                <div className="cases-list">
                  {activeCases.length > 0 ? (
                    activeCases.map((caseItem) => (
                      <div className="case-item" key={caseItem.id}>
                        {caseItem.faculty_case_assign_owned_by_practywiz ? (
                          <>
                            <div className="case-header">
                              <h3>{caseItem.case_study_title}</h3>
                              <div className="submission-count">PractyWiz</div>
                            </div>
                            <div className="case-due-date">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              Due{" "}
                              {formatDate(
                                caseItem.faculty_case_assign_end_date
                              )}
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress"
                                // style={{
                                //   width: `${(parseInt(caseItem.submitted.split("/")[0]) /
                                //     parseInt(caseItem.submitted.split("/")[1])) *
                                //     100
                                //     }%`,
                                // }}
                              ></div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="case-header">
                              <h3>{caseItem.non_practywiz_case_title}</h3>
                              <div className="submission-count">
                                Non-PractyWiz
                              </div>
                            </div>
                            <div className="case-due-date">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              Due{" "}
                              {formatDate(
                                caseItem.faculty_case_assign_end_date
                              )}
                            </div>
                            <div className="progress-bar">
                              <div
                                className="progress"
                                // style={{
                                //   width: `${(parseInt(caseItem.submitted.split("/")[0]) /
                                //       parseInt(caseItem.submitted.split("/")[1])) *
                                //     100
                                //     }%`,
                                // }}
                              ></div>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No active case studies available.</p>
                  )}
                </div>
              </div>

              <div className="past-cases">
                <h2>Past Case Studies</h2>
                <div className="cases-list">
                  {pastCases.length > 0 ? (
                    pastCases.map((caseItem) => (
                      <div className="past-case-item" key={caseItem.id}>
                        <div className="past-case-info">
                          <h3>{caseItem.title}</h3>
                          <div className="case-date">{caseItem.date}</div>
                          {/* <div className="class-average">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          Class Average: {caseItem.average}
                        </div> */}
                        </div>
                        {/* <div className="download-case">
                        <button className="download-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </button>
                      </div> */}
                      </div>
                    ))
                  ) : (
                    <p>No past case studies available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SingleClassdetails;
