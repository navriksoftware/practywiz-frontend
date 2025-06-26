import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../DashboardCSS/CaseStudyDetail.css";
import {
  determineQuestionStatus,
  getStatusLabel,
  getStatusBadgeClass,
  getStatusIcon,
} from "./questionStatusUtils.js";
import { ApiURL } from "../../../../Utils/ApiURL";

const CaseStudyDetail = ({ caseStudy, onBackClick }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [parsedQuestions, setParsedQuestions] = useState(null);
  const [parsedCategories, setParsedCategories] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedContent, setPaginatedContent] = useState([]);
  const [isTabChanging, setIsTabChanging] = useState(false);
  const [questionStatus, setQuestionStatus] = useState({
    factBasedQuestions: "unavailable",
    analysisBasedQuestions: "unavailable",
    researchBasedQuestions: "unavailable",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [serverCurrentTime, setServerCurrentTime] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get mentee ID from Redux store
  const menteeId = useSelector(
    (state) => state.mentee.singleMentee[0]?.mentee_dtls_id
  );
  const url = ApiURL();

  const isPractyWiz =
    caseStudy.faculty_case_assign_owned_by_practywiz === true ||
    caseStudy.faculty_case_assign_owned_by_practywiz === 1;

  // Fetch submission data when component mounts
  useEffect(() => {
    if (!menteeId || !caseStudy.faculty_case_assign_dtls_id) return;

    fetchSubmissionData(); // This will run once on mount
    const interval = setInterval(() => {
      fetchSubmissionData(); // Auto refresh every 30 sec
      
    }, 30000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [menteeId, caseStudy.faculty_case_assign_dtls_id]);

  // Update question status when parsedQuestions or submission data changes
  useEffect(() => {
    if (parsedQuestions && submissionStatus !== null && serverCurrentTime) {
      updateQuestionStatus();
    }
    // eslint-disable-next-line
  }, [parsedQuestions, submissionStatus, serverCurrentTime]);

  // Fetch result submission status from API
  const fetchSubmissionData = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    // else setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}api/v1/mentee/dashboard/get-result-submission-status`,
        {
          menteeId: menteeId,
          facultyCaseAssignId: caseStudy.faculty_case_assign_dtls_id,
        }
      );

      if (response.data.success) {
        const defaultSubmissionStatus = {
          factBasedQuestions: false,
          analysisBasedQuestions: false,
          researchBasedQuestions: false,
        };

        setSubmissionStatus(
          response.data.submissionStatus || defaultSubmissionStatus
        );
        setServerCurrentTime(response.data.currentTime);
      } else {
        setSubmissionStatus({
          factBasedQuestions: false,
          analysisBasedQuestions: false,
          researchBasedQuestions: false,
        });
        setServerCurrentTime(new Date().toISOString());
      }
    } catch (error) {
      setSubmissionStatus({
        factBasedQuestions: false,
        analysisBasedQuestions: false,
        researchBasedQuestions: false,
      });
      setServerCurrentTime(new Date().toISOString());
    } finally {
      if (isManualRefresh) setIsRefreshing(false);
      else setIsLoading(false);
    }
  };

  // Update question status based on current data
  const updateQuestionStatus = () => {
    if (!parsedQuestions || !submissionStatus || !serverCurrentTime) return;

    const status = determineQuestionStatus(
      caseStudy,
      submissionStatus,
      serverCurrentTime,
      parsedQuestions
    );

    // console.log("Updated Question Status:", status);
    setQuestionStatus(status);
  };

  // Check if fact-based or analysis-based questions are available (excluding research-based)
  const isFactOrAnalysisQuestionAvailable = () => {
    return (
      questionStatus.factBasedQuestions === "available" ||
      questionStatus.analysisBasedQuestions === "available"
    );
  };

  // Handle Run Avega button click
  const handleRunAvega = () => {
    // console.log("=== Run Avega Button Clicked ===");
    // console.log("Current Question Status:", questionStatus);

    const maxMarksCount = getMaxMarksCount();
    // Log individual question statuses (only fact and analysis)
    // console.log(`factBasedQuestions: ${questionStatus.factBasedQuestions}`);
    // console.log(`analysisBasedQuestions: ${questionStatus.analysisBasedQuestions}`);

    // Check if any fact-based or analysis-based question is available
    const anyAvailable = isFactOrAnalysisQuestionAvailable();
    // console.log("Any Fact/Analysis Question Available:", anyAvailable);

    if (anyAvailable) {
      // console.log("Proceeding with Avega...");
      // Navigate to Avega page with question status and case study ID
      navigate("/mentee/avega", {
        state: {
          questionStatus: questionStatus,
          facultyCaseAssignId: caseStudy.faculty_case_assign_dtls_id,
          caseStudyData: caseStudy,
          maxMarksSummary: maxMarksCount,
        },
      });
    } else {
      // console.log("No fact-based or analysis-based questions available for Avega");
    }
  };

  useEffect(() => {
    // Parse case study questions if they exist and are in JSON format
    if (caseStudy) {
      if (isPractyWiz && caseStudy.case_study_questions) {
        try {
          const parsed = JSON.parse(caseStudy.case_study_questions);
          setParsedQuestions(parsed);
          // console.log("Parsed PractyWiz Questions:", parsed);
        } catch (e) {
          // console.error("Failed to parse case study questions:", e);
          setParsedQuestions(null);
        }
      } else if (!isPractyWiz && caseStudy.non_practywiz_case_question) {
        try {
          const parsed = JSON.parse(caseStudy.non_practywiz_case_question);
          setParsedQuestions(parsed);
          // console.log("Parsed Non-PractyWiz Questions:", parsed);
        } catch (e) {
          // console.error("Failed to parse non-practywiz case questions:", e);
          setParsedQuestions(null);
        }
      }

      // Parse categories if they exist and are in JSON format
      if (isPractyWiz && caseStudy.case_study_categories) {
        try {
          setParsedCategories(JSON.parse(caseStudy.case_study_categories));
        } catch (e) {
          // console.error("Failed to parse case study categories:", e);
        }
      }

      // Set default active tab to overview
      setActiveTab("overview");
    }
  }, [caseStudy, isPractyWiz]);

  // Paginate content when case study content changes
  useEffect(() => {
    if (isPractyWiz && caseStudy.case_study_content) {
      // Split by paragraphs and filter out empty ones
      const paragraphs = caseStudy.case_study_content
        .split("\r\n")
        .filter((p) => p.trim() !== "");

      // Calculate how many paragraphs per page - aim for more consistent content per page
      const paragraphsPerPage = 5; // Reduced from 10 to make pages more balanced

      const totalContentPages = Math.ceil(
        paragraphs.length / paragraphsPerPage
      );

      setTotalPages(totalContentPages);
      paginateContent(paragraphs, 1, paragraphsPerPage);
    }
  }, [caseStudy.case_study_content, isPractyWiz]);

  const paginateContent = (paragraphs, page, paragraphsPerPage) => {
    const startIndex = (page - 1) * paragraphsPerPage;
    const endIndex = startIndex + paragraphsPerPage;
    const currentPageContent = paragraphs.slice(startIndex, endIndex);
    setPaginatedContent(currentPageContent);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Split by paragraphs and filter out empty ones for consistency
      const paragraphs = caseStudy.case_study_content
        .split("\r\n")
        .filter((p) => p.trim() !== "");
      const paragraphsPerPage = 5; // Should match the value in useEffect
      paginateContent(paragraphs, newPage, paragraphsPerPage);
    }
  };

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setIsTabChanging(true);
      // Short delay to allow fade out before changing tab content
      setTimeout(() => {
        setActiveTab(tab);
        setIsTabChanging(false);
      }, 150);
    }
  };

  // Updated formatDate function to display times in UTC
  const formatDate = (isoDateStr) => {
    if (!isoDateStr) return "N/A";
    try {
      const date = new Date(isoDateStr);

      // Format date part using UTC methods
      const day = date.getUTCDate().toString().padStart(2, "0");
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const year = date.getUTCFullYear();

      // Format time part with AM/PM using UTC methods
      let hours = date.getUTCHours();
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      const formattedHours = hours.toString().padStart(2, "0");

      return `${day}-${month}-${year} ${formattedHours}:${minutes} ${ampm}`;
    } catch (error) {
      return "Invalid Date/Time";
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getQuestionCount = () => {
    if (!parsedQuestions)
      return { fact: 0, analysis: 0, research: 0, total: 0 };

    if (isPractyWiz) {
      // For PractyWiz cases
      const factCount = Array.isArray(parsedQuestions.factBasedQuestions)
        ? parsedQuestions.factBasedQuestions.length
        : 0;
      const analysisCount = Array.isArray(
        parsedQuestions.analysisBasedQuestions
      )
        ? parsedQuestions.analysisBasedQuestions.length
        : 0;
      const researchCount = Array.isArray(
        parsedQuestions.researchBasedQuestions
      )
        ? parsedQuestions.researchBasedQuestions.length
        : 0;

      return {
        fact: factCount,
        analysis: analysisCount,
        research: researchCount,
        total: factCount + analysisCount + researchCount,
      };
    } else {
      // For Non-PractyWiz cases
      const factCount = Array.isArray(parsedQuestions.factBasedQuestions)
        ? parsedQuestions.factBasedQuestions.length
        : 0;
      const analysisCount = Array.isArray(
        parsedQuestions.analysisBasedQuestions
      )
        ? parsedQuestions.analysisBasedQuestions.length
        : 0;
      const researchCount = Array.isArray(
        parsedQuestions.researchBasedQuestions
      )
        ? parsedQuestions.researchBasedQuestions.length
        : 0;

      return {
        fact: factCount,
        analysis: analysisCount,
        research: researchCount,
        total: factCount + analysisCount + researchCount,
      };
    }
  };

  // Get time allocation label
  const getTimeAllocationLabel = (value) => {
    switch (value) {
      case 0:
        return "Before Class";
      case 1:
        return "In Class";
      case 2:
        return "After Class";
      default:
        return "Not Specified";
    }
  };

  const questionCounts = getQuestionCount();

  const getMaxMarksCount = () => {
    if (
      !parsedQuestions ||
      typeof parsedQuestions !== "object" ||
      !parsedQuestions.factBasedQuestions ||
      !parsedQuestions.analysisBasedQuestions
    ) {
      return { fact: 0, analysis: 0, total: 0 };
    }

    const factMarks = parsedQuestions.factBasedQuestions.reduce(
      (sum, q) => sum + (Number(q.maxMark) || 0),
      0
    );

    const analysisMarks = parsedQuestions.analysisBasedQuestions.reduce(
      (sum, q) => sum + (Number(q.maxMark) || 0),
      0
    );

    return {
      fact: factMarks,
      analysis: analysisMarks,
      total: factMarks + analysisMarks,
    };
  };

  // Determine if any fact-based or analysis-based question type is available for Run Avega button
  const anyQuestionAvailable = isFactOrAnalysisQuestionAvailable();

  return (
    <div className="mentee-case-study-detail-container">
      <div className="mentee-case-study-detail-header">
        <button
          className="mentee-case-study-detail-back-button"
          onClick={onBackClick}
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Case Studies
        </button>
        <div className="mentee-case-study-detail-type-badge">
          <span
            className={`mentee-case-study-detail-type-tag ${
              isPractyWiz
                ? "mentee-case-study-detail-practywiz"
                : "mentee-case-study-detail-non-practywiz"
            }`}
          >
            {isPractyWiz ? "PractyWiz" : "Non-PractyWiz"}
          </span>
        </div>
      </div>

      <div className="mentee-case-study-detail-content">
        <h1 className="mentee-case-study-detail-title">
          {isPractyWiz
            ? caseStudy.case_study_title
            : caseStudy.non_practywiz_case_title}
        </h1>

        <div className="mentee-case-study-detail-refreash-container">
          {/* Optionally, show last updated time */}
          {serverCurrentTime && (
            <span style={{ fontSize: 12, color: "#666" }}>
              Last updated: {new Date().toLocaleString()}
            </span>
          )}
          <button
            onClick={() => fetchSubmissionData(true)}
            disabled={isRefreshing}
            style={{
              cursor: isRefreshing ? "not-allowed" : "pointer",
            }}
          >
            <i
              className={`fas fa-sync-alt ${isRefreshing ? "fa-spin" : ""}`}
            ></i>
            {/* {isRefreshing ? "Refreshing..." : "Refresh Status"} */}
          </button>
        </div>

        <div className="mentee-case-study-detail-meta-info">
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Class: {caseStudy.class_name}</span>
          </div>
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-book"></i>
            <span>
              Subject: {caseStudy.class_subject} ({caseStudy.class_subject_code}
              )
            </span>
          </div>
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-calendar-check"></i>
            <span>
              Due Date: {formatDate(caseStudy.faculty_case_assign_end_date)}
            </span>
          </div>
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-circle-check"></i>
            <span>
              Status:{" "}
              {caseStudy.faculty_case_assign_is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="mentee-case-study-detail-tabs">
          <button
            className={`mentee-case-study-detail-tab ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </button>
          {isPractyWiz && (
            <button
              className={`mentee-case-study-detail-tab ${
                activeTab === "content" ? "active" : ""
              }`}
              onClick={() => handleTabChange("content")}
            >
              Case Content
            </button>
          )}
          <button
            className={`mentee-case-study-detail-tab ${
              activeTab === "assignment" ? "active" : ""
            }`}
            onClick={() => handleTabChange("assignment")}
          >
            Assignment Details
          </button>
        </div>

        <div
          className={`mentee-case-study-detail-tab-content ${
            isTabChanging ? "fade-out" : "fade-in"
          }`}
        >
          {activeTab === "overview" && (
            <div className="mentee-case-study-detail-overview">
              <div className="mentee-case-study-detail-section">
                <h3 className="mentee-case-study-detail-section-title">
                  Case Study Summary
                </h3>
                <p className="mentee-case-study-detail-summary">
                  {isPractyWiz
                    ? caseStudy.case_study_summary
                    : caseStudy.non_practywiz_case_summary}
                </p>
              </div>

              {isPractyWiz && parsedCategories.length > 0 && (
                <div className="mentee-case-study-detail-section">
                  <h3 className="mentee-case-study-detail-section-title">
                    Categories
                  </h3>
                  <div className="mentee-case-study-detail-categories">
                    {parsedCategories.map((category, index) => (
                      <span
                        key={index}
                        className="mentee-case-study-detail-category-tag"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mentee-case-study-detail-section">
                <h3 className="mentee-case-study-detail-section-title">
                  Question Statistics
                </h3>
                <div className="mentee-case-study-detail-stats">
                  <div className="mentee-case-study-detail-stat-item">
                    <span className="mentee-case-study-detail-stat-label">
                      Total Questions:
                    </span>
                    <span className="mentee-case-study-detail-stat-value">
                      {questionCounts.total}
                    </span>
                  </div>
                  {questionCounts.fact > 0 && (
                    <div className="mentee-case-study-detail-stat-item">
                      <span className="mentee-case-study-detail-stat-label">
                        Fact-based Questions:
                      </span>
                      <span className="mentee-case-study-detail-stat-value">
                        {questionCounts.fact}
                      </span>
                    </div>
                  )}
                  {questionCounts.analysis > 0 && (
                    <div className="mentee-case-study-detail-stat-item">
                      <span className="mentee-case-study-detail-stat-label">
                        Analysis-based Questions:
                      </span>
                      <span className="mentee-case-study-detail-stat-value">
                        {questionCounts.analysis}
                      </span>
                    </div>
                  )}
                  {questionCounts.research > 0 && (
                    <div className="mentee-case-study-detail-stat-item">
                      <span className="mentee-case-study-detail-stat-label">
                        Research-based Questions:
                      </span>
                      <span className="mentee-case-study-detail-stat-value">
                        {questionCounts.research}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Question Cards Section - Only show Fact and Analysis based questions */}
              {isLoading ? (
                <div className="mentee-case-study-loading">
                  <div className="mentee-case-study-loading-spinner"></div>
                  <p>Checking question status...</p>
                </div>
              ) : (
                <div className="mentee-case-study-detail-section">
                  <h3 className="mentee-case-study-detail-section-title">
                    Question Sets
                  </h3>
                  <div className="mentee-case-study-question-cards">
                    {/* Fact-based Questions Card */}
                    {questionCounts.fact > 0 && (
                      <div
                        className={`mentee-case-study-question-card ${getStatusBadgeClass(
                          questionStatus.factBasedQuestions
                        )}`}
                      >
                        <div className="mentee-case-study-question-card-header">
                          <h4>Fact-based Questions</h4>
                          <span
                            className={`mentee-case-study-question-status ${getStatusBadgeClass(
                              questionStatus.factBasedQuestions
                            )}`}
                          >
                            {getStatusIcon(questionStatus.factBasedQuestions)}{" "}
                            {getStatusLabel(questionStatus.factBasedQuestions)}
                          </span>
                        </div>
                        <div className="mentee-case-study-question-card-body">
                          <p>Number of questions: {questionCounts.fact}</p>
                          <p>
                            Time allocation:{" "}
                            {getTimeAllocationLabel(
                              caseStudy.faculty_case_assign_fact_question_time
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Analysis-based Questions Card */}
                    {questionCounts.analysis > 0 && (
                      <div
                        className={`mentee-case-study-question-card ${getStatusBadgeClass(
                          questionStatus.analysisBasedQuestions
                        )}`}
                      >
                        <div className="mentee-case-study-question-card-header">
                          <h4>Analysis-based Questions</h4>
                          <span
                            className={`mentee-case-study-question-status ${getStatusBadgeClass(
                              questionStatus.analysisBasedQuestions
                            )}`}
                          >
                            {getStatusIcon(
                              questionStatus.analysisBasedQuestions
                            )}{" "}
                            {getStatusLabel(
                              questionStatus.analysisBasedQuestions
                            )}
                          </span>
                        </div>
                        <div className="mentee-case-study-question-card-body">
                          <p>Number of questions: {questionCounts.analysis}</p>
                          <p>
                            Time allocation:{" "}
                            {getTimeAllocationLabel(
                              caseStudy.faculty_case_assign_analysis_question_time
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Run Avega Button Section */}
              <div className="mentee-case-study-detail-section">
                <div className="mentee-case-study-run-avega-section">
                  <button
                    className={`mentee-case-study-run-avega-btn ${
                      anyQuestionAvailable ? "enabled" : "disabled"
                    }`}
                    onClick={handleRunAvega}
                    disabled={!anyQuestionAvailable}
                  >
                    <i className="fa-solid fa-play"></i>
                    Run Avega
                  </button>
                  {!anyQuestionAvailable && (
                    <p className="mentee-case-study-run-avega-note">
                      No fact-based or analysis-based questions are currently
                      available to attempt.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && isPractyWiz && (
            <div className="mentee-case-study-detail-content-tab">
              <div className="mentee-case-study-detail-section">
                <h3 className="mentee-case-study-detail-section-title">
                  Case Study Content
                </h3>
                <div className="mentee-case-study-detail-content-body">
                  {paginatedContent.map((paragraph, index) => (
                    <p
                      key={index}
                      className="mentee-case-study-detail-paragraph"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mentee-case-study-detail-pagination">
                    <button
                      className="mentee-case-study-detail-pagination-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="fa-solid fa-chevron-left"></i> Previous
                    </button>
                    <span className="mentee-case-study-detail-pagination-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="mentee-case-study-detail-pagination-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "assignment" && (
            <div className="mentee-case-study-detail-assignment">
              <div className="mentee-case-study-detail-section">
                <h3 className="mentee-case-study-detail-section-title">
                  Assignment Timeline
                </h3>
                <div className="mentee-case-study-detail-timeline">
                  <div className="mentee-case-study-detail-timeline-item">
                    <i className="fa-solid fa-calendar-plus"></i>
                    <div>
                      <strong>Assignment Start:</strong>
                      <span>
                        {formatDate(caseStudy.faculty_case_assign_start_date)}
                      </span>
                    </div>
                  </div>
                  <div className="mentee-case-study-detail-timeline-item">
                    <i className="fa-solid fa-chalkboard-teacher"></i>
                    <div>
                      <strong>Class Start:</strong>
                      <span>
                        {formatDate(
                          caseStudy.faculty_case_assign_class_start_date
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mentee-case-study-detail-timeline-item">
                    <i className="fa-solid fa-chalkboard"></i>
                    <div>
                      <strong>Class End:</strong>
                      <span>
                        {formatDate(
                          caseStudy.faculty_case_assign_class_end_date
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mentee-case-study-detail-timeline-item">
                    <i className="fa-solid fa-calendar-times"></i>
                    <div>
                      <strong>Assignment End:</strong>
                      <span>
                        {formatDate(caseStudy.faculty_case_assign_end_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
