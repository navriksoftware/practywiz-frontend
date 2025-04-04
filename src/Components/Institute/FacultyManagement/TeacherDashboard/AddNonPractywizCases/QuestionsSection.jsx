"use client";

import React from "react";
import { QuestionItem } from "./QuestionItem";

export function QuestionsSection({
  questions,
  onQuestionChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onAddQuestion,
  onQuestionTypeChange,
  onRemoveQuestion,
}) {
  const [activeType, setActiveType] = React.useState("multiple");

  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  // Filter questions based on the active tab
  const filteredQuestions = questions.filter(
    (question) => question.type === activeType
  );

  return (
    <section className="new-case-add-section">
      <h2 className="new-case-add-section-title">Questions</h2>

      <div className="new-case-add-tabs">
        <button
          type="button"
          className={`new-case-add-tab ${
            activeType === "multiple" ? "new-case-add-tab-active" : ""
          }`}
          onClick={() => handleTypeChange("multiple")}
        >
          Multiple Choice
        </button>
        <button
          type="button"
          className={`new-case-add-tab ${
            activeType === "subjective" ? "new-case-add-tab-active" : ""
          }`}
          onClick={() => handleTypeChange("subjective")}
        >
          Subjective
        </button>
      </div>

      {filteredQuestions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onQuestionChange={(field, value) =>
            onQuestionChange(question.id, field, value)
          }
          onOptionChange={(optionId, value) =>
            onOptionChange(question.id, optionId, value)
          }
          //   onAddOption={() => onAddOption(question.id)}
          //   onRemoveOption={(optionId) => onRemoveOption(question.id, optionId)}
          onRemoveQuestion={() => onRemoveQuestion(question.id)}
        />
      ))}

      <button
        type="button"
        className="new-case-add-add-question"
        onClick={() => onAddQuestion(activeType)}
      >
        <i className="fas fa-plus"></i> Add Another Question
      </button>
    </section>
  );
}
