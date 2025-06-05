import React, { useState } from 'react';
import { FileText, Award, ChevronDown, ChevronUp, BookOpen, CheckCircle, List } from 'lucide-react';
import '../DashboardCSS/QuestionShow.css'; // Adjust the path as necessary

const QuestionShow = ({ data }) => {
  const questions = JSON.parse(data.non_practywiz_case_question);
  
  // Combine all question types into a single array with proper formatting
  const allQuestions = [
    ...questions.factBasedQuestions.map(q => ({
      id: q.id,
      category: 'fact',
      question: q.Question,
      question_format: q.questionType,
      options: q.options || [],
      answer: q.correctAnswer,
      marks: q.maxMark
    })),
    ...questions.analysisBasedQuestions.map(q => ({
      id: q.id,
      category: 'analysis',
      question: q.Question,
      question_format: q.questionType,
      options: q.options || [],
      answer: q.correctAnswer,
      marks: q.maxMark
    })),
    ...(questions.researchBasedQuestions || []).map(q => ({
      id: q.id,
      category: 'research',
      question: q.Question,
      question_format: q.questionType,
      options: q.options || [],
      answer: q.correctAnswer,
      marks: q.maxMark
    }))
  ];

  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleExpand = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'fact':
        return 'question-show-category-fact';
      case 'analysis':
        return 'question-show-category-analysis';
      case 'research':
        return 'question-show-category-research';
      default:
        return 'question-show-category-default';
    }
  };

  const getFormatIcon = (format) => {
    return format === 'multiple-choice' ? <List className="question-show-icon" /> : <FileText className="question-show-icon" />;
  };

  const getFormatColor = (format) => {
    return format === 'multiple-choice' 
      ? 'question-show-format-multiple-choice'
      : 'question-show-format-subjective';
  };

  const totalMarks = allQuestions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <>  
    <div className="question-show-container">
      <div className="question-show-wrapper">
        {/* Header */}
        <div className="question-show-header">
          <div className="question-show-header-content">
            <div className="question-show-header-left">
              <BookOpen className="question-show-header-icon" />
              <div>
                <h1 className="question-show-title">
                  {data.non_practywiz_case_title || 'Case Study Questions'}
                </h1>
                <p className="question-show-subtitle">
                  {data.non_practywiz_case_author || 'Question Bank'}
                </p>
              </div>
            </div>
            <div className="question-show-header-stats">
              <div className="question-show-stat-item">
                <span className="question-show-stat-number">{allQuestions.length}</span> Questions
              </div>
              <div className="question-show-stat-item">
                <Award className="question-show-stat-icon" />
                <span className="question-show-stat-number">{totalMarks}</span> Total Marks
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="question-show-questions-list">
          {allQuestions.map((q, index) => {
            const isExpanded = expandedQuestions[q.id];
            const questionNumber = index + 1;
            
            return (
              <div key={q.id} className="question-show-question-card">
                {/* Question Header */}
                <div className="question-show-question-header">
                  <div className="question-show-question-header-content">
                    <div className="question-show-question-main">
                      <div className="question-show-question-badges">
                        <span className="question-show-question-number">
                          Question {questionNumber}
                        </span>
                        <span className={`question-show-category-badge ${getCategoryColor(q.category)}`}>
                          {q.category.charAt(0).toUpperCase() + q.category.slice(1)}
                        </span>
                        <span className={`question-show-format-badge ${getFormatColor(q.question_format)}`}>
                          {getFormatIcon(q.question_format)}
                          {q.question_format === 'multiple-choice' ? 'Multiple Choice' : 'Subjective'}
                        </span>
                      </div>
                      <h2 className="question-show-question-text">
                        {q.question}
                      </h2>
                    </div>
                    <div className="question-show-question-controls">
                      <div className="question-show-marks-badge">
                        <Award className="question-show-marks-icon" />
                        <span className="question-show-marks-text">{q.marks} mark{q.marks > 1 ? 's' : ''}</span>
                      </div>
                      <button
                        onClick={() => toggleExpand(q.id)}
                        className="question-show-toggle-button"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="question-show-chevron-icon" />
                            <span className="question-show-toggle-text">Hide</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="question-show-chevron-icon" />
                            <span className="question-show-toggle-text">Show</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Answer Section */}
                {isExpanded && (
                  <div className="question-show-answer-section">
                    {q.question_format === 'multiple-choice' ? (
                      <div>
                        <h3 className="question-show-answer-title">
                          <List className="question-show-answer-icon" />
                          Options & Correct Answer
                        </h3>
                        <div className="question-show-options-list">
                          {q.options.map((option, optIndex) => (
                            <div 
                              key={optIndex} 
                              className={`question-show-option ${
                                option.trim() === q.answer.trim() 
                                  ? 'question-show-option-correct' 
                                  : 'question-show-option-normal'
                              }`}
                            >
                              <span className="question-show-option-letter">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className="question-show-option-text">{option.trim()}</span>
                              {option.trim() === q.answer.trim() && (
                                <CheckCircle className="question-show-check-icon" />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="question-show-correct-answer">
                          <div className="question-show-correct-answer-content">
                            <CheckCircle className="question-show-correct-icon" />
                            <span className="question-show-correct-text">Correct Answer: {q.answer}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="question-show-subjective-answer">
                        <div className="question-show-subjective-icon">
                          <FileText className="question-show-file-icon" />
                        </div>
                        <div className="question-show-subjective-content">
                          <h3 className="question-show-subjective-title">Sample Answer</h3>
                          <div className="question-show-subjective-text">
                            <p className="question-show-answer-content">
                              {q.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default QuestionShow;