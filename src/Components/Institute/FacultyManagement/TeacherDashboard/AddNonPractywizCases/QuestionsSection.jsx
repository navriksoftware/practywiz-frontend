import React, { useState } from "react";

export function QuestionsSection({
  questions,
  onQuestionChange,
  onOptionChange,
  onAnswerChange,
  onAddQuestion,
  onQuestionTypeChange,
  onRemoveQuestion,
  onMarksChange,
  errors = {},
}) {
  const [activeCategory, setActiveCategory] = useState("fact");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Filter questions based on the active category
  const filteredQuestions = questions.filter(
    (question) => question.category === activeCategory
  );

  return (
    <section className="new-case-add-section">
      <h2 className="new-case-add-section-title">Questions</h2>

      <div className="new-case-add-tabs">
        <button
          type="button"
          className={`new-case-add-tab ${
            activeCategory === "fact" ? "new-case-add-tab-active" : ""
          }`}
          onClick={() => handleCategoryChange("fact")}
        >
          Fact-Based
        </button>
        <button
          type="button"
          className={`new-case-add-tab ${
            activeCategory === "analysis" ? "new-case-add-tab-active" : ""
          }`}
          onClick={() => handleCategoryChange("analysis")}
        >
          Analysis-Based
        </button>
        <button
          type="button"
          className={`new-case-add-tab ${
            activeCategory === "research" ? "new-case-add-tab-active" : ""
          }`}
          onClick={() => handleCategoryChange("research")}
        >
          Research-Based
        </button>
      </div>

      {filteredQuestions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          onQuestionChange={(field, value) =>
            onQuestionChange(question.id, field, value)
          }
          onOptionChange={(optionIndex, value) =>
            onOptionChange(question.id, optionIndex, value)
          }
          onAnswerChange={(value) => onAnswerChange(question.id, value)}
          onQuestionTypeChange={(format) =>
            onQuestionTypeChange(question.id, format)
          }
          onMarksChange={(marks) => onMarksChange(question.id, marks)}
          onRemoveQuestion={() => onRemoveQuestion(question.id)}
          errors={errors.questions && errors.questions[index]}
        />
      ))}

      <button
        type="button"
        className="new-case-add-add-question"
        onClick={() => onAddQuestion(activeCategory)}
      >
        <i className="fas fa-plus"></i> Add {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}-Based Question
      </button>
    </section>
  );
}

function QuestionItem({
  question,
  onQuestionChange,
  onOptionChange,
  onAnswerChange,
  onQuestionTypeChange,
  onMarksChange,
  onRemoveQuestion,
  errors = {},
}) {
  // Determine if this is a research question (which can be either format)
  const isResearch = question.category === "research";

  return (
    <div className="new-case-add-question">
      <div className="new-case-add-question-header">
        <h3 className="new-case-add-question-title">
          {question.category.charAt(0).toUpperCase() + question.category.slice(1)}-Based Question
        </h3>
        <button
          type="button"
          className="new-case-add-question-remove"
          onClick={onRemoveQuestion}
        >
          <i className="fas fa-trash"></i> Remove
        </button>
      </div>

      <div className="new-case-add-question-content">
        <div className="new-case-add-field">
          <label className="new-case-add-label">Question</label>
          <textarea
            className={`new-case-add-textarea ${
              errors && errors.question ? "new-case-add-input-error" : ""
            }`}
            placeholder="Enter your question here"
            value={question.question || ""}
            onChange={(e) => onQuestionChange("question", e.target.value)}
          ></textarea>
          {errors && errors.question && (
            <div className="new-case-add-error">{errors.question}</div>
          )}
        </div>

        <div className="new-case-add-field">
          <label className="new-case-add-label">Marks</label>
          <input
            type="number"
            className="new-case-add-input"
            placeholder="Enter marks"
            value={question.marks ?? ""}
            onChange={(e) => onMarksChange(e.target.value)}
            min="0"
          />
        </div>

        {/* For research questions, show format selector with increased spacing */}
        {isResearch && (
          <div className="new-case-add-field">
            <label className="new-case-add-label">Question Format</label>
            <div className="new-case-add-radio-group">
              <label className="new-case-add-radio-label">
                <input
                  type="radio"
                  name={`format-${question.id}`}
                  checked={question.question_format === "multiple-choice"}
                  onChange={() => onQuestionTypeChange("multiple-choice")}
                />
                <span >Multiple Choice</span>
              </label>
              <label className="new-case-add-radio-label">
                <input
                  type="radio"
                  name={`format-${question.id}`}
                  checked={question.question_format === "subjective"}
                  onChange={() => onQuestionTypeChange("subjective")}
                />
                <span >Subjective</span>
              </label>
            </div>
          </div>
        )}

        {/* For multiple choice questions */}
        {question.question_format === "multiple-choice" && (
          <div className="new-case-add-options">
            <label className="new-case-add-label">Options</label>
            {question.options.map((option, index) => (
              <div key={index} className="new-case-add-option">
                <div className="new-case-add-option-row">
                  <label className="new-case-add-radio-label" >
                    <input
                      type="radio"
                      name={`correct-${question.id}`}
                      checked={question.answer === option && option !== ""}
                      onChange={() => onAnswerChange(option)}
                      disabled={!option.trim()}
                    />
                    <span>Correct</span>
                  </label>
                  <input
                    type="text"
                    className={`new-case-add-input ${
                      errors &&
                      errors.options &&
                      errors.options[index]
                        ? "new-case-add-input-error"
                        : ""
                    }`}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => onOptionChange(index, e.target.value)}
                  />
                </div>
                {errors && errors.options && errors.options[index] && (
                  <div className="new-case-add-error">
                    {errors.options[index]}
                  </div>
                )}
              </div>
            ))}
            {errors && errors.answer && (
              <div className="new-case-add-error">{errors.answer}</div>
            )}
          </div>
        )}

        {/* For subjective questions */}
        {question.question_format === "subjective" && (
          <div className="new-case-add-field">
            <label className="new-case-add-label">Answer</label>
            <textarea
              className={`new-case-add-textarea ${
                errors && errors.answer ? "new-case-add-input-error" : ""
              }`}
              placeholder="Enter a model answer for this question"
              value={question.answer || ""}
              onChange={(e) => onAnswerChange(e.target.value)}
            ></textarea>
            {errors && errors.answer && (
              <div className="new-case-add-error">{errors.answer}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}