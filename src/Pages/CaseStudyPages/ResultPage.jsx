import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../../Components/Navbar/Navbar";
import { ApiURL } from "../../Utils/ApiURL";
import "./ResultPage.css";

const ResultPage = () => {
  const URL = ApiURL();
  const location = useLocation();
  const navigate = useNavigate();
  const { responses, caseStudy } = location.state || {};
  console.log("This is response of user: ", responses);
  console.log("This is caseStudy: ", responses);

  const [aiEvaluation, setAiEvaluation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Separate fact-based and analysis-based responses
  const { factResponses, analysisResponses } = useMemo(() => {
    const facts = responses?.filter((res) => res.type === "factBased") || [];

    const analysis =
      responses?.filter((res) => res.type === "analyzeBased") || [];
    return { factResponses: facts, analysisResponses: analysis };
  }, [responses]);

  console.log(factResponses);

  // Calculate correct answers for fact-based questions
  const correctAnswers = useMemo(
    () => factResponses.filter((res) => res.isCorrect).length,
    [factResponses]
  );

  // Prepare analysis data for API
  const prepareAnalysisData = useMemo(() => {
    return (responses) => {
      const analysisData = [];

      for (let i = 0; i < responses.length; i += 3) {
        if (i % 3 !== 0) continue;

        const mainQuestion = responses[i];
        if (!mainQuestion) continue;

        const followUps = [];

        if (i + 1 < responses.length) {
          followUps.push({
            question: responses[i + 1].question,
            answer: responses[i + 1].userAnswer || responses[i + 1].answer,
          });
        }

        if (i + 2 < responses.length) {
          followUps.push({
            question: responses[i + 2].question,
            answer: responses[i + 2].userAnswer || responses[i + 2].answer,
          });
        }

        analysisData.push({
          question: mainQuestion.question,
          answer: mainQuestion.userAnswer || mainQuestion.answer,
          followUps: followUps,
        });
      }

      return analysisData;
    };
  }, []);

  // Fetch AI evaluation for analysis-based questions
  useEffect(() => {
    const fetchAIEvaluation = async () => {
      try {
        if (!analysisResponses.length) {
          setIsLoading(false);
          return;
        }

        const analysisData = prepareAnalysisData(analysisResponses);

        const response = await fetch(
          `${URL}api/v1/case-studies/check-full-analysis-questions-result`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              case_study_id: caseStudy?.case_study_id,
              analysisData,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("AI Evaluation Data:", data);
        setAiEvaluation(data);
      } catch (error) {
        console.error("Error fetching AI evaluation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (caseStudy?.case_study_id && analysisResponses.length > 0) {
      fetchAIEvaluation();
    } else {
      setIsLoading(false);
    }
  }, [analysisResponses, caseStudy, prepareAnalysisData, URL]);

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
                    {((correctAnswers / factResponses.length) * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="student-result-chart-container mb-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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
                  <h3 className="student-result-heading-tertiary mb-4">Detailed Review</h3>
                  {factResponses.map((response, index) => (
                    <div key={index} className="student-result-question-item">
                      <h3 className="student-result-question-title">
                        Question {index + 1}
                      </h3>
                      <p className="mb-3">{response.question}</p>
                      <div className="student-result-options-container">
                        {response.options?.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`student-result-option-item ${
                              response.userAnswer === option
                                ? response.isCorrect
                                  ? "student-result-correct-answer"
                                  : "student-result-incorrect-answer"
                                : response.correctAnswer === option
                                ? "student-result-correct-answer"
                                : ""
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className="student-result-answer-feedback mt-3">
                        <p
                          className={`student-result-user-answer ${
                            response.isCorrect ? "student-result-text-success" : "student-result-text-danger"
                          }`}
                        >
                          <strong>Your answer:</strong> {response.userAnswer}
                        </p>
                        <p className="student-result-correct-answer-text">
                          <strong>Correct answer:</strong> {response.correctAnswer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analysis-based Questions Section */}
          {analysisResponses.length > 0 && (
            <div className="student-result-analysis-section mb-8">
              <h2 className="student-result-heading text-center mb-4">
                Analysis-Based Questions
              </h2>
              {isLoading ? (
                <div className="text-center p-8">
                  <div className="student-result-spinner-border text-primary" role="status">
                    <span className="student-result-visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Analyzing your responses...</p>
                </div>
              ) : aiEvaluation?.evaluations ? (
                <div className="student-result-space-y-6">
                  {aiEvaluation.evaluations.map((evaluation, idx) => {
                    // Find corresponding user response for main question
                    const mainQuestionResponse = analysisResponses.find(
                      (response) =>
                        response.question === evaluation.mainQuestion.question
                    );

                    // Find follow-up responses
                    const followUpResponses = evaluation.followUps?.map(
                      (followUp) => {
                        return analysisResponses.find(
                          (response) => response.question === followUp.question
                        );
                      }
                    );

                    return (
                      <div key={idx} className="student-result-analysis-container mb-6">
                        {/* Main Question */}
                        <div className="mb-4">
                          <h3 className="student-result-question-title mb-3">
                            {evaluation.mainQuestion.question}
                          </h3>
                          <div className="student-result-bg-white p-4 rounded-lg border mb-3">
                            <h4 className="student-result-font-semibold mb-2">Your Answer:</h4>
                            <p className="student-result-text-muted">
                              {mainQuestionResponse?.userAnswer ||
                                mainQuestionResponse?.answer}
                            </p>
                          </div>
                          <div className="text-center mb-3">
                            <span className="student-result-text-large student-result-text-highlight">
                              Score: {evaluation.mainQuestion.score}/10
                            </span>
                          </div>
                          <div className="student-result-bg-white p-4 rounded-lg border mb-4">
                            <h4 className="student-result-font-semibold mb-2">Feedback:</h4>
                            <p className="student-result-text-muted">
                              {evaluation.mainQuestion.feedback}
                            </p>
                          </div>
                          <div className="student-result-grid student-result-grid-cols-1 md:student-result-grid-cols-2 gap-4 mb-4">
                            <div className="student-result-bg-success p-4 rounded-lg">
                              <h4 className="student-result-font-semibold mb-2">
                                Strengths:
                              </h4>
                              <p>
                                {evaluation.mainQuestion.strengths}
                              </p>
                            </div>
                            <div className="student-result-bg-warning p-4 rounded-lg">
                              <h4 className="student-result-font-semibold mb-2">
                                Areas to Improve:
                              </h4>
                              <p>
                                {evaluation.mainQuestion.improvements}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Follow-up Questions */}
                        {evaluation.followUps?.map((followUp, fIdx) => {
                          const followUpResponse = followUpResponses[fIdx];

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
                                  {followUpResponse?.userAnswer ||
                                    followUpResponse?.answer}
                                </p>
                              </div>
                              <div className="text-center mb-3">
                                <span className="student-result-text-large student-result-text-highlight">
                                  Score: {followUp.score}/10
                                </span>
                              </div>
                              <div className="student-result-bg-white p-4 rounded-lg border mb-4">
                                <h5 className="student-result-font-semibold mb-2">Feedback:</h5>
                                <p className="student-result-text-muted">
                                  {followUp.feedback}
                                </p>
                              </div>
                              <div className="student-result-grid student-result-grid-cols-1 md:student-result-grid-cols-2 gap-4 mb-4">
                                <div className="student-result-bg-success p-4 rounded-lg">
                                  <h5 className="student-result-font-semibold mb-2">
                                    Strengths:
                                  </h5>
                                  <p>
                                    {followUp.strengths}
                                  </p>
                                </div>
                                <div className="student-result-bg-warning p-4 rounded-lg">
                                  <h5 className="student-result-font-semibold mb-2">
                                    Areas to Improve:
                                  </h5>
                                  <p>
                                    {followUp.improvements}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* Overall Performance Summary */}
                  <div className="student-result-performance-summary p-6 mb-6">
                    <h3 className="student-result-text-xl student-result-font-semibold mb-4 text-center">
                      Overall Performance
                    </h3>
                    <p className="mb-4">
                      {aiEvaluation.overallFeedback}
                    </p>
                    <p className="student-result-text-xl student-result-font-bold text-center student-result-text-highlight">
                      Average Score: {aiEvaluation.averageScore.toFixed(1)}/10
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center student-result-text-muted p-4">
                  No analysis-based responses to evaluate.
                </p>
              )}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() =>
                navigate(`/purchased-case-studies/${caseStudy?.case_study_id}`)
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

export default ResultPage;