import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import '../DashboardCSS/SingleStudentAssessmentPage1.css';

const SingleStudentAssessment = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data based on your response structure
  const sampleData = {
    case_study_category: '["Team Collaboration", "Problem Solving", "Knowledge Sharing"]',
    case_study_title: "Building a Collaborative Production Problem Database",
    class_name: "sgsgsgsv",
    class_subject: "adfafa",
    class_subject_code: "4232",
    faculty_case_assign_analysis_question_qty: 11,
    faculty_case_assign_end_date: "2025-05-31T10:55:00.000Z",
    faculty_case_assign_fact_question_qty: 10,
    faculty_case_assign_start_date: "2025-05-23T10:55:00.000Z",
    mentee_result_analysis_details: '{"performance":"Overall performance is good. Strong in fundamentals, needs improvement in practical application examples.","questions":[{"qId":"Q1","question":"What is the capital of France?","answer":"Paris","maxMark":5,"obtainedMark":"5","feedback":"Correct and well explained.","areaToImprove":"None","strength":"Strong general knowledge"},{"qId":"Q2","question":"Explain Newton\'s second law of motion.","answer":"Force equals mass times acceleration.","maxMark":10,"obtainedMark":"10","feedback":"Good answer, but could use more real-life examples.","areaToImprove":"Add real-life applications.","strength":"Clear conceptual understanding"}]}',
    mentee_result_cr_date: "2025-05-26T04:13:25.623Z",
    mentee_result_fact_details: '[{"qId":"FQ1","question":"What is the capital of India?","answer":"Delhi","maxMark":1,"obtainedMark":"1","feedback":"Correct","areaToImprove":"None","strength":"Strong factual recall"},{"qId":"FQ2","question":"Chemical symbol of Water?","answer":"H2O","maxMark":1,"obtainedMark":"0","feedback":"Incorrect answer provided.","areaToImprove":"Revise basic chemistry symbols","strength":"Needs improvement"}]',
    mentee_result_max_score: 17,
    mentee_result_total_score: 17,
    mentee_result_update_date: "2025-05-29T07:42:31.717Z",
    mentee_roll_no: "1765",
    user_firstname: "Priya",
    user_lastname: ""
  };

  useEffect(() => {
    setTimeout(() => {
      setData(sampleData);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="single-student-assessment-page-loading">
        <div className="single-student-assessment-page-spinner"></div>
      </div>
    );
  }

  if (!data) return null;

  const parseJSONField = (field) => {
    try {
      return JSON.parse(field);
    } catch (e) {
      return field;
    }
  };

  const categories = parseJSONField(data.case_study_category);
  const analysisDetails = parseJSONField(data.mentee_result_analysis_details);
  const factDetails = parseJSONField(data.mentee_result_fact_details);
  
  const factQuestionsCorrect = factDetails.filter(q => q.obtainedMark === q.maxMark).length;
  const analysisQuestionsCorrect = analysisDetails.questions.filter(q => parseInt(q.obtainedMark) === q.maxMark).length;
  
  const factPercentage = Math.round((factQuestionsCorrect / factDetails.length) * 100);
  const analysisPercentage = Math.round((analysisQuestionsCorrect / analysisDetails.questions.length) * 100);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const CircularProgress = ({ percentage, correctAnswers, totalQuestions, label, color }) => {
    const radius = 45;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="single-student-assessment-page-circular-progress">
        <svg width="100" height="100" className="single-student-assessment-page-progress-svg">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="single-student-assessment-page-progress-circle"
          />
        </svg>
        <div className="single-student-assessment-page-progress-label">
          <span className="single-student-assessment-page-progress-percentage">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="single-student-assessment-page-container">
      {/* Header */}
      <div className="single-student-assessment-page-header">
        <div className="single-student-assessment-page-header-left">
          <h1 className="single-student-assessment-page-title">Case Study Review</h1>
        </div>
        <div className="single-student-assessment-page-header-right">
          <div className="single-student-assessment-page-status">
            <div className="single-student-assessment-page-status-badge">
              <div className="single-student-assessment-page-status-dot"></div>
              Submitted
            </div>
            <div className="single-student-assessment-page-last-updated">
              Last updated: {formatDate(data.mentee_result_update_date)}
            </div>
          </div>
          {/* <div className="single-student-assessment-page-performance-summary">
            Overall performance is good. Strong in fundamentals, needs improvement in practical application examples.
          </div> */}
        </div>
      </div>

      <div className="single-student-assessment-page-content">
        {/* Left Sidebar */}
        <div className="single-student-assessment-page-sidebar">
          {/* Performance Breakdown */}
          <div className="single-student-assessment-page-performance-card">
            <h3 className="single-student-assessment-page-section-title">Performance Breakdown</h3>
            
            <div className="single-student-assessment-page-main-score">
              <div className="single-student-assessment-page-score-display">
                <span className="single-student-assessment-page-score-number">{data.mentee_result_total_score}/{data.mentee_result_max_score}</span>
                <span className="single-student-assessment-page-score-label">Submitted</span>
                <div className="single-student-assessment-page-score-date">
                  Last updated: {formatDate(data.mentee_result_update_date)}
                </div>
              </div>
              
              <div className="single-student-assessment-page-donut-chart">
                <CircularProgress 
                  percentage={factPercentage} 
                  correctAnswers={factQuestionsCorrect}
                  totalQuestions={factDetails.length}
                  label="Fact Questions"
                  color="#10b981"
                />
                <div className="single-student-assessment-page-chart-legend">
                  <div className="single-student-assessment-page-legend-item">
                    <div className="single-student-assessment-page-legend-color" style={{backgroundColor: '#10b981'}}></div>
                    <span>Fact Questions: {factPercentage}%</span>
                  </div>
                  <div className="single-student-assessment-page-legend-item">
                    <div className="single-student-assessment-page-legend-color" style={{backgroundColor: '#3b82f6'}}></div>
                    <span>Analysis Questions: {analysisPercentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="single-student-assessment-page-student-info">
            <h3 className="single-student-assessment-page-section-title">Student Information</h3>
            
            <div className="single-student-assessment-page-info-item">
              <span className="single-student-assessment-page-info-label">Student Name</span>
              <span className="single-student-assessment-page-info-value">{data.user_firstname}</span>
            </div>
            
            <div className="single-student-assessment-page-info-item">
              <span className="single-student-assessment-page-info-label">Roll Number</span>
              <span className="single-student-assessment-page-info-value">{data.mentee_roll_no}</span>
            </div>
            
            <div className="single-student-assessment-page-info-item">
              <span className="single-student-assessment-page-info-label">Class Name</span>
              <span className="single-student-assessment-page-info-value">{data.class_name}</span>
            </div>
            
            <div className="single-student-assessment-page-info-item">
              <span className="single-student-assessment-page-info-label">Class Subject Code</span>
              <span className="single-student-assessment-page-info-value">{data.class_subject_code}</span>
            </div>
          </div>

          {/* Case Study Details */}
          <div className="single-student-assessment-page-case-details">
            <h3 className="single-student-assessment-page-section-title">Case Study Details</h3>
            
            <div className="single-student-assessment-page-case-info">
              <div className="single-student-assessment-page-case-title-section">
                <span className="single-student-assessment-page-case-label">Case Study Title</span>
                <span className="single-student-assessment-page-case-value">{data.case_study_title}</span>
              </div>
              
              <div className="single-student-assessment-page-categories">
                <span className="single-student-assessment-page-case-label">Categories</span>
                <div className="single-student-assessment-page-category-tags">
                  {categories.map((category, index) => (
                    <span key={index} className="single-student-assessment-page-category-tag">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="single-student-assessment-page-review-dates">
                <span className="single-student-assessment-page-case-label">Review Dates</span>
                <span className="single-student-assessment-page-case-value">
                  {formatDate(data.faculty_case_assign_start_date)} - {formatDate(data.faculty_case_assign_end_date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="single-student-assessment-page-main">
          {/* Fact Questions */}
          <div className="single-student-assessment-page-questions-section">
            <div className="single-student-assessment-page-questions-header">
              <h3 className="single-student-assessment-page-questions-title">
                Fact Questions ({factQuestionsCorrect}/{factDetails.length})
              </h3>
            </div>
            
            {factDetails.map((question, index) => (
              <div key={question.qId} className="single-student-assessment-page-question-card">
                <div className="single-student-assessment-page-question-header">
                  <div className="single-student-assessment-page-question-info">
                    <h4 className="single-student-assessment-page-question-title">Question {index + 1}</h4>
                    <p className="single-student-assessment-page-question-text">{question.question}</p>
                  </div>
                  <div className="single-student-assessment-page-question-score">{question.obtainedMark}/{question.maxMark}</div>
                </div>
                
                <div className="single-student-assessment-page-answer-section">
                  <div className="single-student-assessment-page-answer">{question.answer}</div>
                </div>
                
                <div className="single-student-assessment-page-feedback-section">
                  <div className={`single-student-assessment-page-feedback-status ${
                    parseInt(question.obtainedMark) === question.maxMark ? 'correct' : 'incorrect'
                  }`}>
                    {parseInt(question.obtainedMark) === question.maxMark ? (
                      <><CheckCircle className="single-student-assessment-page-status-icon" /> {question.feedback}</>
                    ) : (
                      <><AlertTriangle className="single-student-assessment-page-status-icon" /> {question.feedback}</>
                    )}
                  </div>
                  
                  <div className="single-student-assessment-page-feedback-details">
                    <div className="single-student-assessment-page-strengths">
                      <div className="single-student-assessment-page-feedback-label">
                        <TrendingUp className="single-student-assessment-page-feedback-icon" />
                        Strengths
                      </div>
                      <div className="single-student-assessment-page-feedback-text">{question.strength}</div>
                    </div>
                    
                    <div className="single-student-assessment-page-improvements">
                      <div className="single-student-assessment-page-feedback-label">
                        <AlertTriangle className="single-student-assessment-page-feedback-icon" />
                        Areas to Improve
                      </div>
                      <div className="single-student-assessment-page-feedback-text">{question.areaToImprove}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analysis Questions */}
          <div className="single-student-assessment-page-questions-section">
            <div className="single-student-assessment-page-questions-header">
              <h3 className="single-student-assessment-page-questions-title">
                Analysis Questions ({analysisQuestionsCorrect}/{analysisDetails.questions.length})
              </h3>
            </div>
            
            {analysisDetails.questions.map((question, index) => (
              <div key={question.qId} className="single-student-assessment-page-question-card">
                <div className="single-student-assessment-page-question-header">
                  <div className="single-student-assessment-page-question-info">
                    <h4 className="single-student-assessment-page-question-title">Question {index + 1} analysis base</h4>
                    <p className="single-student-assessment-page-question-text">{question.question}</p>
                  </div>
                  <div className="single-student-assessment-page-question-score">{question.obtainedMark}/{question.maxMark}</div>
                </div>
                
                <div className="single-student-assessment-page-answer-section">
                  <div className="single-student-assessment-page-answer">{question.answer}</div>
                </div>
                
                <div className="single-student-assessment-page-feedback-section">
                  <div className={`single-student-assessment-page-feedback-status ${
                    parseInt(question.obtainedMark) === question.maxMark ? 'correct' : 'needs-improvement'
                  }`}>
                    {parseInt(question.obtainedMark) === question.maxMark ? (
                      <><CheckCircle className="single-student-assessment-page-status-icon" /> {question.feedback}</>
                    ) : (
                      <><AlertTriangle className="single-student-assessment-page-status-icon" /> {question.feedback}</>
                    )}
                  </div>
                  
                  <div className="single-student-assessment-page-feedback-details">
                    <div className="single-student-assessment-page-strengths">
                      <div className="single-student-assessment-page-feedback-label">
                        <TrendingUp className="single-student-assessment-page-feedback-icon" />
                        Strengths
                      </div>
                      <div className="single-student-assessment-page-feedback-text">{question.strength}</div>
                    </div>
                    
                    <div className="single-student-assessment-page-improvements">
                      <div className="single-student-assessment-page-feedback-label">
                        <AlertTriangle className="single-student-assessment-page-feedback-icon" />
                        Areas to Improve
                      </div>
                      <div className="single-student-assessment-page-feedback-text">{question.areaToImprove}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Performance */}
          <div className="single-student-assessment-page-overall-section">
            <h3 className="single-student-assessment-page-section-title">Overall Performance</h3>
            <p className="single-student-assessment-page-overall-text">
              {analysisDetails.performance}
            </p>
            <div className="single-student-assessment-page-total-score">
              <span className="single-student-assessment-page-total-label">Total Score</span>
              <span className="single-student-assessment-page-total-value">
                {data.mentee_result_total_score}/{data.mentee_result_max_score}
              </span>
            </div>
            <button className="single-student-assessment-page-update-btn">Update Scores</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStudentAssessment;