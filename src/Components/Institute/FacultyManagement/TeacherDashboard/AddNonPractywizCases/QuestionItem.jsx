"use client";

import React from "react";

export function QuestionItem({
  question,
  onQuestionChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onRemoveQuestion,
}) {
  return (
    <div className="new-case-add-question">
      <div className="new-case-add-question-header">
        <label className="new-case-add-label">Question</label>
        <button
          type="button"
          className="new-case-add-question-remove"
          onClick={onRemoveQuestion}
          aria-label="Remove question"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <input
        type="text"
        className="new-case-add-input"
        placeholder="Enter your question"
        value={question.text}
        onChange={(e) => onQuestionChange("text", e.target.value)}
      />

      {question.type === "multiple" && (
        <div className="new-case-add-options">
          <label className="new-case-add-label">Options</label>

          {question.options.map((option) => (
            <div key={option.id} className="new-case-add-option">
              <div className="new-case-add-option-radio">
                <input
                  type="radio"
                  name={`question-${question.id}-option`}
                  id={`question-${question.id}-option-${option.id}`}
                />
                <label
                  htmlFor={`question-${question.id}-option-${option.id}`}
                ></label>
              </div>
              <input
                type="text"
                className="new-case-add-option-input"
                placeholder={`Option ${option.id}`}
                value={option.text}
                onChange={(e) => onOptionChange(option.id, e.target.value)}
              />
              {/* <button
                type="button"
                className="new-case-add-option-remove"
                onClick={() => onRemoveOption(option.id)}
                aria-label={`Remove option ${option.id}`}
              >
                <i className="fas fa-times"></i>
              </button> */}
            </div>
          ))}

          {/* <button
            type="button"
            className="new-case-add-add-option"
            onClick={onAddOption}
          >
            <i className="fas fa-plus"></i> Add Option
          </button> */}
        </div>
      )}

      {question.type === "subjective" && (
        <div className="new-case-add-subjective">
          <label className="new-case-add-label">Answer</label>
          <textarea
            className="new-case-add-textarea"
            placeholder="Enter model answer or grading criteria"
            value={question.answer || ""}
            onChange={(e) => onQuestionChange("answer", e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
}
