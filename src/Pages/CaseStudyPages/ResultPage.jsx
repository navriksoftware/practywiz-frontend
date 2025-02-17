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

const ResultPage = () => {
  const URL = ApiURL();
  const location = useLocation();
  const navigate = useNavigate();
  const { responses, caseStudy } = location.state || {};
  console.log(responses);

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
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 main-content-container">
        <h1 className="text-3xl font-bold mb-8">Case Study Results</h1>

        {/* Fact-based Questions Section */}
        {factResponses.length > 0 && (
          <div className="case-study-result-container">
            <h2 className="result-heading">Fact-Based Questions Performance</h2>
            <div className="fact-based-results">
              <div className="score-summary">
                <p className="score-text">
                  You answered <strong>{correctAnswers}</strong> out of{" "}
                  <strong>{factResponses.length}</strong> fact-based questions
                  correctly.
                </p>
                <div className="score-percentage">
                  {((correctAnswers / factResponses.length) * 100).toFixed(0)}%
                </div>
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      className="pie-chart"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index]}
                          className="pie-chart-cell"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      className="chart-legend"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Questions Review */}
              <div className="questions-review">
                {factResponses.map((response, index) => (
                  <div key={index} className="question-item">
                    <h3 className="question-text">Question {index + 1}</h3>
                    <p className="question-content">{response.question}</p>
                    <div className="options-container">
                      {response.options?.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`option-item ${
                            response.userAnswer === option
                              ? response.isCorrect
                                ? "correct-answer"
                                : "incorrect-answer"
                              : response.correctAnswer === option
                              ? "correct-answer"
                              : ""
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <div className="answer-feedback">
                      <p
                        className={`user-answer ${
                          response.isCorrect ? "correct" : "incorrect"
                        }`}
                      >
                        Your answer: {response.userAnswer}
                      </p>
                      <p className="correct-answer-text">
                        Correct answer: {response.correctAnswer}
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
          <div className="bg-white rounded-lg shadow-md mb-8 p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Analysis-Based Questions
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Analyzing responses...</span>
              </div>
            ) : aiEvaluation?.evaluations ? (
              <div className="space-y-6">
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
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      {/* Main Question */}
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg">
                          {evaluation.mainQuestion.question}
                        </h3>
                        <div className="mt-4 p-4 bg-white rounded-lg border">
                          <h4 className="font-semibold mb-2">Your Answer:</h4>
                          <p className="text-gray-700">
                            {mainQuestionResponse?.userAnswer ||
                              mainQuestionResponse?.answer}
                          </p>
                        </div>
                        <div className="mt-4">
                          <span className="text-lg font-bold text-blue-600">
                            Score: {evaluation.mainQuestion.score}/10
                          </span>
                        </div>
                        <div className="mt-4 p-4 bg-white rounded-lg border">
                          <h4 className="font-semibold mb-2">Feedback:</h4>
                          <p className="text-gray-700">
                            {evaluation.mainQuestion.feedback}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-700 mb-2">
                              Strengths:
                            </h4>
                            <p className="text-green-600">
                              {evaluation.mainQuestion.strengths}
                            </p>
                          </div>
                          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <h4 className="font-semibold text-orange-700 mb-2">
                              Areas to Improve:
                            </h4>
                            <p className="text-orange-600">
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
                            className="ml-6 border-l-2 border-gray-200 pl-4 mt-6"
                          >
                            <h4 className="font-semibold text-lg">
                              Follow-up Question {fIdx + 1}:
                            </h4>
                            <p className="mt-2 text-gray-700">
                              {followUp.question}
                            </p>
                            <div className="mt-4 p-4 bg-white rounded-lg border">
                              <h5 className="font-semibold mb-2">
                                Your Answer:
                              </h5>
                              <p className="text-gray-700">
                                {followUpResponse?.userAnswer ||
                                  followUpResponse?.answer}
                              </p>
                            </div>
                            <div className="mt-4">
                              <span className="text-lg font-bold text-blue-600">
                                Score: {followUp.score}/10
                              </span>
                            </div>
                            <div className="mt-4 p-4 bg-white rounded-lg border">
                              <h5 className="font-semibold mb-2">Feedback:</h5>
                              <p className="text-gray-700">
                                {followUp.feedback}
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-2">
                                  Strengths:
                                </h5>
                                <p className="text-green-600">
                                  {followUp.strengths}
                                </p>
                              </div>
                              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <h5 className="font-semibold text-orange-700 mb-2">
                                  Areas to Improve:
                                </h5>
                                <p className="text-orange-600">
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
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-semibold mb-4">
                    Overall Performance
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {aiEvaluation.overallFeedback}
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    Average Score: {aiEvaluation.averageScore.toFixed(1)}/10
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                No analysis-based responses to evaluate.
              </p>
            )}
          </div>
        )}

        <button
          onClick={() =>
            navigate(`/purchased-case-studies/${caseStudy?.case_study_id}`)
          }
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Case Study
        </button>
      </div>
    </>
  );
};

export default ResultPage;
