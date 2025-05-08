import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../../Components/Navbar/Navbar";
import { menteeData } from "./menteeData";
import "./ResultPage.css";

const DemoResultPage = () => {
  const navigate = useNavigate();
  const { menteeId, caseStudyId } = useParams();

  // Use menteeId and caseStudyId from params or default to "1" for both
  const currentMenteeId = menteeId || "5";
  const currentCaseStudyId = caseStudyId || "2";

  // Get the case study data
  const caseStudyData = menteeData[currentCaseStudyId] || menteeData["1"];
  
  // Get the data for the current mentee within the case study
  const currentMenteeData = caseStudyData[currentMenteeId] || caseStudyData["1"];

  // Get responses and AI evaluation from mentee data
  const staticResponses = currentMenteeData?.responses || [];
  const staticAiEvaluation = currentMenteeData?.aiEvaluation || {};

  // Get case study title
  const caseStudyTitle = caseStudyData?.title || "Case Study";

  // Separate fact-based and analysis-based responses
  const { factResponses, analysisResponses } = useMemo(() => {
    const facts =
      staticResponses.filter((res) => res.type === "factBased") || [];
    const analysis =
      staticResponses.filter((res) => res.type === "analyzeBased") || [];
    return { factResponses: facts, analysisResponses: analysis };
  }, [staticResponses]);

  // Calculate correct answers for fact-based questions
  const correctAnswers = useMemo(
    () => factResponses.filter((res) => res.isCorrect).length,
    [factResponses]
  );

  const chartData = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: factResponses.length - correctAnswers },
  ];

  const COLORS = ["#28a745", "#dc3545"];

  return (
    <div className="student-result-body-container">
      <Navbar />
      <div className="student-result-main-content-container">
        <div className="student-result-content-container">
          <h1 className="student-result-heading-primary text-center mb-6">
            Case Study Results Summary
          </h1>

          {/* Case Study Title Display */}
          <div className="text-center mb-4">
            <h2 className="student-result-heading-secondary">
              {caseStudyTitle}
            </h2>
          </div>

          {/* Mentee Name Display */}
          {currentMenteeData?.name && (
            <div className="text-center mb-4">
              <h2 className="student-result-heading-secondary">
                Mentee: {currentMenteeData.name}
              </h2>
            </div>
          )}

          {/* Fact-based Questions Section */}
          {factResponses.length > 0 && (
            <div className="student-result-container mb-8">
              <h2 className="student-result-heading text-center">
                Fact-Based Questions Performance
              </h2>
              <div className="student-result-fact-based-results">
                <div className="student-result-score-summary mb-4">
                  <p className="student-result-score-text">
                    You answered <strong>{correctAnswers}</strong> out of{" "}
                    <strong>{factResponses.length}</strong> fact-based questions
                    correctly.
                  </p>
                  <div className="student-result-score-percentage">
                    {((correctAnswers / factResponses.length) * 100).toFixed(0)}
                    %
                  </div>
                </div>

                <div className="student-result-chart-container mb-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        className="student-result-pie-chart"
                        paddingAngle={5}
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index]}
                            className="student-result-pie-chart-cell"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "8px",
                          padding: "10px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        className="student-result-chart-legend"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Questions Review */}
                <div className="student-result-questions-review">
                  <h3 className="student-result-heading-tertiary mb-4">
                    Detailed Review
                  </h3>
                  {factResponses.map((response, index) => (
                    <div key={index} className="student-result-question-item">
                      <h3 className="student-result-question-title">
                        Question {index + 1}
                      </h3>
                      <p className="mb-3">{response.question}</p>
                      <div className="student-result-answer-feedback mt-3">
                        <p
                          className={`student-result-user-answer ${
                            response.isCorrect
                              ? "student-result-text-success"
                              : "student-result-text-danger"
                          }`}
                        >
                          <strong>Your answer:</strong> {response.userAnswer}
                        </p>
                        <p className="student-result-correct-answer-text">
                          <strong>Correct answer:</strong>{" "}
                          {response.correctAnswer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analysis-based Questions Section */}
          {staticAiEvaluation && staticAiEvaluation.evaluations && (
            <div className="student-result-analysis-section mb-8">
              <h2 className="student-result-heading text-center mb-4">
                Analysis-Based Questions
              </h2>
              <div className="student-result-space-y-6">
                {staticAiEvaluation.evaluations.map((evaluation, idx) => {
                  return (
                    <div
                      key={idx}
                      className="student-result-analysis-container mb-6"
                    >
                      {/* Main Question */}
                      <div className="mb-4">
                        <h3 className="student-result-question-title mb-3">
                          {evaluation.mainQuestion.question}
                        </h3>
                        <div className="student-result-bg-white p-4 rounded-lg border mb-3">
                          <h4 className="student-result-font-semibold mb-2">
                            Your Answer:
                          </h4>
                          <p className="student-result-text-muted">
                            {evaluation.mainQuestion.answer}
                          </p>
                        </div>
                        <div className="text-center mb-3">
                          <span className="student-result-text-large student-result-text-highlight">
                            Score: {evaluation.mainQuestion.score}/10
                          </span>
                        </div>
                        <div className="student-result-bg-white p-4 rounded-lg border mb-4">
                          <h4 className="student-result-font-semibold mb-2">
                            Feedback:
                          </h4>
                          <p className="student-result-text-muted">
                            {evaluation.mainQuestion.feedback}
                          </p>
                        </div>
                        <div className="student-result-grid student-result-grid-cols-1 md:student-result-grid-cols-2 gap-4 mb-4">
                          <div className="student-result-bg-success p-4 rounded-lg">
                            <h4 className="student-result-font-semibold mb-2">
                              Strengths:
                            </h4>
                            <p>{evaluation.mainQuestion.strengths}</p>
                          </div>
                          <div className="student-result-bg-warning p-4 rounded-lg">
                            <h4 className="student-result-font-semibold mb-2">
                              Areas to Improve:
                            </h4>
                            <p>{evaluation.mainQuestion.improvements}</p>
                          </div>
                        </div>
                      </div>

                      {/* Follow-up Questions */}
                      {evaluation.followUps?.map((followUp, fIdx) => {
                        return (
                          <div
                            key={fIdx}
                            className="student-result-ml-6 student-result-border-l-2 student-result-border-gray-200 student-result-pl-4 mt-6"
                          >
                            <h4 className="student-result-font-semibold student-result-text-lg mb-2">
                              Follow-up Question {fIdx + 1}:
                            </h4>
                            <p className="mb-3 student-result-text-muted">
                              {followUp.question}
                            </p>
                            <div className="student-result-bg-white p-4 rounded-lg border mb-3">
                              <h5 className="student-result-font-semibold mb-2">
                                Your Answer:
                              </h5>
                              <p className="student-result-text-muted">
                                {followUp.answer}
                              </p>
                            </div>
                            <div className="text-center mb-3">
                              <span className="student-result-text-large student-result-text-highlight">
                                Score: {followUp.score}/10
                              </span>
                            </div>
                            <div className="student-result-bg-white p-4 rounded-lg border mb-4">
                              <h5 className="student-result-font-semibold mb-2">
                                Feedback:
                              </h5>
                              <p className="student-result-text-muted">
                                {followUp.feedback}
                              </p>
                            </div>
                            <div className="student-result-grid student-result-grid-cols-1 md:student-result-grid-cols-2 gap-4 mb-4">
                              <div className="student-result-bg-success p-4 rounded-lg">
                                <h5 className="student-result-font-semibold mb-2">
                                  Strengths:
                                </h5>
                                <p>{followUp.strengths}</p>
                              </div>
                              <div className="student-result-bg-warning p-4 rounded-lg">
                                <h5 className="student-result-font-semibold mb-2">
                                  Areas to Improve:
                                </h5>
                                <p>{followUp.improvements}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Overall Performance Summary */}
                {staticAiEvaluation.overallFeedback && (
                  <div className="student-result-performance-summary p-6 mb-6">
                    <h3 className="student-result-text-xl student-result-font-semibold mb-4 text-center">
                      Overall Performance
                    </h3>
                    <p className="mb-4">{staticAiEvaluation.overallFeedback}</p>
                    <p className="student-result-text-xl student-result-font-bold text-center student-result-text-highlight">
                      Average Score:{" "}
                      {staticAiEvaluation.averageScore?.toFixed(1) || "0.0"}/10
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() =>
                // navigate(`/purchased-case-studies/${currentCaseStudyId}`)
                window.history.back()
              }
              className="student-result-back-button"
            >
              Back to Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoResultPage;