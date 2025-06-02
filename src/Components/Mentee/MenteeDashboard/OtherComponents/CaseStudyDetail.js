import React, { useState, useEffect } from "react";
import "../DashboardCSS/CaseStudyDetail.css";

const CaseStudyDetail = ({ caseStudy, onBackClick }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [parsedQuestions, setParsedQuestions] = useState(null);
  const [parsedCategories, setParsedCategories] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedContent, setPaginatedContent] = useState([]);
  const [isTabChanging, setIsTabChanging] = useState(false);

  const isPractyWiz = caseStudy.faculty_case_assign_owned_by_practywiz === true || caseStudy.faculty_case_assign_owned_by_practywiz === 1;

  useEffect(() => {
    // Parse case study questions if they exist and are in JSON format
    if (caseStudy) {
      if (isPractyWiz && caseStudy.case_study_questions) {
        try {
          setParsedQuestions(JSON.parse(caseStudy.case_study_questions));
        } catch (e) {
          console.error("Failed to parse case study questions:", e);
        }
      } else if (!isPractyWiz && caseStudy.non_practywiz_case_question) {
        try {
          setParsedQuestions(JSON.parse(caseStudy.non_practywiz_case_question));
        } catch (e) {
          console.error("Failed to parse non-practywiz case questions:", e);
        }
      }

      // Parse categories if they exist and are in JSON format
      if (isPractyWiz && caseStudy.case_study_categories) {
        try {
          setParsedCategories(JSON.parse(caseStudy.case_study_categories));
        } catch (e) {
          console.error("Failed to parse case study categories:", e);
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
      const paragraphs = caseStudy.case_study_content.split('\r\n').filter(p => p.trim() !== '');
      
      // Calculate how many paragraphs per page - aim for more consistent content per page
      const paragraphsPerPage = 5; // Reduced from 10 to make pages more balanced
      
      const totalContentPages = Math.ceil(paragraphs.length / paragraphsPerPage);
      
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
      const paragraphs = caseStudy.case_study_content.split('\r\n').filter(p => p.trim() !== '');
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

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  const getQuestionCount = () => {
    if (!parsedQuestions) return { fact: 0, analysis: 0, research: 0, total: 0 };
    
    if (isPractyWiz && parsedQuestions.factBased) {
      return { 
        fact: parsedQuestions.factBased.length,
        analysis: 0,
        research: 0,
        total: parsedQuestions.factBased.length
      };
    } else if (!isPractyWiz && Array.isArray(parsedQuestions)) {
      const factCount = parsedQuestions.filter(q => q.category === "fact").length;
      const analysisCount = parsedQuestions.filter(q => q.category === "analysis").length;
      const researchCount = parsedQuestions.filter(q => q.category === "research").length;
      
      return {
        fact: factCount,
        analysis: analysisCount,
        research: researchCount,
        total: parsedQuestions.length
      };
    }
    
    return { fact: 0, analysis: 0, research: 0, total: 0 };
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

  return (
    <div className="mentee-case-study-detail-container">
      <div className="mentee-case-study-detail-header">
        <button className="mentee-case-study-detail-back-button" onClick={onBackClick}>
          <i className="fa-solid fa-arrow-left"></i> Back to Case Studies
        </button>
        <div className="mentee-case-study-detail-type-badge">
          <span className={`mentee-case-study-detail-type-tag ${isPractyWiz ? "mentee-case-study-detail-practywiz" : "mentee-case-study-detail-non-practywiz"}`}>
            {isPractyWiz ? "PractyWiz" : "Non-PractyWiz"}
          </span>
        </div>
      </div>

      <div className="mentee-case-study-detail-content">
        <h1 className="mentee-case-study-detail-title">
          {isPractyWiz ? caseStudy.case_study_title : caseStudy.non_practywiz_case_title}
        </h1>

        <div className="mentee-case-study-detail-meta-info">
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Class: {caseStudy.class_name}</span>
          </div>
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-book"></i>
            <span>Subject: {caseStudy.class_subject} ({caseStudy.class_subject_code})</span>
          </div>
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-clock"></i>
            <span>Due Date: {formatDate(caseStudy.faculty_case_assign_end_date)}</span>
          </div>
          <div className="mentee-case-study-detail-meta-item">
            <i className="fa-solid fa-circle-check"></i>
            <span>Status: {caseStudy.class_status ? "Active" : "Inactive"}</span>
          </div>
        </div>

        <div className="mentee-case-study-detail-tabs">
          <button 
            className={`mentee-case-study-detail-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          {isPractyWiz && caseStudy.case_study_content && (
            <button 
              className={`mentee-case-study-detail-tab ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => handleTabChange('content')}
            >
              Case Content
            </button>
          )}
          <button 
            className={`mentee-case-study-detail-tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => handleTabChange('details')}
          >
            Assignment Details
          </button>
        </div>

        <div className={`mentee-case-study-detail-tab-content ${isTabChanging ? 'fading' : ''}`} style={{ opacity: isTabChanging ? 0 : 1 }}>
          {activeTab === 'overview' && (
            <>
              {parsedCategories && parsedCategories.length > 0 && (
                <div className="mentee-case-study-detail-categories">
                  <h3>Categories</h3>
                  <div className="mentee-case-study-detail-categories-list">
                    {parsedCategories.map((category, index) => (
                      <span key={index} className="mentee-case-study-detail-category-tag">{category}</span>
                    ))}
                  </div>
                </div>
              )}

              {!isPractyWiz && caseStudy.non_practywiz_case_category && (
                <div className="mentee-case-study-detail-categories">
                  <h3>Category</h3>
                  <div className="mentee-case-study-detail-categories-list">
                    <span className="mentee-case-study-detail-category-tag">{caseStudy.non_practywiz_case_category}</span>
                  </div>
                </div>
              )}

              {!isPractyWiz && caseStudy.non_practywiz_case_author && (
                <div className="mentee-case-study-detail-author">
                  <h3>Author</h3>
                  <p>{caseStudy.non_practywiz_case_author}</p>
                </div>
              )}

              <div className="mentee-case-study-detail-summary">
                <h3>Case Study Summary</h3>
                {isPractyWiz && caseStudy.case_study_challenge && (
                  <div className="mentee-case-study-detail-challenge">
                    <h4>Challenge</h4>
                    <p>{caseStudy.case_study_challenge}</p>
                  </div>
                )}
                
                {questionCounts.total > 0 && (
                  <div className="mentee-case-study-detail-question-summary">
                    <h4>Questions Overview</h4>
                    <div className="mentee-case-study-detail-question-stats">
                      <div className="mentee-case-study-detail-question-stat">
                        {/* <span className="mentee-case-study-detail-question-stat-number">{questionCounts.total}</span> */}
                        <span className="mentee-case-study-detail-question-stat-number">{caseStudy.faculty_case_assign_fact_question_qty + caseStudy.faculty_case_assign_analysis_question_qty}</span>
                        <span className="mentee-case-study-detail-question-stat-label">Total Questions</span>
                      </div>
                      {questionCounts.fact > 0 && (
                        <div className="mentee-case-study-detail-question-stat">
                          {/* <span className="mentee-case-study-detail-question-stat-number">{questionCounts.fact}</span> */}
                          <span className="mentee-case-study-detail-question-stat-number">{caseStudy.faculty_case_assign_fact_question_qty}</span>
                          <span className="mentee-case-study-detail-question-stat-label">Fact-based</span>
                        </div>
                      )}
                      {questionCounts.analysis > 0 && (
                        <div className="mentee-case-study-detail-question-stat">
                          {/* <span className="mentee-case-study-detail-question-stat-number">{questionCounts.analysis}</span> */}
                          <span className="mentee-case-study-detail-question-stat-number">{caseStudy.faculty_case_assign_analysis_question_qty}</span>
                          <span className="mentee-case-study-detail-question-stat-label">Analysis</span>
                        </div>
                      )}
                      {questionCounts.research > 0 && (
                        <div className="mentee-case-study-detail-question-stat">
                          {/* <span className="mentee-case-study-detail-question-stat-number">{questionCounts.research}</span>
                          <span className="mentee-case-study-detail-question-stat-label">Research</span> */}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'content' && isPractyWiz && caseStudy.case_study_content && (
            <div className="mentee-case-study-detail-case-content">
              <h3>Case Study Content</h3>
              <div className="mentee-case-study-detail-content-text">
                {paginatedContent.map((paragraph, index) => (
                  paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
                ))}
              </div>
              
              <div className="mentee-case-study-detail-pagination">
                <button 
                  className="mentee-case-study-detail-pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fa-solid fa-chevron-left"></i> Previous
                </button>
                
                <div className="mentee-case-study-detail-pagination-info">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button 
                  className="mentee-case-study-detail-pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="mentee-case-study-detail-assignment-info">
              <h3>Assignment Timeline</h3>
              <div className="mentee-case-study-detail-timeline">
                <div className="mentee-case-study-detail-timeline-item">
                  <div className="mentee-case-study-detail-timeline-icon">
                    <i className="fa-solid fa-calendar-plus"></i>
                  </div>
                  <div className="mentee-case-study-detail-timeline-content">
                    <h4>Assignment Start</h4>
                    <p>{formatDate(caseStudy.faculty_case_assign_start_date)}</p>
                  </div>
                </div>
                <div className="mentee-case-study-detail-timeline-item">
                  <div className="mentee-case-study-detail-timeline-icon">
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <div className="mentee-case-study-detail-timeline-content">
                    <h4>Assignment End</h4>
                    <p>{formatDate(caseStudy.faculty_case_assign_end_date)}</p>
                  </div>
                </div>
                <div className="mentee-case-study-detail-timeline-item">
                  <div className="mentee-case-study-detail-timeline-icon">
                    <i className="fa-solid fa-school"></i>
                  </div>
                  <div className="mentee-case-study-detail-timeline-content">
                    <h4>Class Start</h4>
                    <p>{formatDate(caseStudy.faculty_case_assign_class_start_date)}</p>
                  </div>
                </div>
                <div className="mentee-case-study-detail-timeline-item">
                  <div className="mentee-case-study-detail-timeline-icon">
                    <i className="fa-solid fa-flag-checkered"></i>
                  </div>
                  <div className="mentee-case-study-detail-timeline-content">
                    <h4>Class End</h4>
                    <p>{formatDate(caseStudy.faculty_case_assign_class_end_date)}</p>
                  </div>
                </div>
              </div>

              <h3>Time Allocation</h3>
              <div className="mentee-case-study-detail-time-allocation">
                {caseStudy.faculty_case_assign_fact_question_time !== null && (
                  <div className="mentee-case-study-detail-time-item">
                    <i className="fa-solid fa-stopwatch"></i>
                    <span>Fact Questions: {getTimeAllocationLabel(caseStudy.faculty_case_assign_fact_question_time)}</span>
                  </div>
                )}
                {caseStudy.faculty_case_assign_analysis_question_time !== null && (
                  <div className="mentee-case-study-detail-time-item">
                    <i className="fa-solid fa-stopwatch"></i>
                    <span>Analysis Questions: {getTimeAllocationLabel(caseStudy.faculty_case_assign_analysis_question_time)}</span>
                  </div>
                )}
                {caseStudy.faculty_case_assign_fact_question_time === null && caseStudy.faculty_case_assign_analysis_question_time === null && (
                  <div className="mentee-case-study-detail-time-item">
                    <i className="fa-solid fa-stopwatch"></i>
                    <span>No specific time allocation set for questions</span>
                  </div>
                )}
              </div>

              <h3>Question Distribution</h3>
              <div className="mentee-case-study-detail-question-distribution">
                {caseStudy.faculty_case_assign_fact_question_qty && (
                  <div className="mentee-case-study-detail-distribution-item">
                    <i className="fa-solid fa-list-ol"></i>
                    <span>Fact Questions: {caseStudy.faculty_case_assign_fact_question_qty}</span>
                  </div>
                )}
                {caseStudy.faculty_case_assign_analysis_question_qty && (
                  <div className="mentee-case-study-detail-distribution-item">
                    <i className="fa-solid fa-list-ol"></i>
                    <span>Analysis Questions: {caseStudy.faculty_case_assign_analysis_question_qty}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mentee-case-study-detail-actions">
          <button className="mentee-case-study-detail-run-avega-button">Run Avega</button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;