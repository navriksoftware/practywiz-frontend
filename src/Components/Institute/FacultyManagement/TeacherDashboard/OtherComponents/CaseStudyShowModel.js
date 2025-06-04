import React, { useState } from 'react';
import { X, Users, Target, Share2, BookOpen, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import "../DashboardCSS/CaseStudyShowModel.css"; // Adjust the path as necessary
const CaseStudyShowModel = ({setopenPreview}) => {
  
  const [activeTab, setActiveTab] = useState('overview');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Case study data
  const caseStudyData = {
    categories: ["Team Collaboration", "Problem Solving", "Knowledge Sharing"],
    title: "Building a Collaborative Production Problem Database",
    lesson: "The value of knowledge sharing and transparency in improving team collaboration and problem-solving efficiency.",
    futureSkills: "Collaboration tools, knowledge management, process improvement.",
    numCharacters: 5,
    roles: {
      role1: "Team Members",
      role2: "Production Team Leader",
      role3: "Technical Support",
      role4: "Quality Assurance",
      role5: "Project Manager"
    },
    mainCharacterRole: "Production Team Leader",
    challenge: "Overcoming initial resistance to transparency and building a collaborative knowledge-sharing culture.",
    content: "To address recurring issues in production, the team implemented a shared text file repository. Team members documented problems they encountered, which initially met with hesitation due to transparency concerns.\n\nOver time, the repository became a valuable resource, enabling team members to quickly reference past issues and solutions. This process not only resolved issues faster but also reduced the need for late-night calls.\n\nAs collaboration improved, team members grew more supportive of one another, strengthening team bonds and fostering a positive work culture.",
    questions: {
      factBased: [
        {
          question: "What issue was the shared repository meant to address?",
          options: ["Recurring production problems", "Employee satisfaction", "Late delivery timelines", "Customer complaints"],
          correctAnswer: "Recurring production problems"
        },
        {
          question: "What was the initial reaction to the repository?",
          options: ["Excitement", "Hesitation", "Support", "Indifference"],
          correctAnswer: "Hesitation"
        },
        {
          question: "What benefit did the repository provide over time?",
          options: ["Reduced hiring costs", "Faster issue resolution", "Improved marketing strategies", "Enhanced security measures"],
          correctAnswer: "Faster issue resolution"
        },
        {
          question: "What effect did collaboration have on the work culture?",
          options: ["It worsened bonds", "It had no effect", "It strengthened team bonds", "It caused more conflicts"],
          correctAnswer: "It strengthened team bonds"
        },
        {
          question: "What did the repository reduce the need for?",
          options: ["Late-night calls", "Team lunches", "Weekly meetings", "Budget increases"],
          correctAnswer: "Late-night calls"
        }
      ]
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const getScore = () => {
    let correct = 0;
    caseStudyData.questions.factBased.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: caseStudyData.questions.factBased.length };
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`CaseStudyShowModel-tab-button ${isActive ? 'active' : ''}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="CaseStudyShowModel-case-study-container">
        <div className="CaseStudyShowModel-modal-overlay" onClick={() => setopenPreview(false)}>
          <div className="CaseStudyShowModel-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="CaseStudyShowModel-modal-header">
              <div className="CaseStudyShowModel-header-content">
                <div className="CaseStudyShowModel-categories">
                  {caseStudyData.categories.map((category, index) => (
                    <span key={index} className="CaseStudyShowModel-category-tag">
                      {category}
                    </span>
                  ))}
                </div>
                <h1 className="CaseStudyShowModel-modal-title">{caseStudyData.title}</h1>
                <p className="CaseStudyShowModel-lesson-summary">{caseStudyData.lesson}</p>
              </div>
              <button
                onClick={() => setopenPreview(false)}
                className="CaseStudyShowModel-close-button"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="CaseStudyShowModel-tab-navigation">
              <TabButton
                id="overview"
                label="Overview"
                icon={BookOpen}
                isActive={activeTab === 'overview'}
                onClick={setActiveTab}
              />
              <TabButton
                id="details"
                label="Details"
                icon={Target}
                isActive={activeTab === 'details'}
                onClick={setActiveTab}
              />
              {/* <TabButton
                id="quiz"
                label="Quiz"
                icon={Users}
                isActive={activeTab === 'quiz'}
                onClick={setActiveTab}
              /> */}
            </div>

            {/* Tab Content */}
            <div className="CaseStudyShowModel-tab-content">
              {activeTab === 'overview' && (
                <div className="CaseStudyShowModel-overview-content">
                  <div className="CaseStudyShowModel-content-section">
                    <h3>Case Study Content</h3>
                    <div className="CaseStudyShowModel-story-content">
                      {caseStudyData.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                
                </div>
              )}

              {activeTab === 'details' && (
                <div className="CaseStudyShowModel-details-content">
                      <div className="CaseStudyShowModel-key-info-grid">
                    <div className="CaseStudyShowModel-info-card">
                      <Share2 className="CaseStudyShowModel-info-icon" />
                      <h4>Main Challenge</h4>
                      <p>{caseStudyData.challenge}</p>
                    </div>
                    <div className="CaseStudyShowModel-info-card">
                      <Target className="CaseStudyShowModel-info-icon" />
                      <h4>Future Skills</h4>
                      <p>{caseStudyData.futureSkills}</p>
                    </div>
                  </div>
                  <div className="CaseStudyShowModel-roles-section">
                    <h3>Characters & Roles</h3>
                    <div className="CaseStudyShowModel-roles-grid">
                      {Object.entries(caseStudyData.roles).map(([key, role]) => (
                        <div
                          key={key}
                          className={`CaseStudyShowModel-role-card ${role === caseStudyData.mainCharacterRole ? 'main-character' : ''}`}
                        >
                          <Users size={20} />
                          <span>{role}</span>
                          {role === caseStudyData.mainCharacterRole && (
                            <span className="CaseStudyShowModel-main-badge">Main</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div className="CaseStudyShowModel-stats-section">
                    <h3>Case Study Statistics</h3>
                    <div className="CaseStudyShowModel-stats-grid">
                      <div className="CaseStudyShowModel-stat-item">
                        <span className="CaseStudyShowModel-stat-number">{caseStudyData.numCharacters}</span>
                        <span className="CaseStudyShowModel-stat-label">Characters</span>
                      </div>
                      <div className="CaseStudyShowModel-stat-item">
                        <span className="CaseStudyShowModel-stat-number">{caseStudyData.categories.length}</span>
                        <span className="CaseStudyShowModel-stat-label">Categories</span>
                      </div>
                      <div className="CaseStudyShowModel-stat-item">
                        <span className="CaseStudyShowModel-stat-number">{caseStudyData.questions.factBased.length}</span>
                        <span className="CaseStudyShowModel-stat-label">Questions</span>
                      </div>
                    </div>
                  </div> */}

                  
                </div>
              )}

              {/* {activeTab === 'quiz' && (
                <div className="CaseStudyShowModel-quiz-content">
                  {!showResults ? (
                    <>
                      <div className="CaseStudyShowModel-quiz-header">
                        <h3>Knowledge Check</h3>
                        <div className="CaseStudyShowModel-quiz-progress">
                          <span>Question {currentQuestion + 1} of {caseStudyData.questions.factBased.length}</span>
                          <div className="CaseStudyShowModel-progress-bar">
                            <div
                              className="CaseStudyShowModel-progress-fill"
                              style={{
                                width: `${((currentQuestion + 1) / caseStudyData.questions.factBased.length) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="CaseStudyShowModel-question-container">
                        <h4>{caseStudyData.questions.factBased[currentQuestion].question}</h4>
                        <div className="CaseStudyShowModel-options-grid">
                          {caseStudyData.questions.factBased[currentQuestion].options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(currentQuestion, option)}
                              className={`CaseStudyShowModeloption-button ${
                                selectedAnswers[currentQuestion] === option ? 'selected' : ''
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="CaseStudyShowModel-quiz-navigation">
                        <button
                          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                          disabled={currentQuestion === 0}
                          className="CaseStudyShowModel-nav-button secondary"
                        >
                          Previous
                        </button>
                        
                        {currentQuestion < caseStudyData.questions.factBased.length - 1 ? (
                          <button
                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                            disabled={!selectedAnswers[currentQuestion]}
                            className="CaseStudyShowModel-nav-button primary"
                          >
                            Next <ChevronRight size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmitQuiz}
                            disabled={Object.keys(selectedAnswers).length < caseStudyData.questions.factBased.length}
                            className="CaseStudyShowModel-nav-button primary"
                          >
                            Submit Quiz
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="CaseStudyShowModel-quiz-results">
                      <div className="CaseStudyShowModel-results-header">
                        <h3>Quiz Results</h3>
                        <div className="CaseStudyShowModel-score-display">
                          <span className="CaseStudyShowModel-score-text">
                            {getScore().correct} out of {getScore().total} correct
                          </span>
                          <span className="CaseStudyShowModel-score-percentage">
                            {Math.round((getScore().correct / getScore().total) * 100)}%
                          </span>
                        </div>
                      </div>

                      <div className="CaseStudyShowModel-results-breakdown">
                        {caseStudyData.questions.factBased.map((q, index) => (
                          <div key={index} className="CaseStudyShowModel-result-item">
                            <div className="CaseStudyShowModel-result-status">
                              {selectedAnswers[index] === q.correctAnswer ? (
                                <CheckCircle className="CaseStudyShowModel-correct-icon" size={20} />
                              ) : (
                                <XCircle className="CaseStudyShowModel-incorrect-icon" size={20} />
                              )}
                            </div>
                            <div className="CaseStudyShowModel-result-content">
                              <p className="CaseStudyShowModel-result-question">{q.question}</p>
                              <p className="CaseStudyShowModel-result-answer">
                                Your answer: <span className={selectedAnswers[index] === q.correctAnswer ? 'correct' : 'incorrect'}>
                                  {selectedAnswers[index]}
                                </span>
                              </p>
                              {selectedAnswers[index] !== q.correctAnswer && (
                                <p className="CaseStudyShowModel-correct-answer">
                                  Correct answer: <span className="CaseStudyShowModel-correct">{q.correctAnswer}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setShowResults(false);
                          setCurrentQuestion(0);
                          setSelectedAnswers({});
                        }}
                        className="CaseStudyShowModel-nav-button primary"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </div>
        </div>
    </div>
  );
};

export default CaseStudyShowModel;