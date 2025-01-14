import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatInterface from "../../Components/CaseStudy/PurchasedCaseStudy/ChatInterface";
import "./SimulationPage.css";
import Navbar from "../../Components/Navbar/Navbar";

function SimulationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { caseStudy } = location.state || {};

  const [questionIndex, setQuestionIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [questionType, setQuestionType] = useState("factBased");
  const [userResponses, setUserResponses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false); // State for AI typing indicator

  // Initialize messages when the component mounts
  useEffect(() => {
    if (!caseStudy) {
      navigate("/purchased-case-studies");
      return;
    }
    initializeMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy]);

  const initializeMessages = () => {
    const firstQuestion = caseStudy.questions[questionType][0];
    const initialMessage = {
      sender: "AI",
      text: firstQuestion.question,
      options: questionType === "factBased" ? firstQuestion.options : null,
    };
    setMessages([initialMessage]);
  };

  const handleAnswer = (answer) => {
    const currentQuestion = caseStudy.questions[questionType][questionIndex];

    const isCorrect =
      questionType === "factBased"
        ? answer === currentQuestion.correctAnswer
        : true;

    const newResponse = {
      type: questionType,
      question: currentQuestion.question,
      userAnswer: answer,
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
    };

    const updatedUserResponses = [...userResponses, newResponse];
    setUserResponses(updatedUserResponses);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "User", text: answer },
    ]);

    proceedToNextQuestionOrResult(updatedUserResponses);
  };

  const proceedToNextQuestionOrResult = (updatedUserResponses) => {
    const currentQuestionIndex = questionIndex;
    const currentQuestionType = questionType;

    const isMoreQuestions =
      currentQuestionIndex + 1 <
      caseStudy.questions[currentQuestionType].length;

    if (isMoreQuestions) {
      setIsAITyping(true);

      // Simulate AI thinking time
      setTimeout(() => {
        setIsAITyping(false);

        const nextIndex = currentQuestionIndex + 1;
        setQuestionIndex(nextIndex);

        const nextQuestion =
          caseStudy.questions[currentQuestionType][nextIndex];

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "AI",
            text: nextQuestion.question,
            options:
              currentQuestionType === "factBased" ? nextQuestion.options : null,
          },
        ]);
      }, 1000); // Simulated delay in milliseconds
    }
    // else if (currentQuestionType === "factBased") {
    //   setIsAITyping(true);

    //   setTimeout(() => {
    //     setIsAITyping(false);

    //     setQuestionType("analyzeBased");
    //     setQuestionIndex(0);

    //     const firstAnalysisQuestion = caseStudy.questions["analyzeBased"][0];

    //     setMessages((prevMessages) => [
    //       ...prevMessages,
    //       {
    //         sender: "AI",
    //         text: firstAnalysisQuestion.question,
    //         options: null,
    //       },
    //     ]);
    //   }, 1000);
    // }
    else {
      navigate("/results", {
        state: { responses: updatedUserResponses, caseStudy },
      });
    }
  };

  if (!caseStudy || messages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="question-page-container">
        <h1 className="question-page-title">A.I Simulator</h1>
        <div className="question-page-content">
          <ChatInterface
            messages={messages}
            questionType={questionType}
            onAnswer={handleAnswer}
            isAITyping={isAITyping}
          />
        </div>
      </div>
    </>
  );
}

export default SimulationPage;
