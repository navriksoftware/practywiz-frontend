import React from "react";
import "./ResultPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { responses, caseStudy } = location.state || {};

  console.log("This is user responses", responses);

  // Separate fact-based and analysis-based responses
  const factResponses = responses.filter((res) => res.type === "factBased");
  const analysisResponses = responses.filter(
    (res) => res.type === "analyzeBased"
  );

  // Calculate correct answers for fact-based questions
  const correctAnswers = factResponses.filter((res) => res.isCorrect).length;

  // Prepare data for the chart
  const data = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: factResponses.length - correctAnswers },
  ];

  const COLORS = ["#28a745", "#dc3545"]; // Green for correct, red for incorrect

  // Group analysis responses by main question
  const groupedAnalysisResponses = {};
  let currentMainQuestion = null;
  let currentGroup = [];

  analysisResponses.forEach((response) => {
    if (!currentMainQuestion) {
      currentMainQuestion = response.question;
      currentGroup = [response];
    } else if (currentGroup.length < 3) {
      // This is a follow-up response
      currentGroup.push(response);
    } else {
      // Start a new group
      groupedAnalysisResponses[currentMainQuestion] = currentGroup;
      currentMainQuestion = response.question;
      currentGroup = [response];
    }
  });

  // Add the last group
  if (currentGroup.length > 0) {
    groupedAnalysisResponses[currentMainQuestion] = currentGroup;
  }

  return (
    <>
      <Navbar />
      <div className="result-page-container">
        <h1 className="result-page-title">Case Study Results</h1>
        <div className="result-page-content">
          {/* Performance Summary Section */}
          <div className="result-page-summary-section">
            <div className="result-page-summary">
              <h2>Fact-Based Questions Performance</h2>
              <p>
                You answered <strong>{correctAnswers}</strong> out of{" "}
                <strong>{factResponses.length}</strong> fact-based questions
                correctly.
              </p>
            </div>

            <div className="result-page-chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart aria-label="Performance Summary Chart">
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="result-page-feedback-section">
            {/* Fact-Based Questions Feedback */}
            <h2 className="result-page-feedback-title">Fact-Based Questions</h2>
            <div className="result-page-feedback-list">
              {factResponses.map((res, idx) => (
                <div key={idx} className="result-page-feedback-item">
                  <p>
                    <strong>Question:</strong> {res.question}
                  </p>
                  <p>
                    <strong>Your Answer:</strong> {res.userAnswer}
                  </p>
                  <p>
                    <strong>Feedback:</strong>{" "}
                    <span
                      className={
                        res.isCorrect
                          ? "feedback-correct"
                          : "feedback-incorrect"
                      }
                    >
                      {res.isCorrect
                        ? "Correct!"
                        : `Incorrect. The correct answer is ${res.correctAnswer}.`}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* Analysis-Based Questions Feedback */}
            <h2 className="result-page-feedback-title">
              Analysis-Based Questions
            </h2>
            <div className="result-page-feedback-list">
              {Object.entries(groupedAnalysisResponses).map(
                ([mainQuestion, group], idx) => (
                  <div
                    key={idx}
                    className="result-page-feedback-item analysis-group"
                  >
                    <div className="main-question">
                      <p>
                        <strong>Main Question:</strong> {mainQuestion}
                      </p>
                      <p>
                        <strong>Your Answer:</strong> {group[0].userAnswer}
                      </p>
                    </div>

                    {/* Follow-up Questions */}
                    {group.slice(1).map((followUp, followUpIdx) => (
                      <div key={followUpIdx} className="follow-up-question">
                        <p>
                          <strong>Follow-up Question {followUpIdx + 1}:</strong>{" "}
                          {followUp.question}
                        </p>
                        <p>
                          <strong>Your Answer:</strong> {followUp.userAnswer}
                        </p>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            navigate(`/purchased-case-studies/${caseStudy.case_study_id}`)
          }
          className="result-page-back-button"
        >
          Back to Case Study
        </button>
      </div>
    </>
  );
}

export default ResultPage;
