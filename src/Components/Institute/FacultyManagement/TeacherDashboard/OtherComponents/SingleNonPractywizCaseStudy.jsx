import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SingleNonPractywizCaseStudy.css';
import { ApiURL } from '../../../../../Utils/ApiURL';
import NavBar from '../FacultyNavbar';

const SingleNonPractywizCaseStudy = () => {
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get case study ID from URL params
  const navigate = useNavigate();

  const url = ApiURL();
  
  // Default case study ID if not provided in URL
  const caseStudyId = id || 6;

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${url}api/v1/faculty/case-study/get-single-non-practywiz-case`,
          { caseStudyId: parseInt(caseStudyId) }
        );
        
        if (response.data && response.data.success) {
          setCaseStudy(response.data.success);
        } else {
          setError('Failed to fetch case study data');
        }
      } catch (err) {
        console.error('Error fetching case study:', err);
        setError(err.message || 'An error occurred while fetching the case study');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [caseStudyId]);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to render questions based on their format
  const renderQuestion = (question, index) => {
    return (
        <div className="npcs-question-card" key={question.id}>
        <div className="npcs-question-header">
          <h5>Question {index + 1}</h5>
          <div className="npcs-badge-container">
            <span className="npcs-badge npcs-badge-primary">{question.category}</span>
            <span className="npcs-badge npcs-badge-secondary">{question.question_format}</span>
          </div>
        </div>
        <div className="npcs-question-body">
          <h3 className="npcs-question-title">{question.question}</h3>
          
          {question.question_format === 'multiple-choice' && (
            <div className="npcs-options-container">
              {question.options.map((option, optIndex) => (
                <div 
                  key={optIndex} 
                  className={`npcs-option-item ${option === question.answer ? 'npcs-correct-answer' : ''}`}
                >
                  {option}
                  {option === question.answer && <span className="npcs-check-mark">✓</span>}
                </div>
              ))}
            </div>
          )}
          
          {question.question_format === 'subjective' && (
            <div className="npcs-subjective-answer">
              <h6>Answer:</h6>
              <p className="npcs-answer-text">
                {question.answer.split('\\n\\n').map((paragraph, i) => (
                  <React.Fragment key={i}>
                    {paragraph}
                    <br /><br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          )}
          
          <div className="npcs-marks-container">
            <span className="npcs-badge npcs-badge-info">Marks: {question.marks}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="npcs-container npcs-loading-container">
        <div className="npcs-spinner"></div>
        <p>Loading case study...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="npcs-container">
        <div className="npcs-alert npcs-alert-danger">
          <h4>Error</h4>
          <p>{error}</p>
          <hr />
          <div className="npcs-alert-actions">
            <button 
              className="npcs-btn npcs-btn-outline-danger" 
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="npcs-container">
        <div className="npcs-alert npcs-alert-warning">
          <h4>Case Study Not Found</h4>
          <p>The requested case study could not be found.</p>
          <hr />
          <div className="npcs-alert-actions">
            <button 
              className="npcs-btn npcs-btn-outline-warning" 
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <NavBar />
    <div className="npcs-container npcs-case-study-container">
      <div className="npcs-case-study-header">
        <div className="npcs-header-content">
          <div className="npcs-title-section">
            <h2 className="npcs-case-title">{caseStudy.non_practywiz_case_title}</h2>
            <p className="npcs-case-author">By {caseStudy.non_practywiz_case_author}</p>
          </div>
          <span className="npcs-category-badge">
            {caseStudy.non_practywiz_case_category}
          </span>
        </div>
        
        {/* <div className="npcs-case-meta">
          <div className="npcs-meta-item">
            <p><strong>Created:</strong> {formatDate(caseStudy.non_practywiz_case_cr_date)}</p>
          </div>
          <div className="npcs-meta-item">
            <p><strong>Last Updated:</strong> {formatDate(caseStudy.non_practywiz_case_update_date)}</p>
          </div>
        </div> */}
      </div>

      <h3 className="npcs-questions-section-title">Case Study Questions</h3>
      
      <div className="npcs-questions-container">
        {caseStudy.non_practywiz_case_question && 
         Array.isArray(caseStudy.non_practywiz_case_question) && 
         caseStudy.non_practywiz_case_question.length > 0 ? (
          caseStudy.non_practywiz_case_question.map((question, index) => 
            renderQuestion(question, index)
          )
        ) : (
          <div className="npcs-alert npcs-alert-info">No questions available for this case study.</div>
        )}
      </div>
      
      <div className="npcs-navigation-buttons">
        <button 
          className="npcs-btn npcs-btn-back" 
          onClick={() => navigate(-1)}
        >
          Back to Case Studies
        </button>
      </div>
    </div>
    </>
  );
};

export default SingleNonPractywizCaseStudy;