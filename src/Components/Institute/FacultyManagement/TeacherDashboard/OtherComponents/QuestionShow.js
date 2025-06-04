import React, { useState } from 'react';
import { FileText, Award, ChevronDown, ChevronUp, BookOpen, CheckCircle, List } from 'lucide-react';
import '../DashboardCSS/QuestionShow.css'; // Adjust the path as necessary
import { json } from 'react-router-dom';

const QuestionShow = ({data}) => {
  const questions = JSON.parse(data.non_practywiz_case_question);
  // const questions = [
  //   {
  //     id: "q1",
  //     category: "fact",
  //     question: "What is the primary goal of a for-profit business?",
  //     question_format: "multiple-choice",
  //     options: ["To serve the community", "To maximize employee satisfaction", "To increase shareholder wealth", "To reduce competition"],
  //     answer: "To increase shareholder wealth",
  //     marks: 1
  //   },
  //   {
  //     id: "q2",
  //     category: "fact",
  //     question: "Which of the following is a characteristic of a sole proprietorship?",
  //     question_format: "multiple-choice",
  //     options: ["Shared liability", "Corporate taxation", "Limited liability", "Owned and operated by one individual"],
  //     answer: "Owned and operated by one individual",
  //     marks: 1
  //   },
  //   {
  //     id: "q3",
  //     category: "fact",
  //     question: "What is a SWOT analysis used for in business strategy?",
  //     question_format: "multiple-choice",
  //     options: ["Evaluating financial statements", "Developing product pricing", "Identifying strengths, weaknesses, opportunities, and threats", "Calculating profit margins"],
  //     answer: "Identifying strengths, weaknesses, opportunities, and threats",
  //     marks: 1
  //   },
  //   {
  //     id: "q4",
  //     category: "fact",
  //     question: "Which business function is primarily responsible for acquiring and retaining customers?",
  //     question_format: "multiple-choice",
  //     options: ["Human Resources", "Operations", "Marketing", "Finance"],
  //     answer: "Marketing",
  //     marks: 1
  //   },
  //   {
  //     id: "q5",
  //     category: "analysis",
  //     question: "Why is understanding your target market crucial for business success?",
  //     question_format: "subjective",
  //     answer: "Understanding the target market helps businesses tailor their products, services, and marketing strategies to meet specific customer needs. It enables better customer satisfaction, increases sales, reduces marketing waste, and helps the business gain a competitive advantage.",
  //     marks: 5
  //   },
  //   {
  //     id: "q6",
  //     category: "analysis",
  //     question: "How does effective leadership impact organizational performance?",
  //     question_format: "subjective",
  //     answer: "Effective leadership boosts employee morale, ensures clear communication, aligns team efforts with business goals, and fosters innovation. It directly affects productivity, reduces employee turnover, and drives the overall success of the organization.",
  //     marks: 5
  //   },
  //   {
  //     id: "q7",
  //     category: "analysis",
  //     question: "What are the advantages and disadvantages of expanding a business internationally?",
  //     question_format: "subjective",
  //     answer: "Advantages:\n\nAccess to new markets\n\nDiversification of revenue streams\n\nEconomies of scale\n\nDisadvantages:\n\nCultural and language barriers\n\nPolitical and economic risks\n\nHigher operational complexity",
  //     marks: 5
  //   },
  //   {
  //     id: "q8",
  //     category: "analysis",
  //     question: "How does digital transformation affect modern businesses?",
  //     question_format: "subjective",
  //     answer: "Digital transformation improves efficiency, enhances customer experience, and opens up new revenue opportunities. However, it also demands continuous adaptation, significant investment in technology, and upskilling of the workforce.",
  //     marks: 5
  //   },
  //   {
  //     id: "q9",
  //     category: "research",
  //     question: "Why is financial planning important in business decision-making?",
  //     question_format: "subjective",
  //     answer: "Financial planning helps allocate resources effectively, forecast revenue and expenses, manage risks, and ensure long-term sustainability. It aids in informed decision-making by providing data-driven insights into the financial health of the business.",
  //     marks: 5
  //   },
  //   {
  //     id: "q10",
  //     category: "research",
  //     question: "Hello",
  //     question_format: "multiple-choice",
  //     options: ["hi", "bye", "go", "no"],
  //     answer: "hi",
  //     marks: 5
  //   }
  // ];

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

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const multipleChoiceCount = questions.filter(q => q.question_format === 'multiple-choice').length;
  const subjectiveCount = questions.filter(q => q.question_format === 'subjective').length;

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
                <h1 className="question-show-title">{data.non_practywiz_case_title}</h1>
                <p className="question-show-subtitle">{data.non_practywiz_case_author}</p>
              </div>
            </div>
            <div className="question-show-header-stats">
              <div className="question-show-stat-item">
                <span className="question-show-stat-number">{questions.length}</span> Questions
              </div>
              <div className="question-show-stat-item">
                <Award className="question-show-stat-icon" />
                <span className="question-show-stat-number">{totalMarks}</span> Total Marks
              </div>
            </div>
          </div>
        </div>

        {/* Question Type Summary */}
        {/* <div className="question-show-summary-grid">
          <div className="question-show-summary-card">
            <div className="question-show-summary-number">{questions.length}</div>
            <div className="question-show-summary-label">Total Questions</div>
          </div>
          <div className="question-show-summary-card">
            <div className="question-show-summary-number question-show-summary-orange">{multipleChoiceCount}</div>
            <div className="question-show-summary-label">Multiple Choice</div>
          </div>
          <div className="question-show-summary-card">
            <div className="question-show-summary-number question-show-summary-indigo">{subjectiveCount}</div>
            <div className="question-show-summary-label">Subjective</div>
          </div>
          <div className="question-show-summary-card">
            <div className="question-show-summary-number question-show-summary-purple">{totalMarks}</div>
            <div className="question-show-summary-label">Total Marks</div>
          </div>
        </div> */}

        {/* Questions List */}
        <div className="question-show-questions-list">
          {questions.map((q, index) => {
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
                          Question{questionNumber}
                        </span>
                        <span className={`question-show-category-badge ${getCategoryColor(q.category)}`}>
                          {q.category.charAt(0).toUpperCase() + q.category.slice(1)}
                        </span>
                        <span className={`question-show-format-badge ${getFormatColor(q.question_format)}`}>
                          {getFormatIcon(q.question_format)}
                          {q.question_format.replace('-', ' ')}
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

        {/* Summary Footer */}
        {/* <div className="question-show-footer">
          <div className="question-show-footer-content">
            <h3 className="question-show-footer-title">Quiz Summary</h3>
            <div className="question-show-footer-grid">
              <div className="question-show-footer-card question-show-footer-fact">
                <div className="question-show-footer-number">{questions.filter(q => q.category === 'fact').length}</div>
                <div className="question-show-footer-label">Fact Questions</div>
              </div>
              <div className="question-show-footer-card question-show-footer-analysis">
                <div className="question-show-footer-number">{questions.filter(q => q.category === 'analysis').length}</div>
                <div className="question-show-footer-label">Analysis Questions</div>
              </div>
              <div className="question-show-footer-card question-show-footer-research">
                <div className="question-show-footer-number">{questions.filter(q => q.category === 'research').length}</div>
                <div className="question-show-footer-label">Research Questions</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div></>
  
  );
};

export default QuestionShow;