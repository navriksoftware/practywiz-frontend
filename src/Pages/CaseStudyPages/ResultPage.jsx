import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./ResultPage.css";
import Navbar from "../../Components/Navbar/Navbar";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userResponses = location.state?.responses || [];
  const caseStudy = location.state?.caseStudy;

  // Separate responses by type
  const factResponses = userResponses.filter((res) => res.type === "factBased");
  // const analyzeResponses = userResponses.filter(
  //   (res) => res.type === "analyzeBased"
  // );
  const correctAnswers = factResponses.filter((res) => res.isCorrect).length;

  // Prepare data for the chart
  const data = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: factResponses.length - correctAnswers },
  ];

  const COLORS = ["#28a745", "#dc3545"]; // Green for correct, red for incorrect

  return (
    <>
      <Navbar />
      <div className="result-page-container">
        <h1 className="result-page-title">Your Performance</h1>

        <div className="result-page-chart-section">
          <div className="result-page-summary">
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

        {/* Feedback Sections */}
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
                  {res.isCorrect
                    ? "Correct!"
                    : `Incorrect. The correct answer is ${res.correctAnswer}.`}
                </p>
              </div>
            ))}
          </div>

          {/* Analysis-Based Questions Feedback */}
          {/* <h2 className="result-page-feedback-title">Analysis-Based Questions</h2>
        <div className="result-page-feedback-list">
          {analyzeResponses.map((res, idx) => (
            <div key={idx} className="result-page-feedback-item">
              <p>
                <strong>Question:</strong> {res.question}
              </p>
              <p>
                <strong>Your Answer:</strong> {res.userAnswer}
              </p>
              <p>
                <strong>Feedback:</strong> Thank you for your insightful
                response.
              </p>
            </div>
          ))}
        </div> */}
        </div>

        <button
          onClick={() => navigate(`/purchased-case-studies/${caseStudy.id}`)}
          className="result-page-back-button"
        >
          Back to Case Study
        </button>
      </div>
    </>
  );
}

export default ResultPage;
